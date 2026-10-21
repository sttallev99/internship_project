import { LISTING_KIND } from '../constants';

/** Searched-for listings carry preferred areas instead of a concrete address. */
export const isSearchedFor = (listing) => Array.isArray(listing?.prefAreas);

export const getListingKind = (listing) =>
    isSearchedFor(listing) ? LISTING_KIND.SEARCHED_FOR : LISTING_KIND.RENT_OUT;

export const getListingDetailsPath = (listing) =>
    `/listing-details/${listing._id}?type=${getListingKind(listing)}`;

export const getListingEditPath = (listing) =>
    `/profile/edit-listing/${listing._id}?type=${getListingKind(listing)}`;

export const formatLocation = (listing) => {
    const place = isSearchedFor(listing) ? listing.prefAreas[0] : listing.address;
    return [place, listing.city, listing.country].filter(Boolean).join(', ');
};

export const formatDate = (isoDate) =>
    isoDate
        ? new Date(isoDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        : '—';
