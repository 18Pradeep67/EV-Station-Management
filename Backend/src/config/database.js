import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB Cluster successfully!!!");
    } catch(err){
        console.error("Error in eastablishing connection to database",err);
        process.exit(1);
    }
};

export default connectDB;
