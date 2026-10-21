import { Schema, model, type HydratedDocument, type InferSchemaType } from 'mongoose';

/** A chat between a rent-out listing's owner and the user who requested to rent it. */
const conversationSchema = new Schema(
    {
        listingRef: { type: Schema.Types.ObjectId, ref: 'RentingOut', required: true },
        ownerRef: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        tenantRef: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        // Denormalized preview so the conversation list needs no extra query.
        lastMessageText: { type: String, default: '' },
        lastMessageAt: { type: Date, default: null },
    },
    { timestamps: true },
);

// One conversation per listing/tenant pair.
conversationSchema.index({ listingRef: 1, tenantRef: 1 }, { unique: true });
conversationSchema.index({ ownerRef: 1, lastMessageAt: -1 });
conversationSchema.index({ tenantRef: 1, lastMessageAt: -1 });

export type ConversationAttributes = InferSchemaType<typeof conversationSchema>;
export type ConversationDocument = HydratedDocument<ConversationAttributes>;

const Conversation = model('Conversation', conversationSchema);

export default Conversation;
