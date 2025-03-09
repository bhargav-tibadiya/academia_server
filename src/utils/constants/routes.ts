export const ROUTES = {
  BASE: "/api/v1",
  ALL: "*",
  DOCS: "/api/docs",
  AUTH: {
    BASE: "/auth",
    LOGIN: "/login",
    SIGNUP: "/signup",
    SEND_OTP: "/send-otp"
  },
  USER: {
    BASE: "/users",
    GET: "/",
    GET_BY_ID: "/:userId",
    UPDATE: "/:userId",
    DELETE: "/:userId"
  },
  UPDATE: {
    BASE: "/updates",
    GET: "/",
    GET_BY_ID: "/:updateId",
    CREATE: "/",
    UPDATE: "/:updateId",
    DELETE: "/:updateId"
  },
  INSTITUTE: {
    BASE: "/institutes",
    GET: "/",
    GET_BY_ID: "/:instituteId",
    CREATE: "/",
    UPDATE: "/:instituteId",
    DELETE: "/:instituteId"
  },
  SUBJECT: {
    BASE: "/subjects",
    GET: "/",
    GET_BY_ID: "/:subjectId",
    CREATE: "/",
    UPDATE: "/:subjectId",
    DELETE: "/:subjectId"
  },
  ATTENDANCE: {
    BASE: "/attendance",
    GET: "/",
    GET_BY_ID: "/:attendanceId",
    CREATE: "/",
    ADD_RECORD: "/add-record",
    UPDATE: "/:attendanceId",
    DELETE: "/:attendanceId"
  },
  PROFILE: {
    BASE: "/profiles",
    GET: "/",
    GET_BY_ID: "/:profileId",
    CREATE: "/",
    UPDATE: "/:profileId",
    DELETE: "/:profileId"
  },
  FEES: {
    BASE: "/fees",
    GET: "/",
    GET_BY_ID: "/:feeId",
    CREATE: "/",
    UPDATE: "/:feeId",
    DELETE: "/:feeId"
  },
  HALLTICKET: {
    BASE: "/halltickets",
    GET: "/",
    GET_BY_ID: "/:hallTicketId",
    CREATE: "/",
    UPDATE: "/:hallTicketId",
    DELETE: "/:hallTicketId"
  },
  NOTIFICATION: {
    BASE: "/notifications",
    GET: "/",
    GET_BY_ID: "/:notificationId",
    CREATE: "/",
    UPDATE: "/:notificationId",
    DELETE: "/:notificationId"
  },
  CLASS: {
    BASE: "/classes",
    GET: "/",
    GET_BY_ID: "/:classId",
    CREATE: "/",
    UPDATE: "/:classId",
    DELETE: "/:classId"
  },
  DEPARTMENT: {
    BASE: "/departments",
    GET: "/",
    GET_BY_ID: "/:departmentId",
    CREATE: "/",
    UPDATE: "/:departmentId",
    DELETE: "/:departmentId"
  },
  PLACEMENT: {
    BASE: "/placements",
    GET: "/",
    GET_BY_ID: "/:placementId",
    CREATE: "/",
    UPDATE: "/:placementId",
    DELETE: "/:placementId"
  },
  REQUEST: {
    BASE: "/requests",
    GET: "/",
    GET_BY_ID: "/:requestId",
    CREATE: "/",
    UPDATE: "/:requestId",
    DELETE: "/:requestId"
  },
  RESULT: {
    BASE: "/results",
    GET: "/",
    GET_BY_ID: "/:resultId",
    CREATE: "/",
    UPDATE: "/:resultId",
    DELETE: "/:resultId"
  },
  STUDENT: {
    BASE: "/students",
    GET: "/",
    GET_BY_ID: "/:studentId",
    CREATE: "/",
    UPDATE: "/:studentId",
    DELETE: "/:studentId"
  },
  TIMETABLE: {
    BASE: "/timetables",
    GET: "/",
    GET_BY_ID: "/:timeTableId",
    CREATE: "/",
    UPDATE: "/:timeTableId",
    DELETE: "/:timeTableId"
  },
  EXAM: {
    BASE: "/exams",
    GET: "/",
    GET_BY_ID: "/:examId",
    CREATE: "/",
    UPDATE: "/:examId",
    DELETE: "/:examId"
  }
};