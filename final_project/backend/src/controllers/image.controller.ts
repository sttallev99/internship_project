import { uploadImageToS3 } from '../services/s3.services.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

export const uploadImage = catchAsync(async (req, res) => {
    if (!req.file) {
        throw new AppError('An "image" file is required', 400);
    }

    const imageURL = await uploadImageToS3(req.file);

    res.status(201).json({ success: true, imageURL });
});
