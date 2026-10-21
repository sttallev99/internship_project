import { useEffect, useRef } from 'react';

import { getSocket } from '../realtime/socket';

/**
 * Subscribes to live updates of one conversation while the component is mounted.
 * Handlers may change between renders without re-subscribing.
 */
const useConversationChannel = (conversationId, { onMessage, onListingStatus }) => {
    const handlersRef = useRef({ onMessage, onListingStatus });
    handlersRef.current = { onMessage, onListingStatus };

    useEffect(() => {
        if (!conversationId) return undefined;

        const socket = getSocket();
        const join = () => socket.emit('conversation:join', conversationId);
        const handleMessage = (message) => {
            if (message.conversationRef === conversationId) handlersRef.current.onMessage?.(message);
        };
        const handleListingStatus = (update) => handlersRef.current.onListingStatus?.(update);

        // Rejoin the room after every (re)connect, e.g. when the network drops.
        socket.on('connect', join);
        socket.on('message:new', handleMessage);
        socket.on('listing:status', handleListingStatus);
        if (socket.connected) join();

        return () => {
            socket.emit('conversation:leave', conversationId);
            socket.off('connect', join);
            socket.off('message:new', handleMessage);
            socket.off('listing:status', handleListingStatus);
        };
    }, [conversationId]);
};

export default useConversationChannel;
