import { io } from 'socket.io-client';

import { baseUrl } from '../constants';

let socket = null;

/** Shared Socket.IO connection, authenticated by the same http-only cookie as the REST API. */
export const getSocket = () => {
    if (!socket) {
        // An empty baseUrl means "same origin", which socket.io-client expresses as no URL.
        socket = io(baseUrl || undefined, { withCredentials: true, autoConnect: false });
    }
    if (!socket.connected) {
        socket.connect();
    }
    return socket;
};

export const disconnectSocket = () => {
    socket?.disconnect();
    socket = null;
};
