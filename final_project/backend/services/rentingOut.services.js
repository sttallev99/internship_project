import RentingOut from '../models/RentingOut.model.js';

export const createRentingOutListing = async (listing) => {
    return await RentingOut.create(listing);
}

export const getAllRentingOutListings = async () => {
    return await RentingOut.find({});
}

export const getSingleRentOutListing = async (id) => {
    return await RentingOut.findById(id)
}

export const updateRentOutListing = async (id, data) => {
    return await RentingOut.findByIdAndUpdate(id, data, {new: true});
}

export const deleteRentOutListing = async(id) => {
    await RentingOut.findByIdAndDelete(id);
}


export const allListings = async(page = 1, limit = 3) => {
    const allListings = RentingOut.aggregate([
        {
            $unionWith: {
                coll: "searchingfors",
            },  
        },
        {
            $sort: {
                createdAt: -1,
            },
        },
        {
            $facet: {
                metaData: [
                    {
                        $count: 'totalDocuments'
                    },
                    {
                        $addFields: {
                            pageNumber: page,
                            totalPages: { $ceil: { $divide: ["$totalDocuments", limit] } }
                        }
                    }
                ],
                data: [
                    {
                        $skip: (page - 1) * limit
                    },
                    {
                        $limit: limit
                    }
                ]
            }
        }
    ]);
    
    return allListings;
}
