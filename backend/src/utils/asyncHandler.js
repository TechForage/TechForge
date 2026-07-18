const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((error) => {
            if (typeof next === "function") {
                return next(error);
            }

            res.status(500).json({
                success: false,
                message: error.message || "Internal Server Error",
            });
        });
    };
};

module.exports = asyncHandler;