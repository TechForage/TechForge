const express = require("express");
const router = express.Router();

const {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} = require("../controllers/brand.controller");

/**
 * @openapi
 * /api/brands:
 *   post:
 *     summary: Create a new brand
 *     description: Creates a new product brand. Rejects duplicate brand names.
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BrandInput'
 *           example:
 *             name: Apple
 *             description: Premium electronics brand
 *             logo: apple.png
 *             isActive: true
 *     responses:
 *       201:
 *         description: Brand created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               message: Brand created successfully
 *               data:
 *                 _id: 64f1a2b3c4d5e6f7a8b9c0d2
 *                 name: Apple
 *                 description: Premium electronics brand
 *                 logo: apple.png
 *                 isActive: true
 *                 createdAt: "2026-07-16T10:00:00.000Z"
 *                 updatedAt: "2026-07-16T10:00:00.000Z"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/", createBrand);

/**
 * @openapi
 * /api/brands:
 *   get:
 *     summary: Get all brands
 *     description: Returns all brands, most recently created first.
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: List of brands
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
 *                     $ref: '#/components/schemas/Brand'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/", getBrands);

/**
 * @openapi
 * /api/brands/{id}:
 *   get:
 *     summary: Get a brand by ID
 *     description: Returns a single brand by its MongoDB ObjectId.
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 64f1a2b3c4d5e6f7a8b9c0d2
 *         description: Brand MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Brand found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Brand'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/:id", getBrandById);

/**
 * @openapi
 * /api/brands/{id}:
 *   put:
 *     summary: Update a brand
 *     description: Updates one or more fields of an existing brand. Rejects names that collide with another brand.
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 64f1a2b3c4d5e6f7a8b9c0d2
 *         description: Brand MongoDB ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BrandInput'
 *           example:
 *             description: Premium electronics and lifestyle brand
 *             isActive: false
 *     responses:
 *       200:
 *         description: Brand updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put("/:id", updateBrand);

/**
 * @openapi
 * /api/brands/{id}:
 *   delete:
 *     summary: Delete a brand
 *     description: >
 *       Permanently deletes a brand. Note - this does not cascade to
 *       products referencing this brand.
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 64f1a2b3c4d5e6f7a8b9c0d2
 *         description: Brand MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Brand deleted successfully
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
 *                   example: Brand deleted successfully
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete("/:id", deleteBrand);

module.exports = router;