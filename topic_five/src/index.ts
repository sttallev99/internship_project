import bodyParser from 'body-parser';
import express from 'express';
import 'dotenv/config';

import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';

export const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}));

app.use('/auth', authRoutes);


