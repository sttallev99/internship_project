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
    footage: {
        type: Array,
        required: true
    },
    prefAreas: {
        type: Array,
        required: true
    },
    priceCeiling: {
        type: Number,
        required: true
    },
    userRef: {
        type: String,
        required: true
    },
}, { timestamps: true });

const SearchingFor = mongoose.model("SearchingFor", searchingForSchema);

export default SearchingFor;
