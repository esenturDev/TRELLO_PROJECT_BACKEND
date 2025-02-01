const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: String,
	listId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "List",
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
	},
	boardId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Board',
		required: true,
	}
});

const Card = mongoose.model("Card", cardSchema);
module.exports = Card;