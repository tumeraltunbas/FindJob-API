import {Router} from "express";
import { createEducation, deleteEducation, updateEducation } from "../controllers/education.js";
import { getAccessToRoute, getEducationOwnerAccess } from "../middlewares/auth/auth.js";
import { isEducationExists } from "../middlewares/query/queryMiddleware.js";

const router = Router();

router.post("/", getAccessToRoute, createEducation);
router.delete("/:educationId", [getAccessToRoute, isEducationExists, getEducationOwnerAccess], deleteEducation);
router.put("/:educationId", [getAccessToRoute, isEducationExists, getEducationOwnerAccess], updateEducation);

export default router;