import { Router } from 'express';
import multer from 'multer';

import { uploadImage } from '../controllers/image.controller.js';
import { isAuth } from '../middlewares/isAuth.js';
import AppError from '../utils/AppError.js';

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ['image/jpg', 'image/jpeg', 'image/png'];

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_IMAGE_SIZE_BYTES },
    fileFilter: (_req, file, callback) => {
        if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new AppError('Only JPG and PNG images are allowed', 400));
        }
    },
});

const router = Router();

router.post('/', isAuth, upload.single('image'), uploadImage);

export default router;
