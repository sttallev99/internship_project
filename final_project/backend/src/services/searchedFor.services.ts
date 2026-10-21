import SearchingFor from '../models/SearchingFor.model.js';
import type { UserDocument } from '../models/User.model.js';
import type { ListingInput } from '../utils/listingInput.js';

export const createSearchedForListing = (listing: ListingInput) => SearchingFor.create(listing);

export const getAllSearchedForListings = () => SearchingFor.find().sort({ createdAt: -1 });

export const getSingleSearchedForListing = (id: string) =>
    SearchingFor.findById(id).populate<{ userRef: UserDocument | null }>('userRef');

export const updateSearchedForListing = (id: string, data: ListingInput) =>
    SearchingFor.findByIdAndUpdate(id, data, { new: true, runValidators: true });

export const deleteSearchForListing = (id: string) => SearchingFor.findByIdAndDelete(id);
