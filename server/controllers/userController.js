import User from "../models/User.js" ;
import bcrypt from "bcryptjs" ;
import { generateToken } from "../lib/utils.js" ;
export const signup = async (req , res)=>{
    const {fullName , email , password , bio} = req.body ;

    try{
        if(!fullName || !email || !password){
            return res.json({message: "Please provide all required fields" , success: false}) ;
        }

        const user = await User.findOne({email}) ;
        if(user){
            return res.json({message: "User already exists" , success: false}) ;
        }

        const salt = await bcrypt.genSalt(10) ;
        const hashedPassword = await bcrypt.hash(password , salt) ;

     const newUser = await User.create({
        fullName,
        email,
        password: hashedPassword,
        bio
     }) ;

     const token = generateToken(newUser._id) ;
     return res.json({message: "Account created successfully" , success: true , token , userData : newUser}) ;

    } catch (error) {
        console.error(error.message);
        return res.json({message: error.message , success: false}) ;
    }
}