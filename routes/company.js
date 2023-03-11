import {Router} from "express";
import { createCompany, uploadLogo, deleteCompany, getCompany, updateCompany } from "../controllers/company.js";
import { getAccessToRoute, getCompanyOwnerAccess, getEmployerAccess } from "../middlewares/auth/auth.js";

const router = Router();
router.post("/", [getAccessToRoute, getEmployerAccess], createCompany);
router.post("/upload/logo", [getAccessToRoute, getEmployerAccess], uploadLogo);
router.delete("/:companyId", [getAccessToRoute, getEmployerAccess, getCompanyOwnerAccess], deleteCompany);
router.put("/:companyId", [getAccessToRoute, getEmployerAccess, getCompanyOwnerAccess], updateCompany);
router.get("/:slug", getAccessToRoute, getCompany);


export default router;