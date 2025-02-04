// Packages
import { Router } from "express";


// Controller
import { loginUser, registerUser } from "@controllers/auth.controller";


// Constants
import { ROUTES } from "@utils/constants/routes";


const router = Router();

router.get(ROUTES.AUTH.LOGIN, loginUser);
router.get(ROUTES.AUTH.SIGNUP, registerUser);

export default router;