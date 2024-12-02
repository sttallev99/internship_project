import { createRentingOutListing } from "../services/rentingOut.services.js";
import { createSearchedForListing } from "../services/searchedFor.services.js";

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
