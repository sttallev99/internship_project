import { createServer } from 'node:http';
import mongoose from 'mongoose';

import app from './app.js';
import { env } from './config/env.js';
import { initRealtime } from './realtime/socket.js';

const startServer = async (): Promise<void> => {
    await mongoose.connect(env.dbConnectionString);
    console.log('Connected to MongoDB');

    // Express and Socket.IO share one HTTP server (and port).
    const httpServer = createServer(app);
    const io = initRealtime(httpServer);

    httpServer.listen(env.port, () => {
        console.log(`Server started at http://localhost:${env.port}`);
    });

    // Release the port and DB connection on shutdown (also lets `tsx watch` restart cleanly).
    const shutdown = () => {
        io.close();
        httpServer.close(() => {
            void mongoose.disconnect().finally(() => process.exit(0));
        });
    };
    process.once('SIGINT', shutdown);
    process.once('SIGTERM', shutdown);
};

startServer().catch((error: unknown) => {
    console.error('Failed to start the server:', error);
    process.exit(1);
});
