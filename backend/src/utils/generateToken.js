const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const getTokenExpiry = () => process.env.JWT_EXPIRES_IN || "7d";

const getExpiryDate = () => {
  const value = getTokenExpiry();
  const match = /^(\d+)([smhd])$/.exec(value);

  if (!match) {
    throw new Error("JWT_EXPIRES_IN must use a format such as 7d or 24h");
  }

  const amount = Number(match[1]);
  const units = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 };
  return new Date(Date.now() + amount * units[match[2]]);
};

const generateToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const tokenId = crypto.randomUUID();
  const token = jwt.sign(
    { sub: user._id.toString(), role: user.role, jti: tokenId },
    process.env.JWT_SECRET,
    { expiresIn: getTokenExpiry() }
  );

  return { token, tokenId, expiresAt: getExpiryDate() };
};

module.exports = generateToken;
