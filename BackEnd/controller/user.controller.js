import User from '../models/users.models.js';
import bcrypt from 'bcryptjs';
import createTokenAndSaveCookie from '../jwt/tokengeneration.js';

const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        if (password != confirmPassword) {
            return res.status(400).json({ message: "password does not match" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        createTokenAndSaveCookie(newUser._id, res);
        return res.status(201).json({ message: "User Registered Successfully", user: { id: newUser._id, name: newUser.name, email: newUser.email } });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "server Error" });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({ message: "Enter valid email and password" });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email not exist" });
        }
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).json({ message: "Incorrect Password" });
        }
        createTokenAndSaveCookie(user._id, res);
        return res.status(201).json({ message: "Login Successful", user: { id: user._id, name: user.name, email: user.email } });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Server Error" });
    }
}

const logout = async (req, res) => {
    try {
        const isProduction = process.env.NODE_ENV === "production";
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "strict"
        });
        res.status(200).json({ message: "User LogOut Successful" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Server Error" });
    }
}

const getUserProfile = async (req,res) => {
    try {
        const loggedInUser = req.user._id;
        const allUser = await User.find({_id:{$ne : loggedInUser}}).select("-password");
        res.status(201).json({ allUser: allUser });
    }catch(err){
        console.log("Error in allUserController " + err );
        return res.status(500).json({message:"Server Error"});
    }
}

export { signup, login, logout, getUserProfile };
