import { Router } from 'express';

import {
    getConversation,
    getConversations,
    sendMessage,
    startConversation,
} from '../controllers/chat.controller.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = Router();

router.use(isAuth);

router.route('/').get(getConversations).post(startConversation);
router.get('/:conversation_id', getConversation);
router.post('/:conversation_id/messages', sendMessage);

export default router;
