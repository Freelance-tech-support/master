const express = require("express");
const protect = require("../middleware/protect");
const {
	register,
	login,
	logout,
	getMe,
} = require("../controllers/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", protect, logout);
router.get("/me", protect, getMe);

module.exports = router;