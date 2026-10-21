import mongoose from 'mongoose';

import app from './app.js';
import { env } from './config/env.js';

const startServer = async (): Promise<void> => {
    await mongoose.connect(env.dbConnectionString);
    console.log('Connected to MongoDB');

    app.listen(env.port, () => {
        console.log(`Server started at http://localhost:${env.port}`);
    });
};

startServer().catch((error: unknown) => {
    console.error('Failed to start the server:', error);
    process.exit(1);
});
