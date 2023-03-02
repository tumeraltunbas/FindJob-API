import {Router} from "express";
import { updatePersonalInformations, addWorkExperience } from "../controllers/user.js";
import {getAccessToRoute} from "../middlewares/auth/auth.js";


const router = Router();
router.put("/personal-informations", getAccessToRoute, updatePersonalInformations);
router.post("/work-experiences", getAccessToRoute, addWorkExperience);


export default router;