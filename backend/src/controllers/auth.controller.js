const ApiResponse = require("../utils/ApiResponse");
const authService = require("../services/auth.service");

const sendErrorResponse = (res, error) => {
    const statusCode = error?.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        statusCode,
        message: error?.message || "Internal Server Error",
    });
};

const register = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);

        res.status(201).json(
            new ApiResponse(201, "User registered successfully", user)
        );
    } catch (error) {
        sendErrorResponse(res, error);
    }
};

const login = async (req, res) => {
    try {
        const auth = await authService.loginUser(req.body);

        res.status(200).json(new ApiResponse(200, "Login successful", auth));
    } catch (error) {
        sendErrorResponse(res, error);
    }
};

const logout = async (req, res) => {
    try {
        await authService.logoutUser(req.auth.tokenId, req.user._id);

        res.status(200).json(new ApiResponse(200, "Logout successful"));
    } catch (error) {
        sendErrorResponse(res, error);
    }
};

module.exports = {
    register,
    login,
    logout,
};
