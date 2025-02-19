// Packages
import { Router } from "express";


// Controller
import { loginUser, registerUser, sendOTP } from "@controllers/auth.controller";


// Constants
import { ROUTES } from "@utils/constants/routes";
import validatePayload from "src/middleware/validate";
import { SCHEMAKEY } from "@utils/constants/schemakey";


const router = Router();

router.post(ROUTES.AUTH.LOGIN, validatePayload(SCHEMAKEY.AUTH.LOGIN), loginUser);
router.post(ROUTES.AUTH.SIGNUP, validatePayload(SCHEMAKEY.AUTH.SIGNUP), registerUser);
router.post(ROUTES.AUTH.SEND_OTP, validatePayload(SCHEMAKEY.AUTH.SEND_OTP), sendOTP);

export default router;