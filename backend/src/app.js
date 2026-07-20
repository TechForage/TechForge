const express = require("express");
const cors = require("cors");

const errorHandler = require("./middleware/error.middleware");
const { apiReference } = require("@scalar/express-api-reference");
const swaggerSpec = require("./config/swagger");

const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require("./routes/category.routes");
const brandRoutes = require("./routes/brand.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const wishlistRoutes = require("./routes/wishlist.routes");
const orderRoutes = require("./routes/order.routes");
const reviewRoutes = require("./routes/review.routes");

const app = express();

// --- Core middleware (must come BEFORE routes) ---
app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Root health-check route ---
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to TechForge API"
    });
});

// --- Debug: inspect the raw generated OpenAPI document ---
app.get("/openapi.json", (req, res) => {
    res.json(swaggerSpec);
});

// --- API Documentation (Scalar + OpenAPI) ---
// Serve the raw OpenAPI JSON (useful for Postman import, external tools, etc.)
app.get("/docs/openapi.json", (req, res) => {
    res.json(swaggerSpec);
});

// Serve the interactive Scalar documentation UI
app.use(
    "/docs",
    apiReference({
        spec: {
            content: swaggerSpec,
        },
        theme: "purple",
        metaData: {
            title: "TechForge E-Commerce API - Docs",
            description: "REST API documentation for the TechForge backend.",
        },
    })
);

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes); // review.routes.js defines full sub-paths internally
// review.routes.js defines full sub-paths internally
// ("/products/:id/reviews" and "/reviews/:id"), so it mounts at bare "/api"
app.use("/api", reviewRoutes);

// --- 404 handler (for unmatched routes) ---
app.use((req, res) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: `Route ${req.originalUrl} not found`
    });
});

// --- Global error handler (always last) ---
app.use(errorHandler);

module.exports = app;