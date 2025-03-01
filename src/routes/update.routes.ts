// Packages
import { Router } from "express";

// Controller
import { getUpdates, createUpdate, updateUpdate, deleteUpdate } from "@controllers/update.controller";

// Utils
import validatePayload from "@middleware/validate";
import { validateRole } from "@middleware/auth";

// Constants
import { ROUTES } from "@utils/constants/routes";
import { SCHEMAKEY } from "@utils/constants/schemakey";

const router = Router();

router.get(ROUTES.UPDATE.GET, validateRole('teacher'), getUpdates);
router.get(ROUTES.UPDATE.GET_BY_ID, validateRole('teacher'), getUpdates);
router.post(ROUTES.UPDATE.CREATE, validateRole('teacher'), validatePayload(SCHEMAKEY.UPDATE.CREATE), createUpdate);
router.put(ROUTES.UPDATE.UPDATE, validateRole('teacher'), validatePayload(SCHEMAKEY.UPDATE.UPDATE), updateUpdate);
router.delete(ROUTES.UPDATE.DELETE, validateRole('teacher'), deleteUpdate);

export default router;