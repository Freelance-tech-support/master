const asyncHandler = require('./async')
const ErrorResponse = require('../utils/errorResponse')

const protect = asyncHandler(async (req, res, next) => {
   if (!req.user) {
		return next(new ErrorResponse("Not authorized to access this route", 401));
   }
   next()
})

module.exports = protect