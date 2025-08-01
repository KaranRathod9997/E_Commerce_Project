const express = require("express");
const router = express.Router();

const {
  fetchAllProducts,
  fetchProductById,
  addNewProduct,
  updateProduct,
  deleteProduct,
} = require("./controllers"); //  Update the path accordingly

// @route   GET /products
// @desc    Fetch all products with optional filters
router.get("/get_All_Products", fetchAllProducts);

// @route   GET /products/:id
// @desc    Fetch a single product by ID
router.get("/get_One_Products/:id", fetchProductById);

// @route   POST /products
// @desc    Create a new product
router.post("/create_One_Products", addNewProduct);

// @route   PUT /products/:id
// @desc    Update a product by ID
router.put("/update_One_Products/:id", updateProduct);

// @route   DELETE /products/:id
// @desc    Delete a product by ID
router.delete("/delete_One_Products/:id", deleteProduct);

module.exports = router;
