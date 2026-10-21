import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import { env } from './config/env.js';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import authRouter from './routes/auth.router.js';
import chatRouter from './routes/chat.router.js';
import imageRouter from './routes/image.router.js';
import listingRouter from './routes/listing.router.js';
import userRouter from './routes/user.router.js';
import AppError from './utils/AppError.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: env.clientOrigin, credentials: true }));

app.use(authRouter);
app.use('/user', userRouter);
app.use('/listing', listingRouter);
app.use('/images', imageRouter);
app.use('/conversations', chatRouter);

app.all('*', (req, _res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
