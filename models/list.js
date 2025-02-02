const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	boardId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Board",
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'SignUp',
		required: true,
	}
});

const List = mongoose.model('List', listSchema);
module.exports = List;
