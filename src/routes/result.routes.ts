// Packages
import { Router } from "express";

// Controllers
import { getResults, createResult, updateResult, deleteResult } from "@controllers/result.controller";

// Middleware
import { validateRole } from "@middleware/auth";
import validate from "@middleware/validate";

// Utils & Constants
import { ROUTES } from "@utils/constants/routes";
import { SCHEMAKEY } from "@utils/constants/schemakey";
import notFoundHandler from "@middleware/notfound";

const router = Router();

router.get(ROUTES.RESULT.GET, getResults);
router.get(ROUTES.RESULT.GET_BY_ID, getResults);
router.post(ROUTES.RESULT.CREATE, validateRole("admin"), validate(SCHEMAKEY.RESULT.CREATE), createResult);
router.put(ROUTES.RESULT.UPDATE, validateRole("admin"), validate(SCHEMAKEY.RESULT.UPDATE), updateResult);
router.delete(ROUTES.RESULT.DELETE, validateRole("admin"), deleteResult);

router.all(ROUTES.ALL, notFoundHandler);

export default router; 