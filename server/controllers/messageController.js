import User from "../models/User.js" ;
import Message from "../models/Message.js" ;

//get all users except the logged in user
export const getUsersForSidebar = async (req , res)=>{
    try{
const userId = req.user._id ;
const filteredUsers = await User.find({_id : {$ne : userId}}).select("-password") ;

//count number of messages not seen 
const unseenMessages ={};
const promises = filteredUsers.map(async(user)=>{
    const messages = await Message.find({senderId : user._id , receiverId : userId , seen : false}) ;
if(messages.length > 0){
    unseenMessages[user._id] = messages.length ;
}
})
await Promise.all(promises) ;
res.json({success : true , users : filteredUsers , unseenMessages}) ;

    }
    catch(error){
        console.error(error.message);
        return res.json({message: error.message , success: false}) ;
    }
}

//get all messages for selected user 
export const getMessages = async (req , res)=>{
    try{
        const { id: selectedUserId } = req.params ;
        const myId = req.user._id ;

        const messages = await Message.find({
            $or : [
               {senderId : myId , receiverId : selectedUserId},
               {senderId : selectedUserId , receiverId : myId}
            ]
        })
        await Message.updateMany({senderId : selectedUserId , receiverId : myId } , {seen : true}) ;
        res.json({success : true , messages}) ;
    }

    catch(error){
        console.error(error.message);
        return res.json({message: error.message , success: false}) ;
    }
}