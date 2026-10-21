// Bọc handler async để lỗi promise luôn rơi vào errorHandler
export const asyncHandler = (handler) => (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
};
