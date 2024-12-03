import { Router } from "express";
import { createSearchFor, getAllSearchedFor, getSingleSearchedFor } from "../controllers/searchFor.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = Router();

router.post('/', isAuth, createSearchFor);
router.get('/', getAllSearchedFor)
router.get('/:search_for_id', getSingleSearchedFor)

export default router;
