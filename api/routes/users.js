const express = require("express");
const protect = require("../middleware/protect");
const { getUsers } = require("../controllers/users");

const router = express.Router();
router.use(protect);
router.get("/", getUsers);

module.exports = router;
