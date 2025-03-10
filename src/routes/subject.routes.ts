// Packages
import express from "express";

// Controller
import { getSubjects, createSubject, updateSubject, deleteSubject } from "@controllers/subject.controller";

// Middleware
import { ROUTES } from "@utils/constants/routes";
import notFoundHandler from "@middleware/notfound";
import { validateRole } from "@middleware/auth";
import validatePayload from "@middleware/validate";

// Utils
import { SCHEMAKEY } from "@utils/constants/schemakey";

const router = express.Router();

router.get(ROUTES.SUBJECT.GET, getSubjects);
router.get(ROUTES.SUBJECT.GET_BY_ID, getSubjects);
router.post(ROUTES.SUBJECT.CREATE, validateRole('teacher'), validatePayload(SCHEMAKEY.SUBJECT.CREATE), createSubject);
router.put(ROUTES.SUBJECT.UPDATE, validateRole('teacher'), validatePayload(SCHEMAKEY.SUBJECT.UPDATE), updateSubject);
router.delete(ROUTES.SUBJECT.DELETE, validateRole('teacher'), deleteSubject);

router.all(ROUTES.ALL, notFoundHandler);

export default router;
