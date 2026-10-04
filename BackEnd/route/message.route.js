import express from 'express';
import { getMessage, sendMessage } from '../controller/message.controller.js';
import secureRoute from '../middleware/secureRoute.js';

const Router = express.Router();
Router.post("/send/:id", secureRoute, sendMessage);
Router.get("/get/:id", secureRoute, getMessage);

export default Router;

