import jwt from "jsonwebtoken" ;
import User from "../models/userModel.js" ;

//Middleware to protect routes 
export const protectRoute = async (req , res , next)=>{
    try{
       
        const token = req.headers.token ;
        const decoded = jwt.verify(token , process.env.JWT_SECRET) ;
        const user = await User.findById(decoded.id).select("-password") ;
        if(!user){
            return res.json({message: "User not found" , success: false}) ;
        }

        req.user = user ;
        next() ;
    }
    catch(error){
        console.log(error.message);
        return res.json({message: error.message , success: false}) ;
    }
}