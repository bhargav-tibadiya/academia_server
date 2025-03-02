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
}