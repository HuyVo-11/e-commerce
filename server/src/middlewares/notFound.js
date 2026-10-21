import { notFoundError } from '../utils/ApiError.js';

const notFound = (req, res, next) => {
    next(notFoundError(req.originalUrl));
};

export default notFound;
