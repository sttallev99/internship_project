import api from './client';

/** Resolves to `{ metaData, data }` with the current user's listings. */
export const getOwnListings = async ({ page, limit }) => {
    const { data } = await api.get('/user/own-listings', { params: { page, limit } });
    return data.listingsData;
};

/** Resolves to `{ metaData, data }` with the listings the current user requested to rent or is renting. */
export const getMyRents = async ({ page, limit }) => {
    const { data } = await api.get('/user/my-rents', { params: { page, limit } });
    return data.listingsData;
};

/** Owner's answer to a pending rent request: `decision` is "accept" or "reject". */
export const decideRentRequest = (listingId, decision) =>
    api.put(`/user/change-status/${listingId}`, { listingStatus: decision });
