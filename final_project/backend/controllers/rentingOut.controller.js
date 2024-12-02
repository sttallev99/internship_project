import { create } from "../services/rentingOut.services.js"

export const createRentOut = async (req, res) => {
    try {
        const rentingOutListing = await create(req.body);
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
