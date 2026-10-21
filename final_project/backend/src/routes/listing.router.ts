import { Router } from 'express';

import { getAllListings } from '../controllers/listing.controller.js';
import rentOutRouter from './rentOut.router.js';
import searchedForRouter from './searchedFor.router.js';

const router = Router();

router.get('/', getAllListings);
router.use('/rent-out', rentOutRouter);
router.use('/search-for', searchedForRouter);

export default router;
