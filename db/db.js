import mongoose from "mongoose";
import { DB_NAME } from "../src/constants.js";

const connectDB = async()=>{
    try {
        // Express yeh suvidha deta hai jo bhi response aaye usko aap ek variable mei store krwa skte ho
        connectonInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST : ${connectonInstance.connection.host}`);

        
        
    } catch (error) {
        console.log("MONGODB CONNECTION ERROR", error);
        // read more about the exit process in error - node js documentation 
        process.exit(1);
        
    }
}


export default connectDB