import mongoose from "mongoose";

const rentingOutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true
    },
    footage: {
        type: Array,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userRef: {
        type: String,
        required: true
    },
}, { timestamps: true });

const RentingOut = mongoose.model("RentingOut", rentingOutSchema);
export default RentingOut
