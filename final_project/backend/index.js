import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import userRouter from './routes/auth.router.js';
import rentingOutRouter from './routes/listing.router.js';
import AppError from './utils/AppError.js';
import globalErrorHandler from './middlewares/globalErrorHandler.js';

const app = express();
const PORT = process.env.PORT;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

app.use(bodyParser.json());
app.use(cookieParser());

app.use(userRouter);
app.use('/listing', rentingOutRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`This path ${req.originalUrl} isn't on this server!`, 404));
});

app.use(globalErrorHandler)

mongoose.connect(DB_CONNECTION_STRING)
.then(() => {
    console.log('DB CONNECTED!')
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`)
    })
})
.catch(error => handleError(error));
