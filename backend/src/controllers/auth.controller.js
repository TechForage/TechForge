const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const authService = require("../services/auth.service");

const register = asyncHandler(async (req, res) => {

    const user = await authService.registerUser(req.body);

    res.status(201).json(
        new ApiResponse(
            201,
            "User registered successfully",
            user
        )
    );
});

const login = asyncHandler(async (req, res) => {
    const auth = await authService.loginUser(req.body);

    res.status(200).json(new ApiResponse(200, "Login successful", auth));
});

const logout = asyncHandler(async (req, res) => {
    await authService.logoutUser(req.auth.tokenId, req.user._id);

    res.status(200).json(new ApiResponse(200, "Logout successful"));
});

module.exports = {
    register,
    login,
    logout,
};
