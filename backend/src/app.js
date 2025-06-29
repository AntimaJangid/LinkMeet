import express from "express";
import {createServer} from "node:http";
import {Server} from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port",(process.env.port || 8000));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit:"40kb" , extended:true}));
app.use("/api/v1/users", userRoutes);

const start = async()=>{
    app.set("mongo_user");
    const connectionDb = await mongoose.connect("mongodb+srv://antimajangid2404:HvkFlci5QjUJP7Tw@cluster0.xtz1tvm.mongodb.net/")
    console.log(`Mongo connected DB host : ${connectionDb.connection.host}`);
    server.listen(app.get("port"),()=>{
        console.log("LISTENING ON PORT 8000");
    });
}

start();