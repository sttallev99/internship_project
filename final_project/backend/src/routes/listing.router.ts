import { Router } from "express";
import rentOutListingRouter from './rentOut.router.js';
import searchForListingRouter from './searchedFor.router.js'
import { getAllListings } from "../controllers/listing.controller.js";

const router = Router();

router.use('/rent-out', rentOutListingRouter);
router.use('/search-for', searchForListingRouter)

router.get('/', getAllListings);

export default router;
