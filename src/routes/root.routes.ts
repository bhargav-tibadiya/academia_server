// Packages
import { Router } from "express";

// Router
import UserRouter from '@routes/user.routes'
import AuthRouter from '@routes/auth.routes'
import UpdateRouter from '@routes/update.routes'
import InstituteRouter from '@routes/institute.routes'
import SubjectRouter from '@routes/subject.routes'
import AttendanceRouter from '@routes/attendance.routes'
import ProfileRouter from '@routes/profile.routes'
import FeesRouter from '@routes/fees.route'
import HallTicketRouter from '@routes/hallticket.routes'
import NotificationRouter from '@routes/notification.router'
import ClassRouter from '@routes/class.routes'
import DepartmentRouter from '@routes/department.routes'
import PlacementRouter from '@routes/placement.routes'
import RequestRouter from '@routes/request.routes'
import ResultRouter from '@routes/result.routes'
import StudentRouter from '@routes/student.routes'
import TimeTableRouter from '@routes/timetable.routes'

// Middleware
import notFoundHandler from "@middleware/notfound";

// Utils
import { ROUTES } from "@utils/constants/routes";

const router = Router();

router.use(ROUTES.AUTH.BASE, AuthRouter);
router.use(ROUTES.USER.BASE, UserRouter);
router.use(ROUTES.UPDATE.BASE, UpdateRouter);
router.use(ROUTES.INSTITUTE.BASE, InstituteRouter);
router.use(ROUTES.SUBJECT.BASE, SubjectRouter);
router.use(ROUTES.ATTENDANCE.BASE, AttendanceRouter);
router.use(ROUTES.PROFILE.BASE, ProfileRouter);
router.use(ROUTES.FEES.BASE, FeesRouter);
router.use(ROUTES.HALLTICKET.BASE, HallTicketRouter);
router.use(ROUTES.NOTIFICATION.BASE, NotificationRouter);
router.use(ROUTES.CLASS.BASE, ClassRouter);
router.use(ROUTES.DEPARTMENT.BASE, DepartmentRouter);
router.use(ROUTES.PLACEMENT.BASE, PlacementRouter);
router.use(ROUTES.REQUEST.BASE, RequestRouter);
router.use(ROUTES.RESULT.BASE, ResultRouter);
router.use(ROUTES.STUDENT.BASE, StudentRouter);
router.use(ROUTES.TIMETABLE.BASE, TimeTableRouter);

router.all(ROUTES.ALL, notFoundHandler);

export default router;