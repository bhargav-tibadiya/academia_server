// Packages
import { Router } from "express";

// Controllers
import { getTimeTables, createTimeTable, updateTimeTable, deleteTimeTable } from "@controllers/timetable.controller";

// Middleware
import { validateRole } from "@middleware/auth";
import validate from "@middleware/validate";
import notFoundHandler from "@middleware/notfound";

// Utils & Constants
import { ROUTES } from "@utils/constants/routes";
import { SCHEMAKEY } from "@utils/constants/schemakey";

const router = Router();

router.get(ROUTES.TIMETABLE.GET, getTimeTables);
router.get(ROUTES.TIMETABLE.GET_BY_ID, getTimeTables);
router.post(ROUTES.TIMETABLE.CREATE, validateRole("admin"), validate(SCHEMAKEY.TIMETABLE.CREATE), createTimeTable);
router.put(ROUTES.TIMETABLE.UPDATE, validateRole("admin"), validate(SCHEMAKEY.TIMETABLE.UPDATE), updateTimeTable);
router.delete(ROUTES.TIMETABLE.DELETE, validateRole("admin"), deleteTimeTable);

router.all(ROUTES.ALL, notFoundHandler);

export default router; 