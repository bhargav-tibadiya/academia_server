// Packages
import { Router } from "express";

// Controllers
import { getStudents, createStudent, updateStudent, deleteStudent } from "@controllers/student.controller";

// Middleware
import { validateRole } from "@middleware/auth";
import validate from "@middleware/validate";

// Utils & Constants
import { ROUTES } from "@utils/constants/routes";
import { SCHEMAKEY } from "@utils/constants/schemakey";
import notFoundHandler from "@middleware/notfound";

const router = Router();

router.get(ROUTES.STUDENT.GET, getStudents);
router.get(ROUTES.STUDENT.GET_BY_ID, getStudents);
router.post(ROUTES.STUDENT.CREATE, validateRole("admin"), validate(SCHEMAKEY.STUDENT.CREATE), createStudent);
router.put(ROUTES.STUDENT.UPDATE, validateRole("admin"), validate(SCHEMAKEY.STUDENT.UPDATE), updateStudent);
router.delete(ROUTES.STUDENT.DELETE, validateRole("admin"), deleteStudent);

router.all(ROUTES.ALL, notFoundHandler);

export default router; 