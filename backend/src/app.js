const express = require("express");
const cors = require("cors");

const errorHandler = require("./middleware/error.middleware");
const testRoutes = require("./routes/test.routes");
const categoryRoutes = require("./routes/category.routes");
const brandRoutes = require("./routes/brand.routes");
const productRoutes = require("./routes/product.routes");

const app = express();

app.use(cors());

app.use("/api/test", testRoutes);

app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/products", productRoutes);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Welcome to TechForge API"
    });

});

app.use(errorHandler);

module.exports = app;