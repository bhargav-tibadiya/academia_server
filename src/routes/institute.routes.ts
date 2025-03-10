// Packages
import { Router } from "express";

// Controller
import { getInstitutes, createInstitute, updateInstitute, deleteInstitute } from "@controllers/institute.controller";

// Middleware
import validatePayload from "@middleware/validate";
import { validateRole } from "@middleware/auth";
import notFoundHandler from "@middleware/notfound";

// Utils
import { ROUTES } from "@utils/constants/routes";
import { SCHEMAKEY } from "@utils/constants/schemakey";

const router = Router();

router.get(ROUTES.INSTITUTE.GET, getInstitutes);
router.get(ROUTES.INSTITUTE.GET_BY_ID, getInstitutes);
router.post(ROUTES.INSTITUTE.CREATE, validateRole('admin'), validatePayload(SCHEMAKEY.INSTITUTE.CREATE), createInstitute);
router.put(ROUTES.INSTITUTE.UPDATE, validateRole('admin'), validatePayload(SCHEMAKEY.INSTITUTE.UPDATE), updateInstitute);
router.delete(ROUTES.INSTITUTE.DELETE, validateRole('admin'), deleteInstitute);

router.all(ROUTES.ALL, notFoundHandler);

export default router;