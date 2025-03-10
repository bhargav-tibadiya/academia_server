// Packages
import { Router } from "express";

// Controller
import { getProfiles, createProfile, updateProfile, deleteProfile } from "@controllers/profile.controller";

// Middleware
import validatePayload from "@middleware/validate";
import { validateRole } from "@middleware/auth";
import notFoundHandler from "@middleware/notfound";

// Utils
import { ROUTES } from "@utils/constants/routes";
import { SCHEMAKEY } from "@utils/constants/schemakey";

const router = Router();

router.get(ROUTES.PROFILE.GET, getProfiles);
router.get(ROUTES.PROFILE.GET_BY_ID, getProfiles);
router.post(ROUTES.PROFILE.CREATE, validateRole('teacher'), validatePayload(SCHEMAKEY.PROFILE.CREATE), createProfile);
router.put(ROUTES.PROFILE.UPDATE, validateRole('teacher'), validatePayload(SCHEMAKEY.PROFILE.UPDATE), updateProfile);
router.delete(ROUTES.PROFILE.DELETE, validateRole('teacher'), deleteProfile);

router.all(ROUTES.ALL, notFoundHandler);


export default router;