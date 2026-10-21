import type { Server as HttpServer } from 'node:http';
import { isValidObjectId } from 'mongoose';
import { Server } from 'socket.io';

import { env } from '../config/env.js';
import type { RentOutStatus } from '../constants/listing.js';
import { ACCESS_TOKEN_COOKIE } from '../middlewares/isAuth.js';
import { verifyAccessToken } from '../services/auth.services.js';
import { isConversationParticipant } from '../services/chat.services.js';

/**
 * Realtime layer. Messages are written through the REST API; the socket only pushes
 * updates to the participants who have joined a conversation's room.
 */

interface JoinResponse {
    ok: boolean;
    error?: string;
}

export interface ServerToClientEvents {
    'message:new': (message: unknown) => void;
    'listing:status': (update: { listingId: string; status: RentOutStatus }) => void;
}

export interface ClientToServerEvents {
    'conversation:join': (conversationId: string, ack?: (response: JoinResponse) => void) => void;
    'conversation:leave': (conversationId: string) => void;
}

interface SocketData {
    userId: string;
}

type RealtimeServer = Server<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;

let io: RealtimeServer | null = null;

const roomFor = (conversationId: string) => `conversation:${conversationId}`;

const readCookie = (cookieHeader: string | undefined, name: string): string | undefined =>
    cookieHeader
        ?.split(';')
        .map((part) => part.trim())
        .find((part) => part.startsWith(`${name}=`))
        ?.slice(name.length + 1);

export const initRealtime = (httpServer: HttpServer): RealtimeServer => {
    io = new Server(httpServer, { cors: { origin: env.clientOrigin, credentials: true } });

    // Authenticate the handshake with the same http-only cookie the REST API uses.
    io.use((socket, next) => {
        const token = readCookie(socket.handshake.headers.cookie, ACCESS_TOKEN_COOKIE);
        if (!token) {
            next(new Error('Unauthorized'));
            return;
        }
        try {
            socket.data.userId = verifyAccessToken(decodeURIComponent(token)).userId;
            next();
        } catch {
            next(new Error('Forbidden'));
        }
    });

    io.on('connection', (socket) => {
        socket.on('conversation:join', async (conversationId, ack) => {
            try {
                const canJoin =
                    isValidObjectId(conversationId) &&
                    (await isConversationParticipant(conversationId, socket.data.userId));

                if (!canJoin) {
                    ack?.({ ok: false, error: 'Conversation not found' });
                    return;
                }
                await socket.join(roomFor(conversationId));
                ack?.({ ok: true });
            } catch {
                ack?.({ ok: false, error: 'Could not join the conversation' });
            }
        });

        socket.on('conversation:leave', (conversationId) => {
            void socket.leave(roomFor(conversationId));
        });
    });

    return io;
};

export const emitNewMessage = (conversationId: string, message: unknown): void => {
    // Serialize first: ObjectIds hold binary buffers, which Socket.IO would otherwise send as attachments.
    io?.to(roomFor(conversationId)).emit('message:new', JSON.parse(JSON.stringify(message)));
};

export const emitListingStatus = (conversationIds: string[], listingId: string, status: RentOutStatus): void => {
    if (!io || conversationIds.length === 0) return;
    io.to(conversationIds.map(roomFor)).emit('listing:status', { listingId, status });
};
