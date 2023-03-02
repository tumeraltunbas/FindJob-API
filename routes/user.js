import {Router} from "express";
import { updatePersonalInformations, addWorkExperience,deleteWorkExperience } from "../controllers/user.js";
import {getAccessToRoute} from "../middlewares/auth/auth.js";
import { isWorkExperienceExists } from "../middlewares/query/queryMiddleware.js";


const router = Router();
router.put("/personal-informations", getAccessToRoute, updatePersonalInformations);
router.post("/work-experiences", getAccessToRoute, addWorkExperience);
router.delete("/work-experiences/:workExperienceId", [getAccessToRoute, isWorkExperienceExists], deleteWorkExperience);


export default router;