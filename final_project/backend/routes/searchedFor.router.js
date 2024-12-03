import { Router } from "express";
import { createSearchFor, getAllSearchedFor, getSingleSearchedFor, updateSearchFor } from "../controllers/searchFor.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = Router();

router.post('/', isAuth, createSearchFor);
router.get('/', getAllSearchedFor)
router.get('/:search_for_id', getSingleSearchedFor)
router.put('/:search_for_id', isAuth, updateSearchFor)

export default router;
