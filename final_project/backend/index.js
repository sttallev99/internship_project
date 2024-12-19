import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userRouter from './routes/auth.router.js';
import rentingOutRouter from './routes/listing.router.js';
import AppError from './utils/AppError.js';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import multer, { memoryStorage } from 'multer';
import { uploadToS3 } from './s3.js';

const app = express();
const PORT = process.env.PORT;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: [
        'http://localhost:3000'
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"]
}));
const storage = memoryStorage();
const upload = multer({ storage })

app.use(userRouter);
app.use('/listing', rentingOutRouter);

app.post('/images', upload.single("image"), async (req, res) => {
    const { file } = req;

    if(!file) return res.status(400).json({message: 'Bad request'});
    const {error, key } = await uploadToS3({ file });

    if(error) return res.status(500).json({ message: error.message });

    const imageURL = `https://mern-estate-image-upload.s3.eu-north-1.amazonaws.com/${key}`;

    return res.status(201).json({ imageURL });
})

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
.catch(error => new AppError(error.message, 500));
