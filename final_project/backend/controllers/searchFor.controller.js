import { createSearchedForListing, getAllSearchedForListings, getSingleSearchedForListing } from "../services/searchedFor.services.js";
import AppError from "../utils/AppError.js";

export const createSearchFor = async (req, res) => {
    try {
        const searchingForListing = await createSearchedForListing(req.body);
        res.status(201).json({
            success: true,
            message: "Listing created successfully!",
            searchingForListing
        })
    } catch(err) {
        res.status(401).json({
            success: false,
            message: err.message.toString()
        })
    }
}

export const getSingleSearchedFor = async (req, res, next) => {
    try {
        const searchedForListing = await getSingleSearchedForListing(req.params.search_for_id);

        if(!searchedForListing) {
            throw new AppError('Listing not found', 404);
        }
        res.status(200).json({searchedForListing});
    } catch(err) {
        next(err);
    }
}

export const getAllSearchedFor = async (req, res, next) => {
    try {
        const searchedForListings = await getAllSearchedForListings();
        res.status(200).json({searchedForListings})
    } catch(err) {
        next(new AppError(err.message, 400));
    }

}
