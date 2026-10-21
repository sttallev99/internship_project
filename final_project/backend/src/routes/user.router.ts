import { Router } from 'express';

import { changeRentStatus, getAllUserListings, getMyRents } from '../controllers/user.controller.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = Router();

router.use(isAuth);

router.get('/own-listings', getAllUserListings);
router.get('/my-rents', getMyRents);
router.put('/change-status/:listing_id', changeRentStatus);

export default router;
