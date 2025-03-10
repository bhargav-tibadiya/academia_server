// Packages
import { Router } from "express";

// Controller
import { getNotifications, createNotification, updateNotification, deleteNotification } from "@controllers/notification.controller";

// Middleware
import validatePayload from "@middleware/validate";
import { validateRole } from "@middleware/auth";
import notFoundHandler from "@middleware/notfound";

// Utils
import { ROUTES } from "@utils/constants/routes";
import { SCHEMAKEY } from "@utils/constants/schemakey";

const router = Router();

router.get(ROUTES.NOTIFICATION.GET, getNotifications);
router.get(ROUTES.NOTIFICATION.GET_BY_ID, getNotifications);
router.post(ROUTES.NOTIFICATION.CREATE, validateRole('teacher'), validatePayload(SCHEMAKEY.NOTIFICATION.CREATE), createNotification);
router.put(ROUTES.NOTIFICATION.UPDATE, validateRole('teacher'), validatePayload(SCHEMAKEY.NOTIFICATION.UPDATE), updateNotification);
router.delete(ROUTES.NOTIFICATION.DELETE, validateRole('teacher'), deleteNotification);

router.all(ROUTES.ALL, notFoundHandler);

export default router;