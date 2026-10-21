import type { RentOutStatus } from '../constants/listing.js';
import RentingOut from '../models/RentingOut.model.js';
import type { UserDocument } from '../models/User.model.js';
import type { ListingInput } from '../utils/listingInput.js';

export const createRentingOutListing = (listing: ListingInput) => RentingOut.create(listing);

export const getActiveRentingOutListings = (limit: number) =>
    RentingOut.find({ status: 'active' }).sort({ createdAt: -1 }).limit(limit);

export const getSingleRentOutListing = (id: string) =>
    RentingOut.findById(id).populate<{ userRef: UserDocument | null }>('userRef');

export const updateRentOutListing = (id: string, data: ListingInput) =>
    RentingOut.findByIdAndUpdate(id, data, { new: true, runValidators: true });

export const changeRentOutStatus = (id: string, status: RentOutStatus) =>
    RentingOut.findByIdAndUpdate(id, { status }, { new: true });

export const deleteRentOutListing = (id: string) => RentingOut.findByIdAndDelete(id);
