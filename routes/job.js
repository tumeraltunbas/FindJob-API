import {Router} from "express";
import { createJob, getJob, getJobs, applyJob, unApplyJob} from "../controllers/job.js";
import { getAccessToRoute, getEmployeeAccess, getEmployerAccess } from "../middlewares/auth/auth.js";
import { isJobExists } from "../middlewares/query/queryMiddleware.js";

const router = Router();

router.get("/", getAccessToRoute, getJobs);
router.get("/:jobId", [getAccessToRoute, isJobExists], getJob);
router.post("/", [getAccessToRoute, getEmployerAccess], createJob);
router.get("/:jobId/apply", [getAccessToRoute, getEmployeeAccess, isJobExists], applyJob);
router.get("/:jobId/unapply", [getAccessToRoute, getEmployeeAccess, isJobExists], unApplyJob);

export default router;