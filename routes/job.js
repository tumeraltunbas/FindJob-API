import {Router} from "express";
import { getJobs } from "../controllers/job.js";
import { getAccessToRoute } from "../middlewares/auth/auth.js";

const router = Router();

router.get("/", getAccessToRoute, getJobs);

export default router;