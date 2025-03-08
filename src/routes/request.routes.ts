// Packages
import { Router } from "express";

// Controllers
import { getRequests, createRequest, updateRequest, deleteRequest } from "@controllers/request.controller";

// Middleware
import { validateRole } from "@middleware/auth";
import validate from "@middleware/validate";

// Utils & Constants
import { ROUTES } from "@utils/constants/routes";
import { SCHEMAKEY } from "@utils/constants/schemakey";
import notFoundHandler from "@middleware/notfound";

const router = Router();

router.get(ROUTES.REQUEST.GET, getRequests);
router.get(ROUTES.REQUEST.GET_BY_ID, getRequests);
router.post(ROUTES.REQUEST.CREATE, validateRole("student"), validate(SCHEMAKEY.REQUEST.CREATE), createRequest);
router.put(ROUTES.REQUEST.UPDATE, validateRole("student"), validate(SCHEMAKEY.REQUEST.UPDATE), updateRequest);
router.delete(ROUTES.REQUEST.DELETE, validateRole("student"), deleteRequest);

router.all(ROUTES.ALL, notFoundHandler);

export default router; 