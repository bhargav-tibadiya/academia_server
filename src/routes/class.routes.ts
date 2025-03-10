// Packages
import { Router } from "express";

// Controllers
import { getClasses, createClass, updateClass, deleteClass } from "@controllers/class.controller";

// Middleware
import { validateRole } from "@middleware/auth";
import validate from "@middleware/validate";

// Utils & Constants
import { ROUTES } from "@utils/constants/routes";
import { SCHEMAKEY } from "@utils/constants/schemakey";

// Middleware
import notFoundHandler from "@middleware/notfound";

const router = Router();

router.get(ROUTES.CLASS.GET, getClasses);
router.get(ROUTES.CLASS.GET_BY_ID, getClasses);
router.post(ROUTES.CLASS.CREATE, validateRole("admin"), validate(SCHEMAKEY.CLASS.CREATE), createClass);
router.put(ROUTES.CLASS.UPDATE, validateRole("admin"), validate(SCHEMAKEY.CLASS.UPDATE), updateClass);
router.delete(ROUTES.CLASS.DELETE, validateRole("admin"), deleteClass);

router.all(ROUTES.ALL, notFoundHandler);

export default router; 