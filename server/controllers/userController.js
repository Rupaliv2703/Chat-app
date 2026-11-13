import User from "../models/User.js" ;
import bcrypt from "bcryptjs" ;
import { generateToken } from "../lib/utils.js" ;
import cloudinary from "../lib/cloudinary.js" ;
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
  //check
  if (!userData) {
  return res.json({
    message: "Invalid credentials",
    success: false
  });
}

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
      const updates = { fullName, bio };

      if (profilePic) {
        const upload = await cloudinary.uploader.upload(profilePic, {
          folder: "chat-app/profile-pictures",
          resource_type: "image" 
           
        });
        updates.profilePic = upload.secure_url;
      }

      const updatedUser = await User.findByIdAndUpdate(userId, updates, {
        new: true,
        runValidators: true
      }).select("-password");

      if (!updatedUser) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      return res.json({ success: true, user: updatedUser });
    } catch (error) {
      const providerError = error?.error ?? error;
      const providerStatus = Number.isInteger(providerError?.http_code)
        ? providerError.http_code
        : null;
      const providerMessage = typeof providerError?.message === "string"
        ? providerError.message
        : "Unknown profile update error";
      const status = providerStatus && providerStatus >= 400 && providerStatus < 600
        ? providerStatus
        : 500;

      console.error("Profile update failed:", {
        message: providerMessage,
        httpCode: providerStatus,
        name: providerError?.name,
        requestId: providerError?.request_id
      });

      return res.status(status).json({
        success: false,
        message: providerStatus
          ? `Cloudinary upload failed (${providerStatus}): ${providerMessage}`
          : "Unable to update profile. Please try again."
      });
    }
};