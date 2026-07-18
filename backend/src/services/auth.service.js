const ApiError = require("../utils/ApiError");
const authRepository = require("../repositories/auth.repository");
const generateToken = require("../utils/generateToken");

const toPublicUser = (user) => {
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

const createAuthenticatedResponse = async (user) => {
    const { token, tokenId, expiresAt } = generateToken(user);
    await authRepository.createSession({ user: user._id, tokenId, expiresAt });

    return { user: toPublicUser(user), token, expiresAt };
};

const registerUser = async (userData) => {

    const { email } = userData;

    const existingUser = await authRepository.findUserByEmail(email);

    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    const user = await authRepository.createUser(userData);

    return createAuthenticatedResponse(user);
};

const loginUser = async ({ email, password }) => {
    const user = await authRepository.findUserByEmail(email);

    if (!user || !(await user.comparePassword(password))) {
        throw new ApiError(401, "Invalid email or password");
    }

    return createAuthenticatedResponse(user);
};

const logoutUser = async (tokenId, userId) => {
    const session = await authRepository.revokeSession(tokenId, userId);
    if (!session) {
        throw new ApiError(401, "Session is no longer active");
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
};
