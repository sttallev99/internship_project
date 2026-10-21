import { Schema, model, type HydratedDocument, type InferSchemaType } from 'mongoose';

export const MAX_MESSAGE_LENGTH = 2000;

const messageSchema = new Schema(
    {
        conversationRef: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true, index: true },
        senderRef: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        text: { type: String, required: true, trim: true, maxlength: MAX_MESSAGE_LENGTH },
    },
    { timestamps: true },
);

export type MessageAttributes = InferSchemaType<typeof messageSchema>;
export type MessageDocument = HydratedDocument<MessageAttributes>;

const Message = model('Message', messageSchema);

export default Message;
