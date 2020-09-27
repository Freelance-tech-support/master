const express = require("express");
const protect = require("../middleware/protect");
const { register, login, logout, getMe, status } = require("../controllers/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", protect, logout);
router.get("/me", protect, getMe);
router.post("/status", status);

module.exports = router;
