import { Router } from 'express';
import { signOut, signUp, singIn } from '../controllers/auth.controller.js';

const router = Router();

router.post('/sign-up', signUp);
router.post('/sign-in', singIn);
router.get('/sign-out', signOut);

export default router;
