import { allListings } from "../services/rentingOut.services.js"

export const getAllListings = async (req, res) => {
    const { page, limit } = req.query;
    try {
        let data = await allListings(Number(page), Number(limit));
        data = data[0];
        data.metaData = {...data.metaData[0]}
        res.status(200).json({
            success: true,
            listingsData: data
        })
    } catch(err) {
        res.status(400).json({
            success: false,
            message: err.message.toString()
        })
    }
}
