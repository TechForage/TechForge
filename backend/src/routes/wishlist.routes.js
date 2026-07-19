const express = require("express");
const router = express.Router();

const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlist.controller");
const { authenticate } = require("../middleware/auth.middleware");

/**
 * @openapi
 * /api/wishlist:
 *   get:
 *     summary: Get the current user's wishlist
 *     description: Returns the authenticated user's wishlist with populated product details.
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WishlistSuccessResponse'
 *       401:
 *         $ref: '#/components/responses/AuthUnauthorized'
 *       500:
 *         $ref: '#/components/responses/AuthServerError'
 */
router.get("/", authenticate, getWishlist);

/**
 * @openapi
 * /api/wishlist/add/{productId}:
 *   post:
 *     summary: Add a product to the wishlist
 *     description: Adds a product to the authenticated user's wishlist. Rejects duplicates.
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         example: 64f1a2b3c4d5e6f7a8b9c0d4
 *     responses:
 *       200:
 *         description: Product added to wishlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WishlistSuccessResponse'
 *       400:
 *         description: Invalid product ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *       401:
 *         $ref: '#/components/responses/AuthUnauthorized'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *       409:
 *         description: Product is already in the wishlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *       500:
 *         $ref: '#/components/responses/AuthServerError'
 */
router.post("/add/:productId", authenticate, addToWishlist);

/**
 * @openapi
 * /api/wishlist/remove/{productId}:
 *   delete:
 *     summary: Remove a product from the wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         example: 64f1a2b3c4d5e6f7a8b9c0d4
 *     responses:
 *       200:
 *         description: Product removed from wishlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WishlistSuccessResponse'
 *       401:
 *         $ref: '#/components/responses/AuthUnauthorized'
 *       404:
 *         description: Wishlist not found, or product not in wishlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *       500:
 *         $ref: '#/components/responses/AuthServerError'
 */
router.delete("/remove/:productId", authenticate, removeFromWishlist);

module.exports = router;