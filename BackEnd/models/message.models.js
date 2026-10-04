import mongoose from 'mongoose';
import User from "../models/users.models.js";

const messageSchema =new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            req: true
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            req: true
        },
        message: {
            type: String,
            required :true,
            maxLength : 1000,
            trim : true ,
            validate : [
                {
                    validator : (value) => value.length > 0,
                    message : 'Message Cannot be empty', 
                }
            ]
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        }
    },
    {
        timestamps : true,
    }
)

const Message = mongoose.model("Message",messageSchema);

export default Message;