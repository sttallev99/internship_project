import Conversation from '../models/Conversation.model.js';
import Message from '../models/Message.model.js';

const PARTICIPANT_FIELDS = 'firstName lastName profilePicture';
const LISTING_FIELDS = 'title status price images userRef tenantRef';
const PREVIEW_LENGTH = 100;
const HISTORY_LIMIT = 200;

const byParticipant = (userId: string) => ({ $or: [{ ownerRef: userId }, { tenantRef: userId }] });

/** Returns the existing owner/tenant conversation for the listing, creating it the first time. */
export const findOrCreateConversation = (listingId: string, ownerId: string, tenantId: string) =>
    Conversation.findOneAndUpdate(
        { listingRef: listingId, tenantRef: tenantId },
        { $setOnInsert: { ownerRef: ownerId } },
        { upsert: true, new: true, setDefaultsOnInsert: true },
    );

export const getUserConversations = (userId: string) =>
    Conversation.find(byParticipant(userId))
        .sort({ lastMessageAt: -1, updatedAt: -1 })
        .populate('listingRef', LISTING_FIELDS)
        .populate('ownerRef', PARTICIPANT_FIELDS)
        .populate('tenantRef', PARTICIPANT_FIELDS);

/** Resolves to the conversation only when the user takes part in it. */
export const getConversationForUser = (conversationId: string, userId: string) =>
    Conversation.findOne({ _id: conversationId, ...byParticipant(userId) })
        .populate('listingRef', LISTING_FIELDS)
        .populate('ownerRef', PARTICIPANT_FIELDS)
        .populate('tenantRef', PARTICIPANT_FIELDS);

export const isConversationParticipant = async (conversationId: string, userId: string): Promise<boolean> =>
    Boolean(await Conversation.exists({ _id: conversationId, ...byParticipant(userId) }));

export const getConversationIdsForListing = async (listingId: string): Promise<string[]> => {
    const conversations = await Conversation.find({ listingRef: listingId }).select('_id');
    return conversations.map((conversation) => conversation.id);
};

/** The most recent messages of a conversation, oldest first. */
export const getMessages = async (conversationId: string) => {
    const latest = await Message.find({ conversationRef: conversationId }).sort({ createdAt: -1 }).limit(HISTORY_LIMIT);
    return latest.reverse();
};

export const createMessage = async (conversationId: string, senderId: string, text: string) => {
    const message = await Message.create({ conversationRef: conversationId, senderRef: senderId, text });

    await Conversation.updateOne(
        { _id: conversationId },
        { lastMessageText: text.slice(0, PREVIEW_LENGTH), lastMessageAt: message.createdAt },
    );

    return message;
};
