import {
    DEFAULT_PAGE_SIZE,
    LISTING_TYPES,
    MAX_PAGE_SIZE,
    PROPERTY_TYPES,
    SORT_OPTIONS,
} from '../constants/listing.js';
import { findListings, type ListingFilters } from '../services/listing.services.js';
import catchAsync from '../utils/catchAsync.js';
import {
    parseEnum,
    parseEnumList,
    parseOptionalNumber,
    parsePositiveInt,
    parseString,
} from '../utils/queryParsers.js';

export const getAllListings = catchAsync(async (req, res) => {
    const { query } = req;

    const filters: ListingFilters = {
        page: parsePositiveInt(query.page, 1),
        limit: parsePositiveInt(query.limit, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE),
        searchTerm: parseString(query.searchTerm),
        listingType: parseEnum(query.listingType, LISTING_TYPES),
        propertyTypes: parseEnumList(query.propertyType, PROPERTY_TYPES),
        minPrice: parseOptionalNumber(query.minPrice),
        maxPrice: parseOptionalNumber(query.maxPrice),
        sortBy: parseEnum(query.sortBy, SORT_OPTIONS) ?? 'recentlyAdded',
    };

    const listingsData = await findListings(filters);

    res.status(200).json({ success: true, listingsData });
});
