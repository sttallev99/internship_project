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
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
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
    newPrice: {
        type: Number,
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
        type: String,
        required: true
    },
    propertyType: {
        type: String,
        enum: ['Apartment', "Container Home", "Tiny Home", "Villa Type", "Duplex Modern Houses"],
        required: true,
    },
    images: {
        type: Array
    },
    userRef: {
        type: String,
        required: true
    },
}, { timestamps: true });

const RentingOut = mongoose.model("RentingOut", rentingOutSchema);
export default RentingOut
