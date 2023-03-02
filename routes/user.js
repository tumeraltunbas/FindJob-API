import {Router} from "express";
import { updatePersonalInformations } from "../controllers/user.js";
import {getAccessToRoute} from "../middlewares/auth/auth.js";


const router = Router();
router.put("/personal-informations", getAccessToRoute, updatePersonalInformations);

export default router;