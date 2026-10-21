import type { PipelineStage } from 'mongoose';

import type { ListingType, PropertyType, SortOption } from '../constants/listing.js';
import RentingOut, { type RentingOutAttributes } from '../models/RentingOut.model.js';
import SearchingFor, { type SearchingForAttributes } from '../models/SearchingFor.model.js';
import { paginationStage, toPage, type Page, type PaginationFacet } from '../utils/pagination.js';

export type Listing = RentingOutAttributes | SearchingForAttributes;

export interface ListingFilters {
    page: number;
    limit: number;
    searchTerm?: string;
    /** When omitted, both rent-out and searched-for listings are returned. */
    listingType?: ListingType;
    propertyTypes: PropertyType[];
    minPrice?: number;
    maxPrice?: number;
    sortBy: SortOption;
}

// `_id` is a tie-breaker so pagination stays stable when sort keys are equal.
const SORT_STAGES: Record<SortOption, PipelineStage.Sort> = {
    recentlyAdded: { $sort: { createdAt: -1, _id: 1 } },
    priceInc: { $sort: { price: 1, _id: 1 } },
    priceDec: { $sort: { price: -1, _id: 1 } },
};

const escapeRegex = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const buildFilterStage = (filters: ListingFilters): PipelineStage.Match | undefined => {
    const { searchTerm, propertyTypes, minPrice, maxPrice } = filters;
    const match: Record<string, unknown> = {};

    if (searchTerm) {
        match.title = { $regex: escapeRegex(searchTerm), $options: 'i' };
    }
    if (propertyTypes.length > 0) {
        match.propertyType = { $in: propertyTypes };
    }

    const priceRange: Record<string, number> = {};
    if (minPrice !== undefined) priceRange.$gte = minPrice;
    if (maxPrice !== undefined) priceRange.$lte = maxPrice;
    if (Object.keys(priceRange).length > 0) {
        match.price = priceRange;
    }

    return Object.keys(match).length > 0 ? { $match: match } : undefined;
};

/** Searches rent-out (active only) and searched-for listings with filtering, sorting and pagination. */
export const findListings = async (filters: ListingFilters): Promise<Page<Listing>> => {
    const { page, limit, listingType, sortBy } = filters;
    const filterStage = buildFilterStage(filters);

    const stages: PipelineStage[] = [];
    if (listingType !== 'searchfor') {
        stages.push({ $match: { status: 'active' } });
    }
    if (listingType === undefined) {
        stages.push({ $unionWith: { coll: SearchingFor.collection.name } });
    }
    if (filterStage) {
        stages.push(filterStage);
    }
    stages.push(SORT_STAGES[sortBy], paginationStage(page, limit));

    const result =
        listingType === 'searchfor'
            ? await SearchingFor.aggregate<PaginationFacet<Listing>>(stages)
            : await RentingOut.aggregate<PaginationFacet<Listing>>(stages);

    return toPage(result, page, limit);
};
