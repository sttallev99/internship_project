import { Router } from "express";
import { createSearchFor } from "../controllers/searchFor.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = Router();

router.post('/', isAuth, createSearchFor)

export default router;
