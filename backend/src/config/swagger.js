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
    { name: "Authentication", description: "User registration, login, logout, and JWT-based session auth" },
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
          "JWT Bearer token issued by POST /api/auth/login or /register. Required on routes protected by the authenticate middleware (e.g. logout). Not currently enforced on Category/Brand/Product routes.",
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
      RegisterInput: {
        type: "object",
        required: ["firstName", "lastName", "email", "password"],
        properties: {
          firstName: { type: "string", example: "John" },
          lastName: { type: "string", example: "Doe" },
          email: { type: "string", format: "email", example: "john.doe@example.com" },
          password: { type: "string", format: "password", minLength: 6, example: "secret123" },
          phone: { type: "string", example: "+91 9876543210" },
          avatar: { type: "string", example: "https://example.com/avatar.jpg" },
        },
      },
      LoginInput: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email", example: "john.doe@example.com" },
          password: { type: "string", format: "password", example: "secret123" },
        },
      },
      UserPublic: {
        type: "object",
        description: "User document with the password field stripped out.",
        properties: {
          _id: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0e1" },
          firstName: { type: "string", example: "John" },
          lastName: { type: "string", example: "Doe" },
          email: { type: "string", format: "email", example: "john.doe@example.com" },
          phone: { type: "string", example: "+91 9876543210" },
          avatar: { type: "string", example: "" },
          role: { type: "string", enum: ["user", "admin"], example: "user" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      AuthData: {
        type: "object",
        properties: {
          user: { $ref: "#/components/schemas/UserPublic" },
          token: {
            type: "string",
            description: "JWT access token to send as 'Authorization: Bearer <token>' on protected routes.",
            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          },
          expiresAt: { type: "string", format: "date-time", example: "2026-07-19T10:00:00.000Z" },
        },
      },
      AuthSuccessResponse: {
        type: "object",
        description: "Response shape produced by ApiResponse for auth endpoints.",
        properties: {
          success: { type: "boolean", example: true },
          statusCode: { type: "integer", example: 200 },
          message: { type: "string", example: "Login successful" },
          data: { $ref: "#/components/schemas/AuthData" },
        },
      },
      LogoutSuccessResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          statusCode: { type: "integer", example: 200 },
          message: { type: "string", example: "Logout successful" },
          data: { type: "object", nullable: true, example: null },
        },
      },
      AuthErrorResponse: {
        type: "object",
        description: "Response shape produced by ApiError for auth endpoints (distinct from the generic ErrorResponse schema — no 'error' field, includes 'statusCode').",
        properties: {
          success: { type: "boolean", example: false },
          statusCode: { type: "integer", example: 401 },
          message: { type: "string", example: "Invalid email or password" },
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