const express = require("express");
const protect = require("../middleware/protect");
const { getQuestions, createQuestion } = require("../controllers/question");

const router = express.Router();
router.use(protect);
router.post("/", createQuestion);
router.get("/", getQuestions);

module.exports = router;
