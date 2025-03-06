interface SchemaKeyType {
  AUTH: {
    LOGIN: 'login',
    SIGNUP: 'signup',
    SEND_OTP: 'sendOtp'
  },
  USER: {
    UPDATE: "updateUser",
  },
  UPDATE: {
    CREATE: "createUpdate",
    UPDATE: "updateUpdate",
  },
  INSTITUTE: {
    CREATE: "createInstitute",
    UPDATE: "updateInstitute",
  },
  SUBJECT: {
    CREATE: "createSubject",
    UPDATE: "updateSubject",
  },
  ATTENDANCE: {
    CREATE: "createAttendance",
    UPDATE: "updateAttendance",
    ADD_RECORD: "addAttendanceRecord",
  },
  PROFILE: {
    CREATE: "createProfile",
    UPDATE: "updateProfile",
  },
  FEES: {
    CREATE: "createFees",
    UPDATE: "updateFees",
  },
  HALLTICKET: {
    CREATE: "createHallTicket",
    UPDATE: "updateHallTicket",
  },
  CLASS:{
    CREATE:"createClass",
    UPDATE:"updateClass",
  },
  TIMETABLE:{
    CREATE:"createTimeTable",
    UPDATE:"updateTimeTable",
  },
}

export const SCHEMAKEY: SchemaKeyType = {
  // 
  AUTH: {
    LOGIN: 'login',
    SIGNUP: 'signup',
    SEND_OTP: 'sendOtp'
  },
  // 
  USER: {
    UPDATE: "updateUser",
  },
  // 
  UPDATE: {
    CREATE: "createUpdate",
    UPDATE: "updateUpdate",
  },
  // 
  INSTITUTE: {
    CREATE: "createInstitute",
    UPDATE: "updateInstitute",
  },
  // 
  SUBJECT: {
    CREATE: "createSubject",
    UPDATE: "updateSubject",
  },
  // 
  ATTENDANCE: {
    CREATE: "createAttendance",
    UPDATE: "updateAttendance",
    ADD_RECORD: "addAttendanceRecord",
  },
  // 
  PROFILE: {
    CREATE: "createProfile",
    UPDATE: "updateProfile",
  },
  // 
  FEES: {
    CREATE: "createFees",
    UPDATE: "updateFees",
  },
  // 
  HALLTICKET: {
    CREATE: "createHallTicket",
    UPDATE: "updateHallTicket",
  },
  // 
  CLASS: {
    CREATE: "createClass",
    UPDATE: "updateClass",
  },
  // 
  TIMETABLE:{
    CREATE:"createTimeTable",
    UPDATE:"updateTimeTable",
  },
}