export const ROUTES = {
  BASE: "/api/v1",
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
  }
}