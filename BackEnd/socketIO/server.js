import { Server } from "socket.io";
import { frontendOrigin } from "../config.js";

import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin:" https://talkera-connect.onrender.com",
        methods: ["GET", "POST"],
        credentials: true
    }
})


export const getReceiverSocketId =  (receiverId) =>{
    return users[receiverId];
}

const users = {}

io.on("connection", (socket) => {
    console.log("new connection created", socket.id);
    const userId = socket.handshake.query.userId;
    users[userId] = socket.id;
    console.log("users", users);

    io.emit("getonlineusers", Object.keys(users));

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete users[userId];
        io.emit("getonlineusers", Object.keys(users));
        console.log(users);
    })
})


export { app, server, io };
