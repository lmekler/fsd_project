export class AppError extends Error {
    /**
     * Creates a new AppError instance.
     * @param {string} message - The error message.
     * @param {string} code - The error code.
     * @param {number} statusCode - The http response code.
     */
    constructor(
        public message: string,
        public code: string,
        public statusCode: number
    ) {
        super(message);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ConflictError extends AppError {
    constructor(message: string) {
        super(message, "CONFLICT", 409);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string) {
        super(message, "NOT_FOUND", 404);
    }
}

export class ValidationError extends AppError {
    constructor(message: string) {
        super(message, "VALIDATION_ERROR", 400);
    }
}