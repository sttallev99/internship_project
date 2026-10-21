import { MAX_MESSAGE_LENGTH } from '../models/Message.model.js';
import { emitNewMessage } from '../realtime/socket.js';
import {
    createMessage,
    findOrCreateConversation,
    getConversationForUser,
    getMessages,
    getUserConversations,
    isConversationParticipant,
} from '../services/chat.services.js';
import { getSingleRentOutListing } from '../services/rentingOut.services.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import { isListingOwner } from '../utils/listingInput.js';
import { parseString } from '../utils/queryParsers.js';

/** The owner opens (or reopens) the chat with the user who requested to rent the listing. */
export const startConversation = catchAsync(async (req, res) => {
    const listingId = parseString(req.body?.listingId);
    if (!listingId) {
        throw new AppError('listingId is required', 400);
    }

    const listing = await getSingleRentOutListing(listingId);
    if (!listing) {
        throw new AppError('Listing not found', 404);
    }
    if (!isListingOwner(listing.userRef, req.userId)) {
        throw new AppError('Only the owner can start a conversation about this listing', 403);
    }
    if (!listing.tenantRef) {
        throw new AppError('Nobody has requested to rent this listing yet', 409);
    }

    const conversation = await findOrCreateConversation(listing.id, req.userId!, listing.tenantRef.toString());

    res.status(201).json({ success: true, conversationId: conversation.id });
});

export const getConversations = catchAsync(async (req, res) => {
    const conversations = await getUserConversations(req.userId!);

    res.status(200).json({ success: true, conversations });
});

export const getConversation = catchAsync(async (req, res) => {
    const conversation = await getConversationForUser(req.params.conversation_id, req.userId!);
    if (!conversation) {
        throw new AppError('Conversation not found', 404);
    }

    const messages = await getMessages(conversation.id);

    res.status(200).json({ success: true, conversation, messages });
});

export const sendMessage = catchAsync(async (req, res) => {
    const { conversation_id: conversationId } = req.params;

    const text = parseString(req.body?.text);
    if (!text) {
        throw new AppError('Message text is required', 400);
    }
    if (text.length > MAX_MESSAGE_LENGTH) {
        throw new AppError(`Messages can be at most ${MAX_MESSAGE_LENGTH} characters`, 400);
    }
    if (!(await isConversationParticipant(conversationId, req.userId!))) {
        throw new AppError('Conversation not found', 404);
    }

    const message = await createMessage(conversationId, req.userId!, text);
    emitNewMessage(conversationId, message);

    res.status(201).json({ success: true, message });
});
