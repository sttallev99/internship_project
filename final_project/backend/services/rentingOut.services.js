import RentingOut from '../models/RentingOut.model.js';

export const createRentingOutListing = async (listing) => {
    return await RentingOut.create(listing);
}

export const getAllRentingOutListings = async () => {
    return await RentingOut.find({});
}

export const getSingleRentOutListing = async (id) => {
    return await RentingOut.findById(id)
}

export const updateRentOutListing = async (id, data) => {
    return await RentingOut.findByIdAndUpdate(id, data, {new: true});
}
