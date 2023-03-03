import {Router} from "express";
import { createExperience, deleteExperience, updateExperience } from "../controllers/experience.js";
import { getAccessToRoute, getExperienceOwnerAccess } from "../middlewares/auth/auth.js";
import { isExperienceExists } from "../middlewares/query/queryMiddleware.js";

const router = Router();

router.post("/", getAccessToRoute, createExperience);
router.delete("/:experienceId", [getAccessToRoute, isExperienceExists, getExperienceOwnerAccess], deleteExperience);
router.put("/:experienceId", [getAccessToRoute, isExperienceExists, getExperienceOwnerAccess], updateExperience);

export default router;