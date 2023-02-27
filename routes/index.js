import {Router} from "express";
import authRoutes from "./auth.js";

export const router = Router();
router.use("/auth", authRoutes);