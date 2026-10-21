import api from './client';

/** Owner opens (or reopens) the chat with the tenant of a listing. Resolves to the conversation id. */
export const startConversation = async (listingId) => {
    const { data } = await api.post('/conversations', { listingId });
    return data.conversationId;
};

export const getConversations = async () => {
    const { data } = await api.get('/conversations');
    return data.conversations;
};

/** Resolves to `{ conversation, messages }`. */
export const getConversation = async (conversationId) => {
    const { data } = await api.get(`/conversations/${conversationId}`);
    return { conversation: data.conversation, messages: data.messages };
};

export const sendMessage = async (conversationId, text) => {
    const { data } = await api.post(`/conversations/${conversationId}/messages`, { text });
    return data.message;
};
