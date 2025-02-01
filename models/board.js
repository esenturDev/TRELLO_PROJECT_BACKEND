const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "SignUp",
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	colorContainer: {
		type: String,
		required: true,
	}
});

const Board = mongoose.model("Board", boardSchema);
module.exports = Board;
