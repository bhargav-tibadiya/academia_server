// Packages
import { Router } from "express";

// Controllers
import { getExams, createExam, updateExam, deleteExam } from "@controllers/exam.controller";

// Middleware
import validate from "@middleware/validate";
import { validateRole } from "@middleware/auth";

// Utils & Constants
import { ROUTES } from "@utils/constants/routes";
import { SCHEMAKEY } from "@utils/constants/schemakey";

// Middleware
import notFoundHandler from "@middleware/notfound";

const router = Router();

router.get(ROUTES.EXAM.GET, getExams);
router.get(ROUTES.EXAM.GET_BY_ID, getExams);
router.post(ROUTES.EXAM.CREATE, validateRole("admin"), validate(SCHEMAKEY.EXAM.CREATE), createExam);
router.put(ROUTES.EXAM.UPDATE, validateRole("admin"), validate(SCHEMAKEY.EXAM.UPDATE), updateExam);
router.delete(ROUTES.EXAM.DELETE, validateRole("admin"), deleteExam);

router.all(ROUTES.ALL, notFoundHandler);

export default router;  