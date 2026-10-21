import { Router } from 'express';

import { changeRentStatus, getAllUserListings } from '../controllers/user.controller.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = Router();

router.use(isAuth);

router.get('/own-listings', getAllUserListings);
router.put('/change-status/:listing_id', changeRentStatus);

export default router;
