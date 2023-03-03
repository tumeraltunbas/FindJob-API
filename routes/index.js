import {Router} from "express";
import authRoutes from "./auth.js";
import userRoutes from "./user.js";
import experienceRoutes from "./experience.js";
import educationRoutes from "./education.js";
import certificateRoutes from "./certificate.js";
import companyRoutes from "./company.js";

const router = Router();
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/experience", experienceRoutes);
router.use("/education", educationRoutes);
router.use("/certificate", certificateRoutes);
router.use("/company", companyRoutes);

export default router;