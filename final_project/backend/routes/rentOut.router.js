import { Router } from "express";
import { createRentOut, getAllRentOut, getSingleRentOut, updateRentOut } from "../controllers/rentOut.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = Router();

router.post('/', isAuth, createRentOut);
router.get('/', getAllRentOut);
router.get('/:rent_id', getSingleRentOut);
router.put('/:rent_id',isAuth, updateRentOut)


export default router;
