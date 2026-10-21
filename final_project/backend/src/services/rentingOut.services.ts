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

/**
 * Marks an active listing as requested by the tenant. The status condition makes the update atomic,
 * so two users cannot request the same listing at once. Resolves to `null` if it was no longer active.
 */
export const requestRentOut = (id: string, tenantId: string) =>
    RentingOut.findOneAndUpdate(
        { _id: id, status: 'active' },
        { status: 'pending', tenantRef: tenantId },
        { new: true },
    );

/** The owner's answer to a pending request: accepting keeps the tenant, rejecting frees the listing. */
export const resolveRentRequest = (id: string, isAccepted: boolean) =>
    RentingOut.findByIdAndUpdate(
        id,
        isAccepted ? { status: 'taken' } : { status: 'active', tenantRef: null },
        { new: true },
    );

export const deleteRentOutListing = (id: string) => RentingOut.findByIdAndDelete(id);
