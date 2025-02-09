export const MESSAGES = {
  // Success Messages
  USER_FETCHED: "User has been Fetched successfully.",
  USER_CREATED: "User has been created successfully.",
  USER_UPDATED: "User has been updated successfully.",
  USER_DELETED: "User has been deleted successfully.",
  OPERATION_SUCCESSFUL: "Operation completed successfully.",
  DATA_FETCHED: "Data fetched successfully.",
  DATA_CREATED: "Data created successfully.",
  DATA_UPDATED: "Data updated successfully.",
  DATA_DELETED: "Data deleted successfully.",
  USER_AUTHENTICATED: "User authenticated successfully",

  // Client Error Messages
  USER_ALREADY_EXISTS: "User already exists in the database.",
  INVALID_CREDENTIALS: "The credentials provided are invalid.",
  UNAUTHORIZED_ACCESS: "Unauthorized access, please login.",
  FORBIDDEN: "You do not have permission to access this resource.",
  RESOURCE_NOT_FOUND: "The requested resource could not be found.",
  METHOD_NOT_ALLOWED: "This method is not allowed for the requested resource.",
  INVALID_INPUT: "The input provided is invalid. Please check and try again.",
  MISSING_REQUIRED_FIELDS: "Some required fields are missing from the request.",
  INVALID_TOKEN: "The provided token is invalid or expired.",
  USER_NOT_FOUND: "No user found with the given information.",

  // Server Error Messages
  INTERNAL_SERVER_ERROR: "An unexpected error occurred on the server.",
  SERVICE_UNAVAILABLE: "The service is temporarily unavailable. Please try again later.",
  GATEWAY_TIMEOUT: "The server is taking too long to respond. Please try again later.",
  DATABASE_ERROR: "There was an issue connecting to the database. Please try again later.",

  // Validation Messages
  EMAIL_ALREADY_REGISTERED: "The email address is already registered.",
  PASSWORD_TOO_WEAK: "The password is too weak. Please use a stronger password.",
  INVALID_EMAIL_FORMAT: "The email address format is invalid.",
  PASSWORD_MISMATCH: "The passwords do not match.",
  AGE_REQUIRES_OVER_18: "You must be over 18 years old to register.",
  INVALID_OTP: "OTP you've entered is incorrect",

  // Rate Limiting
  TOO_MANY_REQUESTS: "You have made too many requests in a short period of time. Please try again later.",

  // Other
  OPERATION_FAILED: "The operation could not be completed. Please try again later.",
};
