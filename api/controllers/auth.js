const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const passport = require("passport");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Resgister user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
	const { username, password } = req.body;

	if (await User.findOne({ username })) {
		return next(new ErrorResponse("Username already exists", 400));
	}

	const user = await User.create({
		username,
		password,
	});
	res.status(200).json({ success: true, data: user });
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) {
			return next(new ErrorResponse(err, 404));
		}

		req.logIn(user, async err => {
			res.status(200).json({ success: true, data: user });
		});
	})(req, res, next);
});

// @desc      Get current user
// @route     GET /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler((req, res, next) => {
	res.status(200).json({ success: true, data: req.user });
});

// @desc      Logout user
// @route     GET /api/v1/auth/logout
// @access    Private
exports.logout = asyncHandler((req, res, next) => {
	req.logout();
	res.status(200).json({ success: true, data: {} });
});
