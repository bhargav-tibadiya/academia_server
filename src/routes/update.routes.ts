// Packages
import { Router } from "express";

// Controller
import { getUpdates, createUpdate, updateUpdate, deleteUpdate } from "@controllers/update.controller";

// Middleware
import validatePayload from "@middleware/validate";
import { validateRole } from "@middleware/auth";
import notFoundHandler from "@middleware/notfound";

// Utils
import { ROUTES } from "@utils/constants/routes";
import { SCHEMAKEY } from "@utils/constants/schemakey";

const router = Router();

router.get(ROUTES.UPDATE.GET, getUpdates);
router.get(ROUTES.UPDATE.GET_BY_ID, getUpdates);
router.post(ROUTES.UPDATE.CREATE, validateRole('teacher'), validatePayload(SCHEMAKEY.UPDATE.CREATE), createUpdate);
router.put(ROUTES.UPDATE.UPDATE, validateRole('teacher'), validatePayload(SCHEMAKEY.UPDATE.UPDATE), updateUpdate);
router.delete(ROUTES.UPDATE.DELETE, validateRole('teacher'), deleteUpdate);

router.all(ROUTES.ALL, notFoundHandler);


export default router;