export const ROUTES = {
  BASE: "/api/v1",
  AUTH: {
    BASE: '/auth',
    LOGIN: '/login',
    SIGNUP: '/signup',
  },
  USER: {
    BASE: "/user",
    GET: "/:userId",
    GET_BY_ID: "/:userId",
    UPDATE: "/:userId",
    DELETE: "/:userId",
  }
}