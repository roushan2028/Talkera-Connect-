import jwt from 'jsonwebtoken';
import User from '../models/users.models.js';

const secureRoute = async (req,res,next) =>{
    try{
        const token = req.cookies?.jwt;
        if(!token){
            return res.status(401).json({message:"Not Authorized"});
        }
        const verified = jwt.verify(token,process.env.JWT_TOKEN);
        if(!verified){
            return res.status(401).json({message:"Invalid Token"});
        }
        const user = await User.findById(verified.userId).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        req.user = user;
        next();
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Error"});
    }
}

export default secureRoute;