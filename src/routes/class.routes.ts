// Packages
import { Router } from "express";

// Controllers
import { getClasses, createClass, updateClass, deleteClass } from "@controllers/class.controller";

// Middleware
import validatePayload from "@middleware/validate";
import { validateRole } from "@middleware/auth";
import notFoundHandler from "@middleware/notfound";

// Utils
import { ROUTES } from "@utils/constants/routes";
import { SCHEMAKEY } from "@utils/constants/schemakey";

const router = Router();

// Routes
router.get(ROUTES.CLASS.GET, getClasses);
router.get(ROUTES.CLASS.GET_BY_ID, getClasses);
router.post(
  ROUTES.CLASS.CREATE,
  validateRole("admin"),
  validatePayload(SCHEMAKEY.CLASS.CREATE),
  createClass
);
router.put(
  ROUTES.CLASS.UPDATE,
  validateRole("admin"),
  validatePayload(SCHEMAKEY.CLASS.UPDATE),
  updateClass
);
router.delete(ROUTES.CLASS.DELETE, validateRole("admin"), deleteClass);

// Handle undefined routes
router.all("*", notFoundHandler);

export default router;
