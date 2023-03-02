import {Router} from "express";
import { register, emailVerification, login, logout, forgotPassword, resetPassword,changePassword, deactiveAccount } from "../controllers/auth.js";
import { getAccessToRoute } from "../middlewares/auth/auth.js";
import { isUserExist } from "../middlewares/query/queryMiddleware.js";

const router = Router();

router.post("/register", register);
router.get("/email-verification", emailVerification);
router.post("/login", isUserExist, login);
router.get("/logout", getAccessToRoute, logout);
router.post("/forgot-password", isUserExist, forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", getAccessToRoute, changePassword);
router.post("/deactivate", getAccessToRoute, deactiveAccount);
export default router;