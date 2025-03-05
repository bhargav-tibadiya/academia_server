// Packages
import { Router } from "express";

// Controller
import { getHallTickets, createHallTicket, updateHallTicket, deleteHallTicket } from "@controllers/hallticket.controller";

// Middleware
import validatePayload from "@middleware/validate";
import { validateRole } from "@middleware/auth";
import notFoundHandler from "@middleware/notfound";

// Utils
import { ROUTES } from "@utils/constants/routes";
import { SCHEMAKEY } from "@utils/constants/schemakey";

const router = Router();

router.get(ROUTES.HALLTICKET.GET, getHallTickets);
router.get(ROUTES.HALLTICKET.GET_BY_ID, getHallTickets);
router.post(ROUTES.HALLTICKET.CREATE, validateRole('teacher'), validatePayload(SCHEMAKEY.HALLTICKET.CREATE), createHallTicket);
router.put(ROUTES.HALLTICKET.UPDATE, validateRole('teacher'), validatePayload(SCHEMAKEY.HALLTICKET.UPDATE), updateHallTicket);
router.delete(ROUTES.HALLTICKET.DELETE, validateRole('teacher'), deleteHallTicket);

router.all(ROUTES.ALL, notFoundHandler);


export default router;