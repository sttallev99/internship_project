import { Schema, model, type HydratedDocument, type InferSchemaType } from 'mongoose';

import { PROPERTY_TYPES, RENT_OUT_STATUSES } from '../constants/listing.js';

const rentingOutSchema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        content: { type: String, required: true, trim: true },
        country: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        address: { type: String, required: true, trim: true },
        price: { type: Number, required: true, min: 0 },
        newPrice: { type: Number, min: 0 },
        bedrooms: { type: Number, required: true, min: 0 },
        bathrooms: { type: Number, required: true, min: 0 },
        footage: { type: String, required: true, trim: true },
        propertyType: { type: String, enum: PROPERTY_TYPES, required: true },
        images: { type: [String], default: [] },
        status: { type: String, enum: RENT_OUT_STATUSES, default: 'active' },
        userRef: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        // The user who requested to rent the listing (set while `pending`, kept once `taken`).
        tenantRef: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    },
    { timestamps: true },
);

export type RentingOutAttributes = InferSchemaType<typeof rentingOutSchema>;
export type RentingOutDocument = HydratedDocument<RentingOutAttributes>;

const RentingOut = model('RentingOut', rentingOutSchema);

export default RentingOut;
