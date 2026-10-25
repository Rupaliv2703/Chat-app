import express from 'express';
import { protectRoute } from '../middleware/auth';
import { sendMessage } from '../controllers/messageController';
import { getMessages } from '../controllers/messageController';
import { getUsersForSidebar } from '../controllers/messageController';
import { markMessageAsSeen } from '../controllers/messageController';

const messageRouter = express.Router();

messageRouter.get("/users" , protectRoute , getUsersForSidebar);
messageRouter.get("/:id" , protectRoute , getMessages);
messageRouter.get("mark/:id" , protectRoute , markMessageAsSeen);
messageRouter.post("/send/:id" , protectRoute ,sendMessage);

export default messageRouter ;