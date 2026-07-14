const express = require("express");
const authRoutes = require("./routes/auth.routes");
const cors = require("cors");

const app = express();


app.use("/api/v1/auth", authRoutes);

const errorHandler = require("./middleware/error.middleware");

app.use(cors());

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