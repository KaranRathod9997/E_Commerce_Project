const express = require("express");
// const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const database = require("./src/config/database");
// const multer = require("multer");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: "process.emv.session_secret_key",
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: true, sameSite: "Lax" }
}))

database();

const PORT = 8000;

const productRoutes = require("./src/Products/routes");
app.use("/products", productRoutes);

const userRoutes = require("./src/Users/routes");
app.use("/users", userRoutes);

const authRoutes = require("./src/auth/routes");
app.use("/routes", authRoutes);


app.listen(PORT, () => {
   console.log("Server is running on port 8000");
});
