import type { Request } from 'express';

import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../constants/listing.js';
import { getSingleRentOutListing, resolveRentRequest } from '../services/rentingOut.services.js';
import { getOwnListings, getRentedListings } from '../services/user.services.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import { isListingOwner } from '../utils/listingInput.js';
import { parseEnum, parsePositiveInt } from '../utils/queryParsers.js';

const RENT_DECISIONS = ['accept', 'reject'] as const;

const parsePagination = (req: Request) => ({
    page: parsePositiveInt(req.query.page, 1),
    limit: parsePositiveInt(req.query.limit, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE),
});

export const getAllUserListings = catchAsync(async (req, res) => {
    const { page, limit } = parsePagination(req);

    const listingsData = await getOwnListings(req.userId!, page, limit);

    res.status(200).json({ success: true, listingsData });
});

/** Listings the current user asked to rent, whether still pending or already accepted. */
export const getMyRents = catchAsync(async (req, res) => {
    const { page, limit } = parsePagination(req);

    const listingsData = await getRentedListings(req.userId!, page, limit);

    res.status(200).json({ success: true, listingsData });
});

export const changeRentStatus = catchAsync(async (req, res) => {
    const decision = parseEnum(req.body?.listingStatus, RENT_DECISIONS);
    if (!decision) {
        throw new AppError('listingStatus must be either "accept" or "reject"', 400);
    }

    const listing = await getSingleRentOutListing(req.params.listing_id);
    if (!listing) {
        throw new AppError('Listing not found', 404);
    }
    if (!isListingOwner(listing.userRef, req.userId)) {
        throw new AppError('You can only manage your own listings', 403);
    }
    if (listing.status !== 'pending') {
        throw new AppError('This listing has no pending rent request', 409);
    }

    await resolveRentRequest(listing.id, decision === 'accept');

    res.status(200).json({ success: true, message: 'Listing status changed' });
});
