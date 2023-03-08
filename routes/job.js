import {Router} from "express";
import { applyJob, createJob, getJob, getJobs } from "../controllers/job.js";
import { getAccessToRoute, getEmployeeAccess, getEmployerAccess } from "../middlewares/auth/auth.js";
import { isJobExists } from "../middlewares/query/queryMiddleware.js";

const router = Router();

router.get("/", getAccessToRoute, getJobs);
router.get("/:jobId", [getAccessToRoute, isJobExists], getJob);
router.post("/", [getAccessToRoute, getEmployerAccess], createJob);
router.get("/:jobId/apply", [getAccessToRoute, getEmployeeAccess, isJobExists], applyJob);

export default router;