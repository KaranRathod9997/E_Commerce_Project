const mongoose = require("mongoose");


// * Product Schema - Defines a product *

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      lowercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price can't be negative"],
    },
    ratting: {
      type: Number,
      enum: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
      default: 0,
    },
    catagory: {
      type: String,
      required: [true, "Product category is required"],
      enum: [
        "gadgets",
        "health",
        "pet products",
        "jewellery",
        "clothing",
        "footwear",
        "home decor",
        "kitchen appliances",
        "furniture",
        "books",
        "beauty",
        "gaming",
        "fitness",
        "toys",
        "stationery",
        "electronics",
        "groceries",
        "automotive",
      ],
      set: (v) => v.toLowerCase(),
    },
    subcategory: {
      type: String,
      required: [true, "Subcategory is required"],
      enum: ["mens", "womens", "kids", "unisex"],
      set: (v) => v.toLowerCase(),
    },
    discount: {
      type: Number,
      default: 1,
      min: [0, "Discount cannot be negative"],
    },
    discount_data: {
      type: Date,
      default: Date.now,
    },
    color: {
      type: [String],
      // required: [true, "At least one color is required"],
      // validate: {
      //   validator: (arr) => Array.isArray(arr) && arr.length > 0,
      //   message: "Color must be a non-empty array",
      // },
    },
    desc: {
      type: String,
      trim: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
  },
  // { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;


