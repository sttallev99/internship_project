import RentingOut from '../models/RentingOut.model.js';

export const createRentingOutListing = async (listing) => {
    return await RentingOut.create(listing);
}

export const getAllRentingOutListings = async () => {
    return await RentingOut.find({});
}
