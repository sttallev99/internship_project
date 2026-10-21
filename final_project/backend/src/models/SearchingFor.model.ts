import mongoose from "mongoose";

const searchingForSchema = new mongoose.Schema({
    title: {
        type: String,
        required:  true
    },
    content: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    prefAreas: {
        type: Array,
        required: true
    },
    maxPrice: {
        type: Number,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    footage: {
        type: Number,
        required: true
    },
    propertyType: {
        type: String,
        required: true
    },
    userRef: {
        type: String,
        required: true
    },
}, { timestamps: true });

const SearchingFor = mongoose.model("SearchingFor", searchingForSchema);

export default SearchingFor;
