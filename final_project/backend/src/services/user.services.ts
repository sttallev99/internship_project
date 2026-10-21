import { Types, type PipelineStage } from 'mongoose';

import Conversation from '../models/Conversation.model.js';
import RentingOut, { type RentingOutAttributes } from '../models/RentingOut.model.js';
import SearchingFor from '../models/SearchingFor.model.js';
import User from '../models/User.model.js';
import { paginationStage, toPage, type Page, type PaginationFacet } from '../utils/pagination.js';
import type { Listing } from './listing.services.js';

export interface TenantSummary {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
}

export type OwnListing = Listing & { tenant?: TenantSummary };
export type RentedListing = RentingOutAttributes & { _id: Types.ObjectId; conversationId?: Types.ObjectId };

/** Attaches `tenant` (name only) to rent-out listings that have a rent request. */
const withTenant: PipelineStage.FacetPipelineStage[] = [
    {
        $lookup: {
            from: User.collection.name,
            localField: 'tenantRef',
            foreignField: '_id',
            pipeline: [{ $project: { firstName: 1, lastName: 1 } }],
            as: 'tenant',
        },
    },
    { $set: { tenant: { $arrayElemAt: ['$tenant', 0] } } },
];

/** Attaches the id of the user's conversation about each listing, if the owner started one. */
const withConversationId = (tenantId: Types.ObjectId): PipelineStage.FacetPipelineStage[] => [
    {
        $lookup: {
            from: Conversation.collection.name,
            let: { listingId: '$_id' },
            pipeline: [
                { $match: { $expr: { $eq: ['$listingRef', '$$listingId'] }, tenantRef: tenantId } },
                { $project: { _id: 1 } },
            ],
            as: 'conversation',
        },
    },
    { $set: { conversationId: { $arrayElemAt: ['$conversation._id', 0] } } },
    { $unset: 'conversation' },
];

/** Returns every rent-out and searched-for listing created by the user, newest first. */
export const getOwnListings = async (userId: string, page: number, limit: number): Promise<Page<OwnListing>> => {
    // userRef is stored as an ObjectId, and aggregation does not cast strings automatically.
    const byOwner: PipelineStage.Match = { $match: { userRef: new Types.ObjectId(userId) } };

    const result = await RentingOut.aggregate<PaginationFacet<OwnListing>>([
        byOwner,
        { $unionWith: { coll: SearchingFor.collection.name, pipeline: [byOwner] } },
        { $sort: { createdAt: -1, _id: 1 } },
        paginationStage(page, limit, withTenant),
    ]);

    return toPage(result, page, limit);
};

/** Returns the rent-out listings the user requested to rent (pending) or is renting (taken). */
export const getRentedListings = async (
    userId: string,
    page: number,
    limit: number,
): Promise<Page<RentedListing>> => {
    const tenantId = new Types.ObjectId(userId);

    const result = await RentingOut.aggregate<PaginationFacet<RentedListing>>([
        { $match: { tenantRef: tenantId } },
        { $sort: { updatedAt: -1, _id: 1 } },
        paginationStage(page, limit, withConversationId(tenantId)),
    ]);

    return toPage(result, page, limit);
};
