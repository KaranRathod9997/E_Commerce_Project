const express = require("express");

const router = express.Router();

// Controller methods
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("./controllers");
const { authUser } = require("../auth/middleware");

// @route   GET /api/users
router.get("/get_All_Users",  getAllUsers);

// @route   GET /api/users/:id
router.get("/get_One_Users/:id", authUser, getUserById);

// @route   PUT /api/users/:id
router.put("/update_One_Users/:id", authUser, updateUser);

// @route   DELETE /api/users/:id
router.delete("/delete_One_Users/:id", authUser, deleteUser);

module.exports = router;
