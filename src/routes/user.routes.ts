// Packages
import { Router } from "express";


// Controller
import { getAllUsers, getUserById, updateUser, deleteUser } from "@controllers/user.controller";


// Constants
import { ROUTES } from "@utils/constants/routes";


const router = Router();

router.get(ROUTES.USER.GET, getAllUsers);
router.get(ROUTES.USER.GET_BY_ID, getUserById);
router.put(ROUTES.USER.UPDATE, updateUser);
router.delete(ROUTES.USER.DELETE, deleteUser);

export default router;