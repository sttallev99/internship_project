import { MAX_PAGE_SIZE } from '../constants/listing.js';
import {
    createRentingOutListing,
    deleteRentOutListing,
    getActiveRentingOutListings,
    getSingleRentOutListing,
    requestRentOut,
    updateRentOutListing,
} from '../services/rentingOut.services.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import { isListingOwner, sanitizeListingInput } from '../utils/listingInput.js';
import { parsePositiveInt } from '../utils/queryParsers.js';

const findRentOutOrThrow = async (id: string) => {
    const listing = await getSingleRentOutListing(id);
    if (!listing) {
        throw new AppError('Listing not found', 404);
    }
    return listing;
};

export const createRentOut = catchAsync(async (req, res) => {
    const rentingOutListing = await createRentingOutListing({
        ...sanitizeListingInput(req.body),
        userRef: req.userId,
    });

    res.status(201).json({ success: true, message: 'Listing created successfully!', rentingOutListing });
});

export const getSingleRentOut = catchAsync(async (req, res) => {
    const rentingOut = await findRentOutOrThrow(req.params.rent_id);

    res.status(200).json({ success: true, rentingOut });
});

export const getAllRentOut = catchAsync(async (req, res) => {
    const limit = parsePositiveInt(req.query.limit, MAX_PAGE_SIZE, MAX_PAGE_SIZE);
    const rentOuts = await getActiveRentingOutListings(limit);

    res.status(200).json({ success: true, rentOuts });
});

export const updateRentOut = catchAsync(async (req, res) => {
    const listing = await findRentOutOrThrow(req.params.rent_id);
    if (!isListingOwner(listing.userRef, req.userId)) {
        throw new AppError('You can only update your own listings', 403);
    }

    const updatedListing = await updateRentOutListing(listing.id, sanitizeListingInput(req.body));

    res.status(200).json({ success: true, message: 'Listing updated successfully', updatedListing });
});

/** A tenant asks to rent a listing; the owner then accepts or rejects it (see user.controller). */
export const requestRent = catchAsync(async (req, res) => {
    const listing = await findRentOutOrThrow(req.params.rent_id);
    if (isListingOwner(listing.userRef, req.userId)) {
        throw new AppError('You cannot rent your own listing', 400);
    }

    const requestedListing = await requestRentOut(listing.id, req.userId!);
    if (!requestedListing) {
        throw new AppError('This listing is no longer available', 409);
    }

    res.status(200).json({ success: true, message: 'Rent request sent' });
});

export const deleteRentOut = catchAsync(async (req, res) => {
    const listing = await findRentOutOrThrow(req.params.rent_id);
    if (!isListingOwner(listing.userRef, req.userId)) {
        throw new AppError('You can only delete your own listings', 403);
    }

    await deleteRentOutListing(listing.id);

    res.status(200).json({ success: true, message: 'Listing deleted successfully' });
});
