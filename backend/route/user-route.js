// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { register, login, getAllUsers,getProfile } = require("../controller/user-controller");
const authMiddleware = require("../midleware/authMiddleware");

// Public routes
router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);
// Protected route (admin only)
router.get("/all", authMiddleware, getAllUsers);

module.exports = router;
