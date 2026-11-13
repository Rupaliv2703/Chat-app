import { createContext , useContext , useState } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
   const [messages, setmessages] = useState([]);
   const [users, setusers] = useState([]);
   const [selectedUser, setselectedUser] = useState(null);
 const [unseenMessages, setunseenMessages] = useState({});
   
const {socket , axios} = useContext(AuthContext) ;

//function to get all users for sidebar
 const getUsers = async ()=>{
    try{
        const {data} = await axios.get("/api/users") ;  
        if (data.success){
            setusers(data.users) ;
            setunseenMessages(data.unseenMessages) ;
        }
    }
    catch(error){
        toast.error(error.message);
    }
 }

 //function to get messages for selected user
  const getMessages = async ( userId)=>{
    try{
        const {data} = await axios.get(`/api/messages/${userId}`) ;
        if(data.success){
            setmessages(data.messages) ;
        }
    }
    catch(error){
        toast.error(error.message);
    }
  }

    const value ={}
    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}
