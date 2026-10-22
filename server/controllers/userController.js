import User from "../models/User.js" ;
import bcrypt from "bcryptjs" ;
import { generateToken } from "../lib/utils.js" ;

//Signup a new user
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

//controller to login a user 

export const login = async (req,res)=>{
    try{
  const {email , password} = req.body ;
  if(!email || !password){
    return res.json({message: "Please provide all required fields" , success: false}) ;
  }

  const userData = await User.findOne({email}) ;
  const isPasswordCorrect = await bcrypt.compare(password , userData.password) ;

  if(!isPasswordCorrect){
    return res.json({message: "Invalid credentials" , success: false}) ;
  }

  const token = generateToken(userData._id) ;
     return res.json({message: "Login successful" , success: true , token , userData : userData}) ;
    }
    catch(error){
      console.error(error.message);
      return res.json({message: error.message , success: false}) ;
    }
}

//Controller to check if user is authenticated 

export const checkAuth =(req , res)=>{
    res.json({success: true , user : req.user});
}


//Controller to update user profile
export const updateProfile = async(req , res)=>{
    try{
      const {profilePic , fullName , bio} = req.body ;
      const userId = req.user._id ;
    let updatedUser ;
if(!profilePic){
    updatedUser = await User.findByIdAndUpdate(userId , {bio , fullName} , {new : true}) ;
}
else{
    const upload = await cloudinary.uploader.upload(profilePic);
    updatedUser = await User.findByIdAndUpdate(userId , {profilePic: upload.secure_url , fullName , bio} , {new : true}) ;
}
res.json({success: true , user : updatedUser}) ;
}
    catch(error){
        console.error(error.message);
        return res.json({message: error.message , success: false}) ;
    }
}