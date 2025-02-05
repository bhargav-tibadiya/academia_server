// Packages
import { Router } from "express";


// Controller
import { loginUser, registerUser } from "@controllers/auth.controller";


// Constants
import { ROUTES } from "@utils/constants/routes";
import validatePayload from "src/middleware/validate";
import { SCHEMAKEY } from "@utils/constants/schemakey";


const router = Router();

router.post(ROUTES.AUTH.LOGIN, validatePayload(SCHEMAKEY.AUTH.LOGIN), loginUser);
router.post(ROUTES.AUTH.SIGNUP, validatePayload(SCHEMAKEY.AUTH.SIGNUP), registerUser);

export default router;