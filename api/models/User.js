const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Username is required"],
		minlength: 6,
		unique: true,
	},
	password: {
		type: String,
		minlength: 8,
		required: [true, "Password is required"],
		select: false,
	}
});

//Hash password
UserSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

//Match user's hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
