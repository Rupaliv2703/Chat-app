import User from "../models/User.js" ;
import bcrypt from "bcryptjs" ;
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

     

    } catch (error) {
        console.error(error);
        return res.json({message: "Internal server error" , success: false}) ;
    }
}