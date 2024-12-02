import { Router } from "express";
import { createRentOut } from "../controllers/rentOut.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = Router();

router.post('/', isAuth, createRentOut);

export default router;
