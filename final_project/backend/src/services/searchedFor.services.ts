import SearchingFor from "../models/SearchingFor.model.js"

export const createSearchedForListing = async (listing) => {
    return await SearchingFor.create(listing);
}

export const getAllSearchedForListings = async () => {
    return await SearchingFor.find({});
}

export const getSingleSearchedForListing = async (id) => {
    return await SearchingFor.findById(id);
}

export const updateSearchedForListing = async (id, data) => {
    return await SearchingFor.findByIdAndUpdate(id, data, {new: true});
}

export const deleteSearchForListing = async (id) => {
    await SearchingFor.findByIdAndDelete(id);
}
