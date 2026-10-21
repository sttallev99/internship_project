import { io } from 'socket.io-client';

import { baseUrl } from '../constants';

let socket = null;

/** Shared Socket.IO connection, authenticated by the same http-only cookie as the REST API. */
export const getSocket = () => {
    if (!socket) {
        socket = io(baseUrl, { withCredentials: true, autoConnect: false });
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
