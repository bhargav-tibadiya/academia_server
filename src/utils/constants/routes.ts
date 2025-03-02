export const ROUTES = {
  BASE: "/api/v1",
  ALL: "*",
  DOCS: '/api/docs',
  AUTH: {
    BASE: '/auth',
    LOGIN: '/login',
    SIGNUP: '/signup',
    SEND_OTP: '/sendOtp',
  },
  USER: {
    BASE: "/user",
    GET: "/",
    GET_BY_ID: "/:userId",
    UPDATE: "/:userId",
    DELETE: "/:userId",
  },
  UPDATE: {
    BASE: "/update",
    GET: "/",
    CREATE: "/",
    GET_BY_ID: "/:updateId",
    UPDATE: "/:updateId",
    DELETE: "/:updateId",
  },
  INSTITUTE: {
    BASE: "/institute",
    GET: "/",
    CREATE: "/",
    GET_BY_ID: "/:instituteId",
    UPDATE: "/:instituteId",
    DELETE: "/:instituteId",
  },
  SUBJECT: {
    BASE: "/subject",
    GET: "/",
    CREATE: "/",
    GET_BY_ID: "/:subjectId",
    UPDATE: "/:subjectId",
    DELETE: "/:subjectId",
  }
}