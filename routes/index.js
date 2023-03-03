import {Router} from "express";
import authRoutes from "./auth.js";
import userRoutes from "./user.js";
import experienceRoutes from "./experience.js";

const router = Router();
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/experience", experienceRoutes);

export default router;