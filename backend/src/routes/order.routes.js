const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/order.controller");
const { authenticate } = require("../middleware/auth.middleware");

/**
 * @openapi
 * /api/orders:
 *   post:
 *     summary: Place an order from the current cart
 *     description: >
 *       Creates an order from the authenticated user's cart. Validates
 *       stock for every item, captures a price snapshot, decrements
 *       Product stock, and clears the cart — all within a single
 *       transaction.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderInput'
 *           example:
 *             shippingAddress:
 *               fullName: John Doe
 *               phone: "+91 9876543210"
 *               addressLine1: 221B Baker Street
 *               city: Chennai
 *               state: Tamil Nadu
 *               postalCode: "600001"
 *               country: India
 *             paymentMethod: COD
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderSuccessResponse'
 *       400:
 *         description: Missing shippingAddress/paymentMethod, empty cart, or insufficient stock
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *       401:
 *         $ref: '#/components/responses/AuthUnauthorized'
 *       404:
 *         description: A product in the cart no longer exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *       500:
 *         $ref: '#/components/responses/AuthServerError'
 */
router.post("/", authenticate, createOrder);

/**
 * @openapi
 * /api/orders:
 *   get:
 *     summary: Get the current user's orders
 *     description: Returns all orders placed by the authenticated user, most recent first.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrdersListSuccessResponse'
 *       401:
 *         $ref: '#/components/responses/AuthUnauthorized'
 *       500:
 *         $ref: '#/components/responses/AuthServerError'
 */
router.get("/", authenticate, getMyOrders);

/**
 * @openapi
 * /api/orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     description: Returns a single order. Accessible by the order's owner, or by an admin.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 64f1a2b3c4d5e6f7a8b9c0f1
 *     responses:
 *       200:
 *         description: Order fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderSuccessResponse'
 *       400:
 *         description: Invalid order ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *       401:
 *         $ref: '#/components/responses/AuthUnauthorized'
 *       403:
 *         description: Order belongs to a different user and caller is not an admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *       500:
 *         $ref: '#/components/responses/AuthServerError'
 */
router.get("/:id", authenticate, getOrderById);

/**
 * @openapi
 * /api/orders/{id}/status:
 *   put:
 *     summary: Update an order's status (admin only)
 *     description: Updates the orderStatus of an order. Requires the caller's role to be "admin".
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 64f1a2b3c4d5e6f7a8b9c0f1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderStatusInput'
 *           example:
 *             orderStatus: Shipped
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderSuccessResponse'
 *       400:
 *         description: Invalid order ID or invalid orderStatus value
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *       401:
 *         $ref: '#/components/responses/AuthUnauthorized'
 *       403:
 *         description: Caller is not an admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *       500:
 *         $ref: '#/components/responses/AuthServerError'
 */
router.put("/:id/status", authenticate, updateOrderStatus);

module.exports = router;