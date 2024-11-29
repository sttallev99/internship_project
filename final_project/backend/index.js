import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

app.get('/', ((req, res) => {
    res.send('Hello world');    
}));

mongoose.connect(DB_CONNECTION_STRING)
.then(() => {
    console.log('DB CONNECTED!')
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`)
    })
})
