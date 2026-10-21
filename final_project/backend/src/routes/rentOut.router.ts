import { Router } from 'express';

import {
    createRentOut,
    deleteRentOut,
    getAllRentOut,
    getSingleRentOut,
    requestRent,
    updateRentOut,
} from '../controllers/rentOut.controller.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = Router();

router.route('/').get(getAllRentOut).post(isAuth, createRentOut);
router.route('/:rent_id').get(getSingleRentOut).put(isAuth, updateRentOut).delete(isAuth, deleteRentOut);
router.put('/:rent_id/request-rent', isAuth, requestRent);

export default router;
