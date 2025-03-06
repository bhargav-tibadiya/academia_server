// Packages
import { Router } from "express";

// Controllers
import {
  getTimeTables,
  createTimeTable,
  updateTimeTable,
  deleteTimeTable,
} from "@controllers/timetable.controller";

// Middleware
import validatePayload from "@middleware/validate";
import { validateRole } from "@middleware/auth";
import notFoundHandler from "@middleware/notfound";

// Utils
import { ROUTES } from "@utils/constants/routes";
import { SCHEMAKEY } from "@utils/constants/schemakey";

const router = Router();

// Routes
router.get(ROUTES.TIMETABLE.GET, getTimeTables);
router.get(ROUTES.TIMETABLE.GET_BY_ID, getTimeTables);
router.post(
  ROUTES.TIMETABLE.CREATE,
  validateRole("admin"),
  validatePayload(SCHEMAKEY.TIMETABLE.CREATE),
  createTimeTable
);
router.put(
  ROUTES.TIMETABLE.UPDATE,
  validateRole("admin"),
  validatePayload(SCHEMAKEY.TIMETABLE.UPDATE),
  updateTimeTable
);
router.delete(ROUTES.TIMETABLE.DELETE, validateRole("admin"), deleteTimeTable);

// Handle undefined routes
router.all("*", notFoundHandler);

export default router;
