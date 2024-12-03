import { Router } from "express";
import { createRentOut, getSingleRentOut } from "../controllers/rentOut.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = Router();

router.post('/', isAuth, createRentOut);
router.get('/:rent_id', getSingleRentOut)

export default router;
