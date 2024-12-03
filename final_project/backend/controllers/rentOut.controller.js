import { createRentingOutListing, getSingleRentOutListing } from "../services/rentingOut.services.js";
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
            throw new AppError('Listing not found', 404);
        }
        res.status(200).json({rentingOut});
    } catch(err) {
        next(err);
    }
    
}

