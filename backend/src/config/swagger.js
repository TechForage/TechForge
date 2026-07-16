const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

/**
 * OpenAPI 3.0 base definition.
 * swagger-jsdoc merges this with every JSDoc "@openapi" / "@swagger"
 * block it finds in the files listed under `apis` below.
 */
const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
    title: "TechForge E-Commerce API",
    version: "1.0.0",
    description: "REST API documentation for the TechForge backend.",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Local development server",
    },
  ],
  tags: [
    { name: "Authentication", description: "User registration, login, and JWT-based auth (planned)" },
    { name: "Categories", description: "Product category management" },
    { name: "Brands", description: "Product brand management" },
    { name: "Products", description: "Product catalog management" },
    { name: "Cart", description: "Shopping cart operations (planned)" },
    { name: "Wishlist", description: "User wishlist operations (planned)" },
    { name: "Orders", description: "Order placement and tracking (planned)" },
    { name: "Reviews", description: "Product reviews and ratings (planned)" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description:
          "JWT Bearer token. NOTE: authentication middleware is not yet enforced on any route in this codebase; this scheme is defined in advance for when it is added.",
      },
    },
    schemas: {
      Category: {
        type: "object",
        properties: {
          _id: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
          name: { type: "string", example: "Electronics" },
          description: { type: "string", example: "Electronic products" },
          image: { type: "string", example: "electronics.jpg" },
          isActive: { type: "boolean", example: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      CategoryInput: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string", example: "Electronics" },
          description: { type: "string", example: "Electronic products" },
          image: { type: "string", example: "electronics.jpg" },
          isActive: { type: "boolean", example: true },
        },
      },
      Brand: {
        type: "object",
        properties: {
          _id: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d2" },
          name: { type: "string", example: "Apple" },
          description: { type: "string", example: "Premium electronics brand" },
          logo: { type: "string", example: "apple.png" },
          isActive: { type: "boolean", example: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      BrandInput: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string", example: "Apple" },
          description: { type: "string", example: "Premium electronics brand" },
          logo: { type: "string", example: "apple.png" },
          isActive: { type: "boolean", example: true },
        },
      },
      Product: {
        type: "object",
        properties: {
          _id: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d4" },
          name: { type: "string", example: "iPhone 17" },
          description: { type: "string", example: "Latest smartphone" },
          price: { type: "number", example: 99999 },
          discountPrice: { type: "number", example: 94999 },
          stock: { type: "integer", example: 20 },
          images: {
            type: "array",
            items: { type: "string" },
            example: ["front.jpg", "back.jpg"],
          },
          category: {
            oneOf: [
              { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
              { $ref: "#/components/schemas/Category" },
            ],
          },
          brand: {
            oneOf: [
              { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d2" },
              { $ref: "#/components/schemas/Brand" },
            ],
          },
          rating: { type: "number", example: 0 },
          numReviews: { type: "integer", example: 0 },
          isFeatured: { type: "boolean", example: true },
          isActive: { type: "boolean", example: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      ProductInput: {
        type: "object",
        required: ["name", "price", "stock", "category", "brand"],
        properties: {
          name: { type: "string", example: "iPhone 17" },
          description: { type: "string", example: "Latest smartphone" },
          price: { type: "number", example: 99999 },
          discountPrice: { type: "number", example: 94999 },
          stock: { type: "integer", example: 20 },
          images: {
            type: "array",
            items: { type: "string" },
            example: ["front.jpg", "back.jpg"],
          },
          category: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
          brand: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d2" },
          isFeatured: { type: "boolean", example: true },
          isActive: { type: "boolean", example: true },
        },
      },
      SuccessResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string", example: "Operation completed successfully" },
          data: { type: "object" },
        },
      },
      ErrorResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          message: { type: "string", example: "Resource not found" },
          error: { type: "string", example: "Additional low-level error detail (5xx only)" },
        },
      },
    },
    responses: {
      BadRequest: {
        description: "Invalid input / validation failed",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
            example: { success: false, message: "Category name is required" },
          },
        },
      },
      NotFound: {
        description: "Resource not found",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
            example: { success: false, message: "Category not found" },
          },
        },
      },
      Conflict: {
        description: "Duplicate unique field",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
            example: { success: false, message: "A category with this name already exists" },
          },
        },
      },
      ServerError: {
        description: "Unexpected server/database error",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
            example: {
              success: false,
              message: "Server error while processing request",
              error: "Internal error detail",
            },
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  // Scan every route file for @openapi JSDoc blocks.
  apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;