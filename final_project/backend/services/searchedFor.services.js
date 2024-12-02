import SearchingFor from "../models/SearchingFor.model.js"

export const createSearchedForListing = async (listing) => {
    return await SearchingFor.create(listing);
}

export const getAllSearchedForListings = async () => {
    return await SearchingFor.find({});
}
