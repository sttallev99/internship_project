import RentingOut from '../models/RentingOut.model.js';

export const create = async (listing) => {
    return await RentingOut.create(listing);
}
