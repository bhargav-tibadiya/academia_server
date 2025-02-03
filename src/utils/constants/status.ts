export const STATUS = {
  // Success
  OK: 200,                              // The request was successful
  CREATED: 201,                         // The request has been fulfilled and resulted in a new resource being created
  ACCEPTED: 202,                        // The request has been accepted for processing, but the processing has not been completed
  NO_CONTENT: 204,                      // The request was successful, but there is no content to send in the response

  // Client Errors
  BAD_REQUEST: 400,                     // The server could not understand the request due to invalid syntax
  UNAUTHORIZED: 401,                    // The client must authenticate itself to get the requested response
  FORBIDDEN: 403,                       // The client does not have access rights to the content
  NOT_FOUND: 404,                       // The server could not find the requested resource
  METHOD_NOT_ALLOWED: 405,              // The method specified in the request is not allowed
  NOT_ACCEPTABLE: 406,                  // The server cannot generate a response that is acceptable to the client
  REQUEST_TIMEOUT: 408,                 // The server would like to shut down this unused connection
  CONFLICT: 409,                        // The request could not be completed due to a conflict with the current state of the target resource
  GONE: 410,                            // The requested resource is no longer available and will not be available again
  PAYLOAD_TOO_LARGE: 413,               // The request is larger than the server is willing or able to process
  URI_TOO_LONG: 414,                    // The URI requested by the client is too long for the server to process
  UNSUPPORTED_MEDIA_TYPE: 415,          // The media type of the request is not supported by the server
  TOO_MANY_REQUESTS: 429,               // The user has sent too many requests in a given amount of time

  // Server Errors
  INTERNAL_SERVER_ERROR: 500,           // The server has encountered a situation it doesn't know how to handle
  NOT_IMPLEMENTED: 501,                 // The server does not support the functionality required to fulfill the request
  BAD_GATEWAY: 502,                     // The server received an invalid response from the upstream server
  SERVICE_UNAVAILABLE: 503,             // The server is not ready to handle the request
  GATEWAY_TIMEOUT: 504,                 // The server, while acting as a gateway, did not receive a timely response from the upstream server
  HTTP_VERSION_NOT_SUPPORTED: 505,      // The HTTP version used in the request is not supported by the server
};
