import {Router} from "express";
import { register, emailVerification } from "../controllers/auth.js";

const router = Router();

router.post("/register", register);
router.get("/emailVerification", emailVerification);
export default router;