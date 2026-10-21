import { ApiError } from '../utils/ApiError.js';
import { env } from '../config/env.js';

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
    const isApiError = error instanceof ApiError;
    const statusCode = isApiError ? error.statusCode : 500;

    // Chỉ log stack với lỗi 5xx, tránh spam console khi client gửi request sai
    if (statusCode >= 500) {
        console.error(error);
    }

    const body = {
        error: {
            code: isApiError ? error.code : 'INTERNAL_SERVER_ERROR',
            message: isApiError ? error.message : 'Đã có lỗi xảy ra trên server',
        },
    };

    if (isApiError && error.details) {
        body.error.details = error.details;
    }

    if (env.nodeEnv === 'development' && !isApiError) {
        body.error.stack = error.stack;
    }

    res.status(statusCode).json(body);
};

export default errorHandler;
