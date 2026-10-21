import type { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import { env } from '../config/env.js';
import AppError from '../utils/AppError.js';

interface DuplicateKeyError {
    code: 11000;
    keyValue: Record<string, unknown>;
}

const isDuplicateKeyError = (err: unknown): err is DuplicateKeyError =>
    typeof err === 'object' && err !== null && 'code' in err && err.code === 11000;

/** Maps known library errors to operational `AppError`s with a proper status code. */
const normalizeError = (err: unknown): Error => {
    if (err instanceof AppError) return err;

    if (err instanceof mongoose.Error.CastError) {
        return new AppError(`Invalid ${err.path}: ${String(err.value)}`, 400);
    }
    if (err instanceof mongoose.Error.ValidationError) {
        const messages = Object.values(err.errors).map((error) => error.message);
        return new AppError(messages.join('. '), 400);
    }
    if (isDuplicateKeyError(err)) {
        const field = Object.keys(err.keyValue)[0] ?? 'Value';
        return new AppError(`${field} is already in use`, 409);
    }
    if (err instanceof multer.MulterError) {
        return new AppError(err.message, 400);
    }
    // Malformed JSON body, raised by express.json().
    if (err instanceof SyntaxError && 'body' in err) {
        return new AppError('Malformed JSON in request body', 400);
    }

    return err instanceof Error ? err : new Error(String(err));
};

const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    const error = normalizeError(err);
    const isOperational = error instanceof AppError;
    const statusCode = isOperational ? error.statusCode : 500;
    const status = isOperational ? error.status : 'error';

    if (!isOperational) {
        console.error(error);
    }

    if (env.nodeEnv === 'development') {
        res.status(statusCode).json({ success: false, status, message: error.message, stack: error.stack });
        return;
    }

    res.status(statusCode).json({
        success: false,
        status,
        message: isOperational ? error.message : 'Sorry, something went wrong!',
    });
};

export default globalErrorHandler;
