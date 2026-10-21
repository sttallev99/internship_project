import type { Types } from 'mongoose';

/** Listing fields the client may set. Everything else is validated by the Mongoose schema. */
export type ListingInput = Record<string, unknown>;

// Fields controlled by the server: ownership, the rent workflow and Mongo metadata.
const PROTECTED_FIELDS = new Set(['_id', 'userRef', 'tenantRef', 'status', 'createdAt', 'updatedAt', '__v']);

/** Strips server-controlled fields so a client cannot e.g. reassign a listing to another user. */
export const sanitizeListingInput = (body: unknown): ListingInput => {
    if (typeof body !== 'object' || body === null) return {};

    return Object.fromEntries(Object.entries(body).filter(([key]) => !PROTECTED_FIELDS.has(key)));
};

/** True when the (populated) listing owner is the given user. */
export const isListingOwner = (
    owner: { _id: Types.ObjectId } | null | undefined,
    userId: string | undefined,
): boolean => Boolean(owner && userId && owner._id.equals(userId));
