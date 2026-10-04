import Conversation from "../models/conversation.model.js";
import Message from "../models/message.models.js";
import { getReceiverSocketId, io } from "../socketIO/server.js";

export const sendMessage = async (req, res) => {
    console.log("message sent to " + req.params.id);

    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId, receiverId, message,
        });

        if (newMessage) {
            conversation.message.push(newMessage._id);
        }
        await Promise.all([newMessage.save(), conversation.save()]);

        const reciverSocketId = getReceiverSocketId(receiverId);
        if(reciverSocketId){
            io.to(reciverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json({ message: "Message Sent Successfully", newMessage });

    } catch (err) {
        console.log("Error in Sending Message " + err);
        return res.status(500).json({ message: "internal server error" });
    }

}

export const getMessage = async (req, res) => {

    try {
        const { id: chatUser } = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants : { $all : [senderId,chatUser]}
        }).populate("message");
        if(!conversation){
            return res.status(201).json({message : "no conversation found"});
        }
        const message = conversation.message;
        return res.status(201).json({message});

    } catch (err) {
        console.log("Message Getting Error " + err);
        res.status(500).json({ error: "Internal Server Error" });
    }

}