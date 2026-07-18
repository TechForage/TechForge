const User = require("../models/User");
const AuthSession = require("../models/AuthSession");

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const createUser = async (userData) => {
    return await User.create(userData);
};

const findUserById = async (id) => User.findById(id);

const createSession = async (sessionData) => AuthSession.create(sessionData);

const findActiveSession = async (tokenId, userId) =>
    AuthSession.findOne({
        tokenId,
        user: userId,
        revokedAt: null,
        expiresAt: { $gt: new Date() },
    });

const revokeSession = async (tokenId, userId) =>
    AuthSession.findOneAndUpdate(
        { tokenId, user: userId, revokedAt: null },
        { revokedAt: new Date() },
        { new: true }
    );

module.exports = {
    findUserByEmail,
    createUser,
    findUserById,
    createSession,
    findActiveSession,
    revokeSession,
};
