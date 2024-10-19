import express from 'express';
import {createServer} from "node:http";

import {Server} from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from './controllers/socketmanager.js';

import cors from "cors";
import userRoutes from "./routes/user.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({limit: "40kb"}))
app.use(express.urlencoded({limit: "40kb", extended: true}));

app.use("/api/v1/users", userRoutes);


const start = async () => {
    const connectionDb = await mongoose.connect("mongodb+srv://pushpendr7409:22aub7F6DuqG2oZz@zoom.fpuqi.mongodb.net/")

    console.log(`Connected MongoDB Host: ${connectionDb.connection.host}`)
     server.listen (8000, () => {
        console.log("listening on port 8000")
     });
}

start();