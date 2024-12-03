import { createRentingOutListing, deleteRentOutListing, getAllRentingOutListings, getSingleRentOutListing, updateRentOutListing } from "../services/rentingOut.services.js";
import AppError from "../utils/AppError.js";

export const createRentOut = async (req, res) => {
    try {
        const rentingOutListing = await createRentingOutListing(req.body);
        res.status(201).json({
            success: true,
            message: "Listing created successfully!",
            rentingOutListing,
        });
    } catch(err) {
        res.status(401).json({
            success: false,
            message: err.message.toString()
        })
    }
}

export const getSingleRentOut = async (req, res, next) => {
    try{
        const rentingOut = await getSingleRentOutListing(req.params.rent_id);

        if(!rentingOut) {
            return next(new AppError('Listing not found', 404));
        }
        res.status(200).json({rentingOut});
    } catch(err) {
        next(new AppError(err.message, 400));
    }
}

export const getAllRentOut = async (req, res, next) => {
    try {
        const rentOuts = await getAllRentingOutListings();
        res.status(200).json({rentOuts});
    } catch(err) {
        next(new AppError(err.message, 400));
    }
}

export const updateRentOut = async (req, res, next) => {
    const listingId = req.params.rent_id;
    try {
        const listing = await getSingleRentOutListing(listingId);
        
        if(!listing) {
            return next(new AppError('Listing not found', 404));
        }
        if(req.userId !== listing.userRef) {
            return next(new AppError("You can only update your own listings", 401));
        }
    
        const updatedListing = await updateRentOutListing(listingId, req.body);
        res.status(200).json({
            message: "Listing updated successfully",
            updatedListing
        })
    } catch(err) {
        next(new AppError(err.message, 400))
    }
}

export const deleteRentOut = async (req, res, next) => {
    const listingId = req.params.rent_id;
    try {
        const listing = await getSingleRentOutListing(listingId);

        if(!listing) {
            return next(new AppError("Listing not found", 404));
        }
        if(req.userId !== listing.userRef) {
            return next(new AppError("You can only delete your own listings", 401));
        }
        await deleteRentOutListing(listingId);
        res.status(200).json({
            message: "Listing deleted successfully"
        });
    } catch(err) {
        next(new AppError(err.message, 400));
    }
}

