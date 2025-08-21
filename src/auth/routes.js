const express = require("express");
const { register, login, logout } = require("./controllers");
const {createAdmin} = require("./createAdmin");
const router = express.Router();
const { authUser } = require("../auth/middleware");


// Auth Routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// POST /auth/create-admin
router.post("/create-admin", authUser, createAdmin);

module.exports = router;
