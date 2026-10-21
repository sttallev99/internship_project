export const PROPERTY_TYPES = [
    'Apartment',
    'Container Home',
    'Tiny Home',
    'Villa Type',
    'Duplex Modern Houses',
] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const RENT_OUT_STATUSES = ['active', 'pending', 'taken'] as const;
export type RentOutStatus = (typeof RENT_OUT_STATUSES)[number];

export const LISTING_TYPES = ['rentout', 'searchfor'] as const;
export type ListingType = (typeof LISTING_TYPES)[number];

export const SORT_OPTIONS = ['recentlyAdded', 'priceInc', 'priceDec'] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];

export const DEFAULT_PAGE_SIZE = 5;
export const MAX_PAGE_SIZE = 50;
