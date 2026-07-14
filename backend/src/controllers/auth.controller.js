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

module.exports = {
    register,
};