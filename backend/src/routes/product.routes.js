const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

/**
 * @openapi
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: >
 *       Creates a product. Validates that `category` and `brand` are
 *       syntactically valid ObjectIds and that they reference documents
 *       that actually exist.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *           example:
 *             name: iPhone 17
 *             description: Latest smartphone
 *             price: 99999
 *             discountPrice: 94999
 *             stock: 20
 *             brand: 64f1a2b3c4d5e6f7a8b9c0d2
 *             category: 64f1a2b3c4d5e6f7a8b9c0d1
 *             images: ["front.jpg", "back.jpg"]
 *             isFeatured: true
 *             isActive: true
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               message: Product created successfully
 *               data:
 *                 _id: 64f1a2b3c4d5e6f7a8b9c0d4
 *                 name: iPhone 17
 *                 price: 99999
 *                 discountPrice: 94999
 *                 stock: 20
 *                 images: ["front.jpg", "back.jpg"]
 *                 category: { _id: 64f1a2b3c4d5e6f7a8b9c0d1, name: Electronics }
 *                 brand: { _id: 64f1a2b3c4d5e6f7a8b9c0d2, name: Apple }
 *                 rating: 0
 *                 numReviews: 0
 *                 isFeatured: true
 *                 isActive: true
 *       400:
 *         description: Missing/invalid required field, or invalid category/brand ObjectId
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: A valid product price is required
 *       404:
 *         description: Referenced category or brand does not exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Referenced category not found
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/", createProduct);

/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: >
 *       Returns all products with `category` and `brand` populated.
 *       Supports optional filtering via query parameters.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category ObjectId
 *         example: 64f1a2b3c4d5e6f7a8b9c0d1
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Filter products by brand ObjectId
 *         example: 64f1a2b3c4d5e6f7a8b9c0d2
 *       - in: query
 *         name: isFeatured
 *         schema:
 *           type: boolean
 *         description: Filter featured products
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter active/inactive products
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/", getProducts);

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Returns a single product by its MongoDB ObjectId, with category and brand populated.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 64f1a2b3c4d5e6f7a8b9c0d4
 *         description: Product MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/:id", getProductById);

/**
 * @openapi
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     description: >
 *       Updates one or more fields of an existing product. If `category` or
 *       `brand` are included, they are re-validated as existing references.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 64f1a2b3c4d5e6f7a8b9c0d4
 *         description: Product MongoDB ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *           example:
 *             price: 92999
 *             stock: 15
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put("/:id", updateProduct);

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Permanently deletes a product.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 64f1a2b3c4d5e6f7a8b9c0d4
 *         description: Product MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Product deleted successfully
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete("/:id", deleteProduct);

module.exports = router;