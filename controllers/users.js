const User = require('../models/User')
const asyncHandler = require("../middleware/async");

exports.getUsers = asyncHandler(async (req, res, next) => {
   const users = await User.find().sort('-totalBounties');
   res.status(200).json({
      success: true,
      count: users.length,
      data: users
   })
});
