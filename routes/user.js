import {Router} from "express";
import { applyJob, getProfile, unApplyJob, updatePersonalInformations } from "../controllers/user.js";
import {getAccessToRoute, getEmployeeAccess} from "../middlewares/auth/auth.js";
import { isJobExists, isUserExist } from "../middlewares/query/queryMiddleware.js";


const router = Router();
router.put("/personal-informations", getAccessToRoute, updatePersonalInformations);
router.get("/:username", [getAccessToRoute, isUserExist], getProfile);
router.get("/:jobId/apply", [getAccessToRoute, getEmployeeAccess, isJobExists], applyJob);
router.get("/:jobId/unapply", [getAccessToRoute, getEmployeeAccess, isJobExists], unApplyJob);
export default router;