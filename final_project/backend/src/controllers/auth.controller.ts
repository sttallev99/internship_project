import type { CookieOptions } from 'express';

import { ACCESS_TOKEN_COOKIE } from '../middlewares/isAuth.js';
import {
    ACCESS_TOKEN_TTL_SECONDS,
    createAccessToken,
    createUser,
    findUserByEmail,
    verifyCredentials,
    type SignUpInput,
} from '../services/auth.services.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
};

const requireCredentials = (email: unknown, password: unknown): { email: string; password: string } => {
    if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
        throw new AppError('Email and password are required', 400);
    }
    return { email, password };
};

export const signUp = catchAsync(async (req, res) => {
    const { firstName, lastName, nickname, phoneNumber } = req.body as Partial<SignUpInput>;
    const { email, password } = requireCredentials(req.body?.email, req.body?.password);

    if (await findUserByEmail(email)) {
        throw new AppError('A user with this email already exists', 409);
    }

    const user = await createUser({
        firstName: firstName ?? '',
        lastName: lastName ?? '',
        nickname: nickname ?? '',
        phoneNumber: phoneNumber ?? '',
        email,
        password,
    });

    res.status(201).json({ success: true, message: 'User created successfully!', user });
});

export const signIn = catchAsync(async (req, res) => {
    const { email, password } = requireCredentials(req.body?.email, req.body?.password);

    const user = await verifyCredentials(email, password);
    if (!user) {
        throw new AppError('Invalid email or password', 401);
    }

    res.cookie(ACCESS_TOKEN_COOKIE, createAccessToken(user.id), {
        ...cookieOptions,
        maxAge: ACCESS_TOKEN_TTL_SECONDS * 1000,
    });
    res.status(200).json({ success: true, message: 'Logged in successfully', user });
});

export const signOut = catchAsync(async (_req, res) => {
    res.clearCookie(ACCESS_TOKEN_COOKIE, cookieOptions);
    res.status(200).json({ success: true, message: 'User has been logged out!' });
});
