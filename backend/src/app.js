const express = require("express");
const cors = require("cors");

const errorHandler = require("./middleware/error.middleware");
const testRoutes = require("./routes/test.routes");
const categoryRoutes = require("./routes/category.routes");
const brandRoutes = require("./routes/brand.routes");
const productRoutes = require("./routes/product.routes");

const { apiReference } = require("@scalar/express-api-reference");
const swaggerSpec = require("./docs/swagger");

const app = express();

// --- Core middleware (must come BEFORE routes) ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Root health-check route ---
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to TechForge API"
    });
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
app.use("/api/test", testRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/products", productRoutes);

// --- 404 handler (for unmatched routes) ---
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// --- Global error handler (always last) ---
app.use(errorHandler);

module.exports = app;