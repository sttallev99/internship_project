import type { RequestHandler } from 'express';

import { verifyAccessToken } from '../services/auth.services.js';
import AppError from '../utils/AppError.js';

export const ACCESS_TOKEN_COOKIE = 'access_token';

export const isAuth: RequestHandler = (req, _res, next) => {
    const token: unknown = req.cookies?.[ACCESS_TOKEN_COOKIE];

    if (typeof token !== 'string' || token === '') {
        return next(new AppError('Unauthorized', 401));
    }

    try {
        req.userId = verifyAccessToken(token).userId;
        next();
    } catch {
        next(new AppError('Forbidden', 403));
    }
};
