import { Router } from "express";
import { createSearchFor } from "../controllers/searchFor.controller.js";

const router = Router();

router.post('/', createSearchFor)

export default router;
