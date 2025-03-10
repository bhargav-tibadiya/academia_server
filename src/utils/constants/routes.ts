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
    BASE: "/user",
    GET: "/",
    GET_BY_ID: "/:userId",
    UPDATE: "/:userId",
    DELETE: "/:userId"
  },
  UPDATE: {
    BASE: "/update",
    GET: "/",
    GET_BY_ID: "/:updateId",
    CREATE: "/",
    UPDATE: "/:updateId",
    DELETE: "/:updateId"
  },
  INSTITUTE: {
    BASE: "/institute",
    GET: "/",
    GET_BY_ID: "/:instituteId",
    CREATE: "/",
    UPDATE: "/:instituteId",
    DELETE: "/:instituteId"
  },
  SUBJECT: {
    BASE: "/subject",
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
    BASE: "/profile",
    GET: "/",
    GET_BY_ID: "/:profileId",
    CREATE: "/",
    UPDATE: "/:profileId",
    DELETE: "/:profileId"
  },
  FEES: {
    BASE: "/fee",
    GET: "/",
    GET_BY_ID: "/:feeId",
    CREATE: "/",
    UPDATE: "/:feeId",
    DELETE: "/:feeId"
  },
  HALLTICKET: {
    BASE: "/hallticket",
    GET: "/",
    GET_BY_ID: "/:hallTicketId",
    CREATE: "/",
    UPDATE: "/:hallTicketId",
    DELETE: "/:hallTicketId"
  },
  NOTIFICATION: {
    BASE: "/notification",
    GET: "/",
    GET_BY_ID: "/:notificationId",
    CREATE: "/",
    UPDATE: "/:notificationId",
    DELETE: "/:notificationId"
  },
  CLASS: {
    BASE: "/class",
    GET: "/",
    GET_BY_ID: "/:classId",
    CREATE: "/",
    UPDATE: "/:classId",
    DELETE: "/:classId"
  },
  DEPARTMENT: {
    BASE: "/department",
    GET: "/",
    GET_BY_ID: "/:departmentId",
    CREATE: "/",
    UPDATE: "/:departmentId",
    DELETE: "/:departmentId"
  },
  PLACEMENT: {
    BASE: "/placement",
    GET: "/",
    GET_BY_ID: "/:placementId",
    CREATE: "/",
    UPDATE: "/:placementId",
    DELETE: "/:placementId"
  },
  REQUEST: {
    BASE: "/request",
    GET: "/",
    GET_BY_ID: "/:requestId",
    CREATE: "/",
    UPDATE: "/:requestId",
    DELETE: "/:requestId"
  },
  RESULT: {
    BASE: "/result",
    GET: "/",
    GET_BY_ID: "/:resultId",
    CREATE: "/",
    UPDATE: "/:resultId",
    DELETE: "/:resultId"
  },
  STUDENT: {
    BASE: "/student",
    GET: "/",
    GET_BY_ID: "/:studentId",
    CREATE: "/",
    UPDATE: "/:studentId",
    DELETE: "/:studentId"
  },
  TIMETABLE: {
    BASE: "/timetable",
    GET: "/",
    GET_BY_ID: "/:timeTableId",
    CREATE: "/",
    UPDATE: "/:timeTableId",
    DELETE: "/:timeTableId"
  },
  EXAM: {
    BASE: "/exam",
    GET: "/",
    GET_BY_ID: "/:examId",
    CREATE: "/",
    UPDATE: "/:examId",
    DELETE: "/:examId"
  }
};