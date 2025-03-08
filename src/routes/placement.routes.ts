// Packages
import { Router } from "express";

// Controllers
import { getPlacements, createPlacement, updatePlacement, deletePlacement } from "@controllers/placement.controller";

// Middleware
import { validateRole } from "@middleware/auth";
import validate from "@middleware/validate";

// Utils & Constants
import { ROUTES } from "@utils/constants/routes";
import { SCHEMAKEY } from "@utils/constants/schemakey";

// Middleware
import notFoundHandler from "@middleware/notfound";

const router = Router();

router.get(ROUTES.PLACEMENT.GET, getPlacements);
router.get(ROUTES.PLACEMENT.GET_BY_ID, getPlacements);
router.post(ROUTES.PLACEMENT.CREATE, validateRole("admin"), validate(SCHEMAKEY.PLACEMENT.CREATE), createPlacement);
router.put(ROUTES.PLACEMENT.UPDATE, validateRole("admin"), validate(SCHEMAKEY.PLACEMENT.UPDATE), updatePlacement);
router.delete(ROUTES.PLACEMENT.DELETE, validateRole("admin"), deletePlacement);

router.all(ROUTES.ALL, notFoundHandler);

export default router; 