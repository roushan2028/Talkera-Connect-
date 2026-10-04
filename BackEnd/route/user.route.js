import {Router} from 'express';
import {signup,login,logout, getUserProfile } from '../controller/user.controller.js';
import secureRoute from "../middleware/secureRoute.js";

const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/getUserProfile").get(secureRoute,getUserProfile);

export default router;