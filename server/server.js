import express from 'express';
import cors from 'cors';
import http from 'http';
import "dotenv/config";
import { connectDB } from './lib/db.js';
//create express app and http server
const app = express();
const server = http.createServer(app);

//Middleware setup
app.use(express.json({limit :'4mb'}));
app.use(cors());

app.use("/api" ,(req,res)=>res.send('server is live'));

//connect to MongoDB
await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT ,()=>console.log(`Server is running on port ${PORT}`));