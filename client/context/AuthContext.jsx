import { createContext, useEffect } from "react";
import axios from 'axios '
import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import {io} from 'socket.io-client'

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
    connectSocket(data.user)
  }
    }
    catch(error){
toast.error(error.message) ;
    }
}


//login function to handle user authetication and socket connection
const login = async (state , Credentials)=>{
    try{
        const {data} = await axios.post (`/api/auth/${state}` , Credentials);
        if(data.success){
            setauthUser(data.userData);
            connectSocket(data.userData);
            axios.defaults.headers.common["token"]= data.token ;
          settoken(data.token);
          localStorage.setItem ("token" ,data.token)
          toast.success(data.message)
        }
        else{
           toast.error(data.message)
        }
    }

    catch(error){
toast.error(data.message)
    }
    
}

 //connect socket function to handle socket connection and online users updates 
 const connectSocket = (userData){
    if(!userData || socket?.connected) return ;
    const newSocket = io(backendUrl , {
        query:{
            userId : userData._id ;
        }
    });
    newSocket.connect();
    setsocket(newSocket);

    newSocket.on("setonlineUsers" , (userIds)=>{
        setonlineUsers(userIds);
    })
    
 }

useEffect (()=>{
    if(token){
      axios.defaults.headers.common['token']=token ;
    }
    checkAuth()
} , [])


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



