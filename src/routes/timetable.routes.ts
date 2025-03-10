// Packages
import { Router } from "express";

// Controllers
<<<<<<< HEAD
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
=======
import { getTimeTables, createTimeTable, updateTimeTable, deleteTimeTable } from "@controllers/timetable.controller";

// Middleware
import { validateRole } from "@middleware/auth";
import validate from "@middleware/validate";
import notFoundHandler from "@middleware/notfound";

// Utils & Constants
>>>>>>> 2a1b1b7612ae2704fc445a1816f069abf104043e
import { ROUTES } from "@utils/constants/routes";
import { SCHEMAKEY } from "@utils/constants/schemakey";

const router = Router();

<<<<<<< HEAD
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
=======
router.get(ROUTES.TIMETABLE.GET, getTimeTables);
router.get(ROUTES.TIMETABLE.GET_BY_ID, getTimeTables);
router.post(ROUTES.TIMETABLE.CREATE, validateRole("admin"), validate(SCHEMAKEY.TIMETABLE.CREATE), createTimeTable);
router.put(ROUTES.TIMETABLE.UPDATE, validateRole("admin"), validate(SCHEMAKEY.TIMETABLE.UPDATE), updateTimeTable);
router.delete(ROUTES.TIMETABLE.DELETE, validateRole("admin"), deleteTimeTable);

router.all(ROUTES.ALL, notFoundHandler);

export default router; 
>>>>>>> 2a1b1b7612ae2704fc445a1816f069abf104043e
