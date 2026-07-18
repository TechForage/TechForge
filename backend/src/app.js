const express = require("express");
const authRoutes = require("./routes/auth.routes");
const cors = require("cors");

const errorHandler = require("./middleware/error.middleware");
const { apiReference } = require("@scalar/express-api-reference");
const swaggerSpec = require("./docs/swagger");

const app = express();

// --- Core middleware (must come BEFORE routes) ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

// --- Root health-check route ---
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to TechForge API"
    });
});

// --- API Documentation (Scalar + OpenAPI) ---
app.get("/docs/openapi.json", (req, res) => {
    res.json(swaggerSpec);
});

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

app.use(errorHandler);

module.exports = app;
