const Question = require("../models/Question");
const User = require("../models/User")
const asyncHandler = require("../middleware/async");

// @desc      Get all questions
// @route     GET /api/v1/questions
// @access    Private
exports.getQuestions = asyncHandler(async (req, res, next) => {
   const questions = await Question.find().populate('user');
   res.status(200).json({
      success: true,
      count: questions.length,
      data: questions
   })
});

// @desc      Create new question
// @route     POST /api/v1/questions
// @access    Private
exports.createQuestion = asyncHandler(async (req, res, next) => {
	req.body.user = req.user._id;
   const question = await Question.create(req.body);

	res.status(201).json({
		success: true,
		data: question,
	});
});