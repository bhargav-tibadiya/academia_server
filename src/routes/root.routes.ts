// Packages
import { Router } from "express";


// Router
import UserRouter from '@routes/user.routes'
import AuthRouter from '@routes/user.routes'


// Constants
import { ROUTES } from "@utils/constants/routes";


const router = Router();

router.get(ROUTES.AUTH.BASE, AuthRouter);
router.get(ROUTES.USER.BASE, UserRouter);

export default router;