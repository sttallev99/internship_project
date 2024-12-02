import { Router } from "express";
import { createRentOut, createSearchFor } from "../controllers/createListing.controller.js";

const router = Router();

router.post('/rent-out', createRentOut);
router.post('/searching-for', createSearchFor)

export default router;
