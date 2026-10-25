import { createContext } from "react";
import axios from 'axios '
import { useState } from "react";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl ;

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{

const [token, settoken] = useState(localStorage.getItem("token"));
const [authUser, setauthUser] = useState(null) ;
const [onlineUsers, setonlineUsers] = useState([]);
const [socket, setsocket] = useState(null);

//Check if user is authenticated and is so , set the user data and connect the socket 
const checkAuth = async ()=>{
    try{
  const {data} = await axios.get("/api/auth/check");
  if(data.success){
    setauthUser(data.user)
  }
    }
    catch(error){
toast.error(error.message) ;
    }
}


    const value ={
  axios,
authUser ,
onlineUsers ,
socket


    }


    return (
        <AuthContext.Provider  value={value}>
            {children}
        </AuthContext.Provider>
    )
}



