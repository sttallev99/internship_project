declare global {
    namespace Express {
        interface Request {
            /** Id of the authenticated user, set by the `isAuth` middleware. */
            userId?: string;
        }
    }
}

export {};
