import { Router } from "express";
import { createRentOut } from "../controllers/rentingOut.controller.js";

const router = Router();

router.post('/rent-out', createRentOut)

export default router;
