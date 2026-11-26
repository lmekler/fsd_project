/**
 * HTTP Status Codes
 */
export const HTTP_STATUS = {
    // Success responses
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204, // For successful DELETE operations, etc.

    // Client-side error responses
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401, // For invalid token authentication errors
    FORBIDDEN: 403, // For insufficient role authorization errors
    NOT_FOUND: 404,
    CONFLICT: 409, // For resource conflicts
    UNPROCESSABLE_ENTITY: 422, // For validation errors

    // Server-side error responses
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501, // For unimplemented features
    BAD_GATEWAY: 502, // For external service failures
    SERVICE_UNAVAILABLE: 503, // For temporary service outages
} as const;