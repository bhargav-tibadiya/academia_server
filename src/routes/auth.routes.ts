// Packages
import { Router } from "express";


// Controller
import { loginUser, registerUser } from "@controllers/auth.controller";


// Constants
import { ROUTES } from "@utils/constants/routes";


const router = Router();

router.post(ROUTES.AUTH.LOGIN, loginUser);
router.post(ROUTES.AUTH.SIGNUP, registerUser);

export default router;