import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';
import User, { type UserDocument } from '../models/User.model.js';

export const ACCESS_TOKEN_TTL_SECONDS = 24 * 60 * 60;

export interface SignUpInput {
    firstName: string;
    lastName: string;
    nickname: string;
    email: string;
    phoneNumber: string;
    password: string;
}

export interface AccessTokenPayload {
    userId: string;
}

export const findUserByEmail = (email: string) => User.findOne({ email });

export const createUser = (input: SignUpInput): Promise<UserDocument> =>
    User.create({ ...input, phoneNumber: String(input.phoneNumber) });

/** Returns the user when the email/password pair is valid, otherwise `null`. */
export const verifyCredentials = async (email: string, password: string): Promise<UserDocument | null> => {
    const user = await User.findOne({ email }).select('+password');
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
};

export const createAccessToken = (userId: string): string => {
    const payload: AccessTokenPayload = { userId };
    return jwt.sign(payload, env.secretKey, { expiresIn: ACCESS_TOKEN_TTL_SECONDS });
};

export const verifyAccessToken = (token: string): AccessTokenPayload =>
    jwt.verify(token, env.secretKey) as AccessTokenPayload;
