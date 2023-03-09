import {Router} from "express";
import { getProfile, updatePersonalInformations } from "../controllers/user.js";
import {getAccessToRoute} from "../middlewares/auth/auth.js";
import { isUserExist } from "../middlewares/query/queryMiddleware.js";


const router = Router();
router.put("/personal-informations", getAccessToRoute, updatePersonalInformations);
router.get("/:username", [getAccessToRoute, isUserExist], getProfile);


export default router;