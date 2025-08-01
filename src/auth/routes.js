const express = require("express");
const { register, login, logout } = require("./controllers");

const router = express.Router();

// Auth Routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
