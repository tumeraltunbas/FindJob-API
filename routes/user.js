import {Router} from "express";
import { updatePersonalInformations, getAppliedJobs, getProfile, uploadPhoto } from "../controllers/user.js";
import {getAccessToRoute} from "../middlewares/auth/auth.js";
import { isUserExist } from "../middlewares/query/queryMiddleware.js";


const router = Router();
router.put("/personal-informations", getAccessToRoute, updatePersonalInformations);
router.get("/applied-jobs", getAccessToRoute, getAppliedJobs),
router.get("/:username", [getAccessToRoute, isUserExist], getProfile);
router.post("/upload", getAccessToRoute, uploadPhoto);


export default router;