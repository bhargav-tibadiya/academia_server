// Packages
import { Router } from "express";

// Controller
import { getFees, createFee, updateFee, deleteFee } from "@controllers/fees.controller";

// Middleware
import validatePayload from "@middleware/validate";
import { validateRole } from "@middleware/auth";
import notFoundHandler from "@middleware/notfound";

// Utils
import { ROUTES } from "@utils/constants/routes";
import { SCHEMAKEY } from "@utils/constants/schemakey";

const router = Router();

router.get(ROUTES.FEES.GET, getFees);
router.get(ROUTES.FEES.GET_BY_ID, getFees);
router.post(ROUTES.FEES.CREATE, validateRole('admin'), validatePayload(SCHEMAKEY.FEES.CREATE), createFee);
router.put(ROUTES.FEES.UPDATE, validateRole('admin'), validatePayload(SCHEMAKEY.FEES.UPDATE), updateFee);
router.delete(ROUTES.FEES.DELETE, validateRole('admin'), deleteFee);

router.all(ROUTES.ALL, notFoundHandler);

export default router;