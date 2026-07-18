const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const { authenticate } = require("../middleware/auth.middleware");

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: >
 *       Creates a new user account, hashes the password, issues a JWT,
 *       and creates a session record. Rejects registration if the email
 *       is already in use.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *           example:
 *             firstName: John
 *             lastName: Doe
 *             email: john.doe@example.com
 *             password: secret123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthSuccessResponse'
 *             example:
 *               success: true
 *               statusCode: 201
 *               message: User registered successfully
 *               data:
 *                 user:
 *                   _id: 64f1a2b3c4d5e6f7a8b9c0e1
 *                   firstName: John
 *                   lastName: Doe
 *                   email: john.doe@example.com
 *                   phone: ""
 *                   avatar: ""
 *                   role: user
 *                   createdAt: "2026-07-19T09:00:00.000Z"
 *                   updatedAt: "2026-07-19T09:00:00.000Z"
 *                 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 expiresAt: "2026-07-19T10:00:00.000Z"
 *       409:
 *         description: A user with this email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 409
 *               message: User already exists
 *       500:
 *         description: Unexpected server error (also returned for unhandled validation errors, e.g. missing required fields)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 500
 *               message: Internal Server Error
 */
router.post("/register", authController.register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Log in with email and password
 *     description: >
 *       Verifies credentials against the stored password hash, issues a new
 *       JWT, and creates a session record.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *           example:
 *             email: john.doe@example.com
 *             password: secret123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthSuccessResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: Login successful
 *               data:
 *                 user:
 *                   _id: 64f1a2b3c4d5e6f7a8b9c0e1
 *                   firstName: John
 *                   lastName: Doe
 *                   email: john.doe@example.com
 *                   role: user
 *                 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 expiresAt: "2026-07-19T10:00:00.000Z"
 *       401:
 *         description: Email not found, or password does not match
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 401
 *               message: Invalid email or password
 *       500:
 *         description: Unexpected server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 500
 *               message: Internal Server Error
 */
router.post("/login", authController.login);

/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     summary: Log out the current session
 *     description: >
 *       Revokes the session tied to the caller's JWT (identified by its
 *       token ID). Requires a valid Bearer token — the authenticate
 *       middleware runs before this handler and populates req.user / req.auth.
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogoutSuccessResponse'
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: Logout successful
 *               data: null
 *       401:
 *         description: >
 *           Missing/malformed Authorization header, invalid or expired JWT,
 *           or the session was already revoked/inactive
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 401
 *               message: Session is no longer active
 *       500:
 *         description: Unexpected server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 500
 *               message: Internal Server Error
 */
router.post("/logout", authenticate, authController.logout);

module.exports = router;