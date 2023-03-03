import {Router} from "express";
import { createCompany, deleteCompany, updateCompany } from "../controllers/company.js";
import { getAccessToRoute, getCompanyOwnerAccess, getEmployerAccess } from "../middlewares/auth/auth.js";

const router = Router();
router.post("/", [getAccessToRoute, getEmployerAccess], createCompany);
router.delete("/:companyId", [getAccessToRoute, getEmployerAccess, getCompanyOwnerAccess], deleteCompany);
router.put("/:companyId", [getAccessToRoute, getEmployerAccess, getCompanyOwnerAccess], updateCompany);

export default router;