// Packages
import express from "express";

// Controller
import { getAttendances, createAttendance, updateAttendance, deleteAttendance, addAttendanceRecord } from "@controllers/attendance.controller";

// Middleware
import { ROUTES } from "@utils/constants/routes";
import notFoundHandler from "@middleware/notfound";
import { validateRole } from "@middleware/auth";
import validatePayload from "@middleware/validate";

// Utils
import { SCHEMAKEY } from "@utils/constants/schemakey";

const router = express.Router();

router.get(ROUTES.ATTENDANCE.GET, getAttendances);
router.get(ROUTES.ATTENDANCE.GET_BY_ID, getAttendances);
router.post(ROUTES.ATTENDANCE.CREATE, validateRole('teacher'), validatePayload(SCHEMAKEY.ATTENDANCE.CREATE), createAttendance);
router.post(ROUTES.ATTENDANCE.ADD_RECORD, validateRole('teacher'), validatePayload(SCHEMAKEY.ATTENDANCE.ADD_RECORD), addAttendanceRecord);
router.put(ROUTES.ATTENDANCE.UPDATE, validateRole('teacher'), validatePayload(SCHEMAKEY.ATTENDANCE.UPDATE), updateAttendance);
router.delete(ROUTES.ATTENDANCE.DELETE, validateRole('teacher'), deleteAttendance);

router.all(ROUTES.ALL, notFoundHandler);

export default router;
