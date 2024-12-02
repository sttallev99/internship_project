import { Router } from "express";
import { createRentOut } from "../controllers/rentOut.controller.js";

const router = Router();

router.post('/', createRentOut);

export default router;
