// In production the API is served from the same origin as the app; in development it runs on :5000.
export const baseUrl =
    process.env.REACT_APP_API_URL ?? (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000');

export const PAGE_SIZE = 5;
export const TRENDING_LISTINGS_COUNT = 6;

export const PROPERTY_TYPES = ['Apartment', 'Container Home', 'Tiny Home', 'Villa Type', 'Duplex Modern Houses'];

/** Value of the `?type=` query param used by the details and edit pages. */
export const LISTING_KIND = {
    RENT_OUT: 'rent_out',
    SEARCHED_FOR: 'searched_for',
};

/** Values accepted by the backend `listingType` filter. */
export const LISTING_TYPE_FILTER = {
    RENT_OUT: 'rentout',
    SEARCH_FOR: 'searchfor',
};

export const SORT_OPTIONS = [
    { value: 'recentlyAdded', label: 'Recently Added' },
    { value: 'priceInc', label: 'Price Low' },
    { value: 'priceDec', label: 'Price High' },
];

export const PRICE_RANGE = { min: 100, max: 5000, step: 100, gap: 200 };

export const EMAIL_PATTERN = /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/;
