// Packages
import { Router } from "express";

// Controllers
import { getDepartments, createDepartment, updateDepartment, deleteDepartment } from "@controllers/department.controller";

// Middleware
import validate from "@middleware/validate";

// Utils & Constants
import { ROUTES } from "@utils/constants/routes";
import { SCHEMAKEY } from "@utils/constants/schemakey";
import { validateRole } from "@middleware/auth";

// Middleware
import notFoundHandler from "@middleware/notfound";

const router = Router();

router.get(ROUTES.DEPARTMENT.GET, getDepartments);
router.get(ROUTES.DEPARTMENT.GET_BY_ID, getDepartments);
router.post(ROUTES.DEPARTMENT.CREATE, validateRole("admin"), validate(SCHEMAKEY.DEPARTMENT.CREATE), createDepartment);
router.put(ROUTES.DEPARTMENT.UPDATE, validateRole("admin"), validate(SCHEMAKEY.DEPARTMENT.UPDATE), updateDepartment);
router.delete(ROUTES.DEPARTMENT.DELETE, validateRole("admin"), deleteDepartment);

router.all(ROUTES.ALL, notFoundHandler);

export default router; 