// Packages
import { Router } from "express";

// Controller
import { getAllUsers, getUserById, updateUser, deleteUser } from "@controllers/user.controller";

// Middleware
import { isAuthorized } from "@middleware/auth";

// Constants
import { ROUTES } from "@utils/constants/routes";

const router = Router();

router.get(ROUTES.USER.GET, isAuthorized, getAllUsers);
router.get(ROUTES.USER.GET_BY_ID, isAuthorized, getUserById);
router.put(ROUTES.USER.UPDATE, isAuthorized, updateUser);
router.delete(ROUTES.USER.DELETE, isAuthorized, deleteUser);

export default router;