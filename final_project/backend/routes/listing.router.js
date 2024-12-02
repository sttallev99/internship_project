import { Router } from "express";
import createListingRouter from './createListing.router.js'

const router = Router();

router.use('/create', createListingRouter)

export default router;
