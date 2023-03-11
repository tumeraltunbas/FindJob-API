import {Router} from "express";
import authRoutes from "./auth.js";
import userRoutes from "./user.js";
import experienceRoutes from "./experience.js";
import educationRoutes from "./education.js";
import certificateRoutes from "./certificate.js";
import companyRoutes from "./company.js";
import jobRoutes from "./job.js";
import { feed, search } from "../controllers/index.js";
import { getAccessToRoute } from "../middlewares/auth/auth.js";

const router = Router();
router.use("/feed", getAccessToRoute, feed);
router.use("/search", getAccessToRoute, search);
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/experience", experienceRoutes);
router.use("/education", educationRoutes);
router.use("/certificate", certificateRoutes);
router.use("/company", companyRoutes);
router.use("/job", jobRoutes);

export default router;