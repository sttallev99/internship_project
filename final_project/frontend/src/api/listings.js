import api from './client';
import { LISTING_KIND } from '../constants';

const ENDPOINT_BY_KIND = {
    [LISTING_KIND.RENT_OUT]: '/listing/rent-out',
    [LISTING_KIND.SEARCHED_FOR]: '/listing/search-for',
};

const endpointFor = (kind) => {
    const endpoint = ENDPOINT_BY_KIND[kind];
    if (!endpoint) {
        throw new Error(`Unknown listing kind: ${kind}`);
    }
    return endpoint;
};

/** Paginated search across both listing kinds. Resolves to `{ metaData, data }`. */
export const searchListings = async (params) => {
    const { data } = await api.get('/listing', { params });
    return data.listingsData;
};

export const getTrendingListings = async (limit) => {
    const { data } = await api.get(ENDPOINT_BY_KIND[LISTING_KIND.RENT_OUT], { params: { limit } });
    return data.rentOuts;
};

export const getListing = async (kind, id) => {
    const { data } = await api.get(`${endpointFor(kind)}/${id}`);
    return kind === LISTING_KIND.RENT_OUT ? data.rentingOut : data.searchedForListing;
};

export const createListing = (kind, listing) => api.post(endpointFor(kind), listing);

export const updateListing = (kind, id, listing) => api.put(`${endpointFor(kind)}/${id}`, listing);

export const deleteListing = (kind, id) => api.delete(`${endpointFor(kind)}/${id}`);

export const requestRent = (id) => api.put(`${ENDPOINT_BY_KIND[LISTING_KIND.RENT_OUT]}/${id}/request-rent`);

export const uploadImage = async (file) => {
    const form = new FormData();
    form.append('image', file);

    const { data } = await api.post('/images', form);
    return data.imageURL;
};
