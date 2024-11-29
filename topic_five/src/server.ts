import {app} from './index';
import mongoose from 'mongoose';

const port = process.env.PORT;
const dbConnection: string = process.env.DB_CONNECTION_STRING!
mongoose.connect(dbConnection).then(() => {
    console.log('DB CONNECTED!');
    app.listen(port, () => console.log(`Server is running at http://localhost: ${port}`))
})
