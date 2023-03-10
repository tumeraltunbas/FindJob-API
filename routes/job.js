import {Router} from "express";
import { createJob, getJob, getJobs, applyJob, unApplyJob, getAppliedUsers, reachUser} from "../controllers/job.js";
import { getAccessToRoute, getEmployeeAccess, getEmployerAccess, getJobOwnerAccess } from "../middlewares/auth/auth.js";
import { isJobExists } from "../middlewares/query/queryMiddleware.js";

const router = Router();

router.get("/", getAccessToRoute, getJobs);
router.get("/:jobId", [getAccessToRoute, isJobExists], getJob);
router.post("/", [getAccessToRoute, getEmployerAccess], createJob);
router.get("/:jobId/apply", [getAccessToRoute, getEmployeeAccess, isJobExists], applyJob);
router.get("/:jobId/unapply", [getAccessToRoute, getEmployeeAccess, isJobExists], unApplyJob);
router.get("/:jobId/applied-users", [getAccessToRoute, getEmployerAccess, getJobOwnerAccess], getAppliedUsers);
router.post("/:jobId/reach/:userId", [getAccessToRoute, getEmployerAccess, isJobExists, getJobOwnerAccess], reachUser);

export default router;