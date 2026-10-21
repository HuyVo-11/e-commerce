export class ApiError extends Error {
    constructor(statusCode, code, message, details = null) {
        super(message);

        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
    }
}

export const notFoundError = (path) => new ApiError(
    404,
    'ROUTE_NOT_FOUND',
    `Không tìm thấy endpoint ${path}`
);
