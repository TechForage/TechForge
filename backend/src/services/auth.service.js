const ApiError = require("../utils/ApiError");
const authRepository = require("../repositories/auth.repository");

const registerUser = async (userData) => {

    const { email } = userData;

    const existingUser = await authRepository.findUserByEmail(email);

    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    const user = await authRepository.createUser(userData);

    return user;
};

module.exports = {
    registerUser,
};

/* const user = await authRepository.createUser(userData);

const userObject = user.toObject();
delete userObject.password;

return userObject; */