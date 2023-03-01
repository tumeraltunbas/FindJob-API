import {Router} from "express";
import { register, emailVerification, login, forgotPassword } from "../controllers/auth.js";
import { isUserExist } from "../middlewares/query/queryMiddleware.js";

const router = Router();

router.post("/register", register);
router.get("/emailVerification", emailVerification);
router.post("/login", isUserExist, login);
router.post("/forgotPassword", isUserExist, forgotPassword);
export default router;