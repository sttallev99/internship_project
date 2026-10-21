import { Types, type PipelineStage } from 'mongoose';

import RentingOut, { type RentingOutAttributes } from '../models/RentingOut.model.js';
import SearchingFor from '../models/SearchingFor.model.js';
import { paginationStage, toPage, type Page, type PaginationFacet } from '../utils/pagination.js';
import type { Listing } from './listing.services.js';

/** Returns every rent-out and searched-for listing created by the user, newest first. */
export const getOwnListings = async (userId: string, page: number, limit: number): Promise<Page<Listing>> => {
    // userRef is stored as an ObjectId, and aggregation does not cast strings automatically.
    const byOwner: PipelineStage.Match = { $match: { userRef: new Types.ObjectId(userId) } };

    const result = await RentingOut.aggregate<PaginationFacet<Listing>>([
        byOwner,
        { $unionWith: { coll: SearchingFor.collection.name, pipeline: [byOwner] } },
        { $sort: { createdAt: -1, _id: 1 } },
        paginationStage(page, limit),
    ]);

    return toPage(result, page, limit);
};

/** Returns the rent-out listings the user requested to rent (pending) or is renting (taken). */
export const getRentedListings = async (
    userId: string,
    page: number,
    limit: number,
): Promise<Page<RentingOutAttributes>> => {
    const result = await RentingOut.aggregate<PaginationFacet<RentingOutAttributes>>([
        { $match: { tenantRef: new Types.ObjectId(userId) } },
        { $sort: { updatedAt: -1, _id: 1 } },
        paginationStage(page, limit),
    ]);

    return toPage(result, page, limit);
};
