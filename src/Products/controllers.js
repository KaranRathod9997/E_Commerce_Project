const User = require("../Users/model");
const Product = require("./model");
const mongoose = require("mongoose");

// * GET /products *
// * Fetch all products with search, pagination, sorting *

// const fetchAllProducts = async (req, res) => {
//     try {
//         const { search, sort = "name", page = 1, limit = 20 } = req.query;
//         const query = search ? { name: { $regex: search, $options: "i" } } : {};

//         const products = await Product.find(query)
//             .sort(sort)
//             .skip((page - 1) * limit)
//             .limit(Number(limit));

//         const total = await Product.countDocuments(query);

//         return res.status(200).json({
//             total,
//             count: products.length,
//             currentPage: Number(page),
//             data: products,
//             message: "Products retrieved successfully",
//         });
//     } catch (err) {
//         console.error("Fetch error:", err);
//         return res.status(500).json({
//             message: "Failed to fetch products",
//             error: err.message,
//         });
//     }
// };

const fetchAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("user","username email"); 

        res.status(200).json({
            total: products.length,
            data: products,
            message: "All products fetched successfully",
        });
    } catch (err) {
        console.error("Fetch error:", err);
        res.status(500).json({
            message: "Failed to fetch products",
            error: err.message,
        });
    }
};

// * GET /products/:id *
// * Fetch product by ID *

const fetchProductById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID format" });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({
            data: product,
            message: "Product retrieved successfully",
        });
    } catch (err) {
        console.error("Fetch by ID error:", err);
        return res.status(500).json({
            message: "Error fetching product",
            error: err.message,
        });
    }
};

// * POST /products *
// * Create a new product *

const addNewProduct = async (req, res) => {
    try {
    // console.log("req.body:", req.body);
    // console.log("req file:", req.file);

    const user_id = req.user.id;
    // console.log(user_id);
     // multer gives uploaded file in req.file
        let imagePath = "";
        if (req.file) {
            imagePath = "/products/" + req.file.filename; // save only relative path
        }

    const user = await User.findById(user_id);
        const {
            name,
            price,
            ratting,
            catagory,
            subcategory,
            discount,
            discount_data,
            color,
            desc
        } = req.body;

        // Manual validation before hitting MongoDB
        if (!name || price === undefined || !catagory || !subcategory || !color || color.length === 0) {
            return res.status(400).json({
                message: "Missing required fields: name, price, catagory, subcategory, and at least one color are required.",
            });
        } else {
            const newProduct = await Product.create({
                name,
                price,
                ratting,
                catagory,
                subcategory,
                discount,
                discount_data,
                color,
                desc,
                user:user_id,
                image:imagePath
            });
            user.product.push(newProduct.id)
            await user.save()
            // newProduct.user.push(user_id)

            return res.status(201).json({
                data: newProduct,
                message: "Product created successfully",
            });
        }


    } catch (err) {
        console.error("Create error:", err);
        return res.status(500).json({
            message: "Failed to create product",
            error: err.message,
        });
    }
};

// * PUT /products/:id *
// * Update existing product *

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID format" });
        }

        const updated = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({
            message: "Product updated successfully",
            data: updated,
        });
    } catch (err) {
        console.error("Update error:", err);
        return res.status(500).json({
            message: "Failed to update product",
            error: err.message,
        });
    }
};

// * DELETE /products/:id *
// * Delete product by ID *

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID format" });
        }

        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Product not found or already deleted" });
        }

        return res.status(200).json({
            message: "Product deleted successfully",
            deletedProduct: deleted,
        });
    } catch (err) {
        console.error("Delete error:", err);
        return res.status(500).json({
            message: "Failed to delete product",
            error: err.message,
        });
    }
};

module.exports = {
    fetchAllProducts,
    fetchProductById,
    addNewProduct,
    updateProduct,
    deleteProduct,
};
