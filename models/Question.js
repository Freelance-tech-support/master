const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: true,
   },
   completed: {
      type: Boolean,
      default: false
   },
   createdAt: {
		type: Number,
		default: Date.now,
	},
});

module.exports = mongoose.model("Question", QuestionSchema);