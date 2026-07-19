const express = require("express");
const router = express.Router();

const {
  getCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cart.controller");
const { authenticate } = require("../middleware/auth.middleware");

/**
 * @openapi
 * /api/cart:
 *   get:
 *     summary: Get the current user's cart
 *     description: Returns the authenticated user's cart with populated product details. Returns an empty cart shape if none exists yet.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartSuccessResponse'
 *       401:
 *         $ref: '#/components/responses/AuthUnauthorized'
 *       500:
 *         $ref: '#/components/responses/AuthServerError'
 */
router.get("/", authenticate, getCart);

/**
 * @openapi
 * /api/cart/add:
 *   post:
 *     summary: Add an item to the cart
 *     description: Adds a product to the authenticated user's cart, or increases its quantity if already present. Validates stock availability.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddToCartInput'
 *           example:
 *             productId: 64f1a2b3c4d5e6f7a8b9c0d4
 *             quantity: 2
 *     responses:
 *       200:
 *         description: Item added to cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartSuccessResponse'
 *       400:
 *         description: Invalid productId/quantity, or insufficient stock
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
 *       500:
 *         $ref: '#/components/responses/AuthServerError'
 */
router.post("/add", authenticate, addItemToCart);

/**
 * @openapi
 * /api/cart/update/{productId}:
 *   put:
 *     summary: Update an item's quantity in the cart
 *     description: Sets the quantity of an existing cart item to the given value (not incremented). Validates stock availability.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         example: 64f1a2b3c4d5e6f7a8b9c0d4
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCartItemInput'
 *           example:
 *             quantity: 3
 *     responses:
 *       200:
 *         description: Cart item updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartSuccessResponse'
 *       400:
 *         description: Invalid quantity, or insufficient stock
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *       401:
 *         $ref: '#/components/responses/AuthUnauthorized'
 *       404:
 *         description: Cart not found, product not found, or item not in cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *       500:
 *         $ref: '#/components/responses/AuthServerError'
 */
router.put("/update/:productId", authenticate, updateCartItem);

/**
 * @openapi
 * /api/cart/remove/{productId}:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
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
 *         description: Item removed from cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartSuccessResponse'
 *       401:
 *         $ref: '#/components/responses/AuthUnauthorized'
 *       404:
 *         description: Cart not found, or item not in cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *       500:
 *         $ref: '#/components/responses/AuthServerError'
 */
router.delete("/remove/:productId", authenticate, removeCartItem);

/**
 * @openapi
 * /api/cart/clear:
 *   delete:
 *     summary: Clear the entire cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartSuccessResponse'
 *       401:
 *         $ref: '#/components/responses/AuthUnauthorized'
 *       404:
 *         description: Cart not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *       500:
 *         $ref: '#/components/responses/AuthServerError'
 */
router.delete("/clear", authenticate, clearCart);

module.exports = router;