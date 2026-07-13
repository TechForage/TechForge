const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../techforage-backend/.env") });

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});