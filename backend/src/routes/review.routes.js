const express = require("express");
const router = express.Router();

const {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");
const { authenticate } = require("../middleware/auth.middleware");

/**
 * NOTE ON MOUNTING:
 * This router mixes two path prefixes ("/products/:id/reviews" and
 * "/reviews/:id"), so it must be mounted at the bare "/api" prefix in
 * app.js — NOT at "/api/reviews" like the other routers:
 *
 *   const reviewRoutes = require("./routes/review.routes");
 *   app.use("/api", reviewRoutes);
 */

/**
 * @openapi
 * /api/products/{id}/reviews:
 *   post:
 *     summary: Submit a review for a product
 *     description: >
 *       Creates a review for the given product. The caller must have
 *       purchased the product (i.e. have an existing order containing
 *       it), and may only review each product once.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *         example: 64f1a2b3c4d5e6f7a8b9c0d4
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateReviewInput'
 *           example:
 *             rating: 5
 *             comment: Exactly as described, fast shipping.
 *     responses:
 *       201:
 *         description: Review submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReviewSuccessResponse'
 *       400:
 *         description: Invalid product ID, or rating out of range
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *       401:
 *         $ref: '#/components/responses/AuthUnauthorized'
 *       403:
 *         description: Caller has not purchased this product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *       409:
 *         description: Caller has already reviewed this product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *       500:
 *         $ref: '#/components/responses/AuthServerError'
 */
router.post("/products/:id/reviews", authenticate, createReview);

/**
 * @openapi
 * /api/products/{id}/reviews:
 *   get:
 *     summary: Get all reviews for a product
 *     description: Returns all reviews for the given product, most recent first, with the reviewing user populated.
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *         example: 64f1a2b3c4d5e6f7a8b9c0d4
 *     responses:
 *       200:
 *         description: Reviews fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReviewsListSuccessResponse'
 *       400:
 *         description: Invalid product ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *       500:
 *         $ref: '#/components/responses/AuthServerError'
 */
router.get("/products/:id/reviews", getProductReviews);

/**
 * @openapi
 * /api/reviews/{id}:
 *   put:
 *     summary: Update a review
 *     description: Updates the caller's own review. Recalculates the parent product's rating stats.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: string
 *         example: 64f1a2b3c4d5e6f7a8b9c0f9
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateReviewInput'
 *           example:
 *             rating: 4
 *             comment: Updated my review after a week of use.
 *     responses:
 *       200:
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReviewSuccessResponse'
 *       400:
 *         description: Invalid review ID, or rating out of range
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *       401:
 *         $ref: '#/components/responses/AuthUnauthorized'
 *       403:
 *         description: Caller does not own this review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *       404:
 *         description: Review not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *       500:
 *         $ref: '#/components/responses/AuthServerError'
 */
router.put("/reviews/:id", authenticate, updateReview);

/**
 * @openapi
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     description: Deletes a review. Allowed for the review's owner or an admin. Recalculates the parent product's rating stats.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: string
 *         example: 64f1a2b3c4d5e6f7a8b9c0f9
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid review ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *       401:
 *         $ref: '#/components/responses/AuthUnauthorized'
 *       403:
 *         description: Caller does not own this review and is not an admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *       404:
 *         description: Review not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *       500:
 *         $ref: '#/components/responses/AuthServerError'
 */
router.delete("/reviews/:id", authenticate, deleteReview);

module.exports = router;