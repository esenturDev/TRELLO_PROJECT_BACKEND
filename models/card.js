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
		default: Date.now(),
	},
});

const Card = mongoose.model("Card", cardSchema);
module.exports = Card;