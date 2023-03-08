import {Router} from "express";
import { createJob, getJobs } from "../controllers/job.js";
import { getAccessToRoute, getEmployerAccess } from "../middlewares/auth/auth.js";

const router = Router();

router.get("/", getAccessToRoute, getJobs);
router.post("/", [getAccessToRoute, getEmployerAccess], createJob);

export default router;