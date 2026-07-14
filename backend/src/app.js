const express = require("express");
const cors = require("cors");

const errorHandler = require("./middleware/error.middleware");

const app = express();

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