import { Schema, model, type HydratedDocument, type InferSchemaType } from 'mongoose';

import { PROPERTY_TYPES } from '../constants/listing.js';

const searchingForSchema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        content: { type: String, required: true, trim: true },
        country: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        prefAreas: { type: [String], required: true },
        price: { type: Number, required: true, min: 0 },
        bedrooms: { type: Number, required: true, min: 0 },
        bathrooms: { type: Number, required: true, min: 0 },
        footage: { type: Number, required: true, min: 0 },
        propertyType: { type: String, enum: PROPERTY_TYPES, required: true },
        userRef: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true },
);

export type SearchingForAttributes = InferSchemaType<typeof searchingForSchema>;
export type SearchingForDocument = HydratedDocument<SearchingForAttributes>;

const SearchingFor = model('SearchingFor', searchingForSchema);

export default SearchingFor;
