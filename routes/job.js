import {Router} from "express";
import { createJob, getJob, getJobs, getAppliedUsers} from "../controllers/job.js";
import { getAccessToRoute, getEmployerAccess, getJobOwnerAccess } from "../middlewares/auth/auth.js";
import { isJobExists } from "../middlewares/query/queryMiddleware.js";

const router = Router();

router.get("/", getAccessToRoute, getJobs);
router.get("/:jobId", [getAccessToRoute, isJobExists], getJob);
router.post("/", [getAccessToRoute, getEmployerAccess], createJob);
router.get("/:jobId/applied-users", [getAccessToRoute, getEmployerAccess, getJobOwnerAccess], getAppliedUsers);

export default router;