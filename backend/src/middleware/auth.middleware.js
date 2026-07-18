const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const authRepository = require("../repositories/auth.repository");

const authenticate = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      throw new ApiError(401, "Authorization token is required");
    }

    const token = header.slice(7);
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload.sub || !payload.jti) {
      throw new ApiError(401, "Invalid authentication token");
    }

    const [user, session] = await Promise.all([
      authRepository.findUserById(payload.sub),
      authRepository.findActiveSession(payload.jti, payload.sub),
    ]);

    if (!user || !session) {
      throw new ApiError(401, "Authentication session is invalid or expired");
    }

    req.user = user;
    req.auth = { tokenId: payload.jti, session };
    next();
  } catch (error) {
    if (error instanceof ApiError) return next(error);
    return next(new ApiError(401, "Invalid or expired authentication token"));
  }
};

module.exports = { authenticate };
