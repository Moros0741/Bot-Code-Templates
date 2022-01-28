// Example User schema file

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	userId: { type: String, unique: true, require: true },
	isActive: { type: Boolean, default: true },
	isBlacklisted: { type: Boolean, default: false},
	balance: { type: Number, default: 0 },
	commands: [{
		name: { type: String },
		isBlacklisted: { type: Boolean, default: false },
		usedTimestamp: { type: Number },
	}]
});

const model = new mongoose.model("users", userSchema);

module.exports = model;