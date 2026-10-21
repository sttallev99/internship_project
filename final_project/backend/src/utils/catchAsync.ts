import type { NextFunction, Request, RequestHandler, Response } from 'express';

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

/** Forwards rejected promises from async route handlers to the global error handler. */
const catchAsync = (handler: AsyncRequestHandler): RequestHandler => (req, res, next) => {
    handler(req, res, next).catch(next);
};

export default catchAsync;
