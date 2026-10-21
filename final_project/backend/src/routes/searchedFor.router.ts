import { Router } from 'express';

import {
    createSearchFor,
    deleteSearchFor,
    getAllSearchedFor,
    getSingleSearchedFor,
    updateSearchFor,
} from '../controllers/searchFor.controller.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = Router();

router.route('/').get(getAllSearchedFor).post(isAuth, createSearchFor);
router
    .route('/:search_for_id')
    .get(getSingleSearchedFor)
    .put(isAuth, updateSearchFor)
    .delete(isAuth, deleteSearchFor);

export default router;
