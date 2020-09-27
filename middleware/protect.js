const asyncHandler = require('./async')
const ErrorResponse = require('../utils/ErrorResponse')

const protect = asyncHandler(async (req, res, next) => {
   if (!req.isAuthenticated()) {
		return next(new ErrorResponse("Not authorized to access this route", 401));
   }
   next()
})

module.exports = protect