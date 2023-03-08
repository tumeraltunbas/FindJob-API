import {Router} from "express";
import { createJob, getJob, getJobs } from "../controllers/job.js";
import { getAccessToRoute, getEmployerAccess } from "../middlewares/auth/auth.js";
import { isJobExists } from "../middlewares/query/queryMiddleware.js";

const router = Router();

router.get("/", getAccessToRoute, getJobs);
router.get("/:jobId", [getAccessToRoute, isJobExists], getJob);
router.post("/", [getAccessToRoute, getEmployerAccess], createJob);

export default router;