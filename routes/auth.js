import {Router} from "express";
import { register, emailVerification, login, forgotPassword, resetPassword,changePassword, logout } from "../controllers/auth.js";
import { getAccessToRoute } from "../middlewares/auth/auth.js";
import { isUserExist } from "../middlewares/query/queryMiddleware.js";

const router = Router();

router.post("/register", register);
router.get("/emailVerification", emailVerification);
router.post("/login", isUserExist, login);
router.get("/logout", getAccessToRoute, logout);
router.post("/forgotPassword", isUserExist, forgotPassword);
router.post("/resetPassword", resetPassword);
router.post("/changePassword", getAccessToRoute, changePassword);
export default router;