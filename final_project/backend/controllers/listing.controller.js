import { getAllRentingOutListings } from "../services/rentingOut.services.js"
import { getAllSearchedForListings } from "../services/searchedFor.services.js";

export const getAllListings = async (req, res) => {
    try {
        const rentingOutListings = await getAllRentingOutListings();
        const searchedForListings = await getAllSearchedForListings();
        console.log(req.userId)

        res.status(200).json({
            success: true,
            listings: [...rentingOutListings, ...searchedForListings]
        })
    } catch(err) {
        res.status(400).json({
            success: false,
            message: err.message.toString()
        })
    }
}
