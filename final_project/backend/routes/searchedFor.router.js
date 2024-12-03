import { Router } from "express";
import { createSearchFor, getSingleSearchedFor } from "../controllers/searchFor.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = Router();

router.post('/', isAuth, createSearchFor)
router.get('/:search_for_id', getSingleSearchedFor)

export default router;
