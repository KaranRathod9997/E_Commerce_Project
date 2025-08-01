const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const PORT = 8000;

const productRoutes = require("./src/Products/routes");
app.use("/products", productRoutes);

const userRoutes = require("./src/Users/routes");
app.use("/users", userRoutes);

const authRoutes = require("./src/auth/routes");
app.use("/routes", authRoutes);


app.listen(PORT, async () => {
  await mongoose.connect("mongodb://localhost:27017/Product_Project");
  console.log("DB connected");
  console.log("Server started");
});
