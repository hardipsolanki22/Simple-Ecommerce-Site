import dotenv from 'dotenv'
import { app } from "./app.js";
import {connectDB} from './db/index.js'

dotenv.config({
    path: './env'
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on PORT ${process.env.PORT}`);
        })
        app.on('error' , (err) => {
            console.log(`Application is not able to tock with MongoDB :: ${err}`);
        })
    })
    .catch((err) => {
        console.log(`MongoDB Connection  While Promise`, err);
        throw err
        
    })