import {
    createSearchedForListing,
    deleteSearchForListing,
    getAllSearchedForListings,
    getSingleSearchedForListing,
    updateSearchedForListing,
} from '../services/searchedFor.services.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import { isListingOwner, sanitizeListingInput } from '../utils/listingInput.js';

const findSearchForOrThrow = async (id: string) => {
    const listing = await getSingleSearchedForListing(id);
    if (!listing) {
        throw new AppError('Listing not found', 404);
    }
    return listing;
};

export const createSearchFor = catchAsync(async (req, res) => {
    const searchingForListing = await createSearchedForListing({
        ...sanitizeListingInput(req.body),
        userRef: req.userId,
    });

    res.status(201).json({ success: true, message: 'Listing created successfully!', searchingForListing });
});

export const getSingleSearchedFor = catchAsync(async (req, res) => {
    const searchedForListing = await findSearchForOrThrow(req.params.search_for_id);

    res.status(200).json({ success: true, searchedForListing });
});

export const getAllSearchedFor = catchAsync(async (_req, res) => {
    const searchedForListings = await getAllSearchedForListings();

    res.status(200).json({ success: true, searchedForListings });
});

export const updateSearchFor = catchAsync(async (req, res) => {
    const listing = await findSearchForOrThrow(req.params.search_for_id);
    if (!isListingOwner(listing.userRef, req.userId)) {
        throw new AppError('You can only update your own listings', 403);
    }

    const updatedListing = await updateSearchedForListing(listing.id, sanitizeListingInput(req.body));

    res.status(200).json({ success: true, message: 'Listing updated successfully', updatedListing });
});

export const deleteSearchFor = catchAsync(async (req, res) => {
    const listing = await findSearchForOrThrow(req.params.search_for_id);
    if (!isListingOwner(listing.userRef, req.userId)) {
        throw new AppError('You can only delete your own listings', 403);
    }

    await deleteSearchForListing(listing.id);

    res.status(200).json({ success: true, message: 'Listing deleted successfully' });
});
