import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

// Hosting platforms terminate HTTPS at a proxy in front of the app.
app.set('trust proxy', 1);

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: env.clientOrigin, credentials: true }));

app.use(authRouter);
app.use('/user', userRouter);
app.use('/listing', listingRouter);
app.use('/images', imageRouter);
app.use('/conversations', chatRouter);

// In production the same server also serves the built React app, so the frontend, API and
// Socket.IO share one origin and the auth cookie works without cross-site settings.
const clientBuildDir = fileURLToPath(new URL('../../frontend/build', import.meta.url));
if (env.nodeEnv === 'production' && existsSync(clientBuildDir)) {
    app.use(express.static(clientBuildDir));
    // Client-side routes (e.g. /listings, /profile/messages/123) all load index.html.
    app.get('*', (req, res, next) => {
        if (!req.accepts('html')) return next();
        res.sendFile(path.join(clientBuildDir, 'index.html'));
    });
}

app.all('*', (req, _res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
