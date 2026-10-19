import mongoose from "mongoose";

//function to connect to mongodb database
export const connectDB = async ()=>{
    try{
        
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");

    }
    catch(err){
        console.log("Error connecting to MongoDB");        console.log(err);
    }
}