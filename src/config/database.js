const mongoose = require("mongoose");

const database = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Product_Project", { autoIndex: false });
        console.log("DataBase connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error)
    }
}

module.exports = database;