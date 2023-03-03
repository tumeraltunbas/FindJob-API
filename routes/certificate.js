import {Router} from "express";
import { createCertificate, deleteCertificate, updateCertificate } from "../controllers/certificate.js";
import {getAccessToRoute, getCertificateOwnerAccess} from "../middlewares/auth/auth.js";
import { isCertificateExist } from "../middlewares/query/queryMiddleware.js";

const router = Router();
router.post("/", getAccessToRoute, createCertificate);
router.delete("/:certificateId", [getAccessToRoute, isCertificateExist, getCertificateOwnerAccess], deleteCertificate);
router.put("/:certificateId", [getAccessToRoute, isCertificateExist, getCertificateOwnerAccess], updateCertificate);

export default router;