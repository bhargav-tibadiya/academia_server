// Packages
import { Router } from "express";

// Router
import UserRouter from '@routes/user.routes'
import AuthRouter from '@routes/auth.routes'
import UpdateRouter from '@routes/update.routes'

// Constants
import { ROUTES } from "@utils/constants/routes";

const router = Router();

router.use(ROUTES.AUTH.BASE, AuthRouter);
router.use(ROUTES.USER.BASE, UserRouter);
router.use(ROUTES.UPDATE.BASE, UpdateRouter);

export default router;