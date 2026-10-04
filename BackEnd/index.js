import express from 'express';
import mongoose from 'mongoose';
import userRouter from './route/user.route.js';
import messageRouter from './route/message.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { existsSync } from 'node:fs';
import path from 'node:path';
import {app,server} from './socketIO/server.js';
import { frontendOrigin } from './config.js';

const PORT = process.env.PORT || 5005;
const URL = process.env.MONGODB_URL;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: frontendOrigin,
  credentials: true
}));

app.get('/home',(req,res)=>{
    return res.json({"hello":"ayansh"});
})

const startServer = async () => {
    try {
        await mongoose.connect(URL);
        console.log("MONGODB connected successfully");

        app.use('/chat', userRouter);
        app.use('/message', messageRouter);

        const frontendDist = path.resolve('FrontEnd', 'dist');
        const frontendIndex = path.join(frontendDist, 'index.html');
        if (existsSync(frontendIndex)) {
            app.use(express.static(frontendDist));
            app.get('/{*path}', (_req, res) => {
                res.sendFile(frontendIndex);
            });
        }

        server.listen(PORT, () => {
            console.log(`Server is listening to the port ${PORT}`);
        });
    } catch (e) {
        console.log("MongoDB connection failed:", e);
        process.exit(1);
    }
};

startServer();