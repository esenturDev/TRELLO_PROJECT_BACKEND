const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
	const { title } = req.body;
	if (!title || title.length <= 0) {
		return res
			.status(400)
			.send({ message: 'Название доски должно быть минимум 1 символа."' });
	}

	try {
		const board = new Board({ title, userId: req.user._id });
		await board.save();
		res.status(210).send({ message: "", board });
	} catch (error) {
		res.status(500).send({ message: "Ошибка при создании доски." });
	}
});

router.get("/", auth, async (req, res) => {
	try {
		const boards = await Board.find({ userId: req.user._id });
		res.status(200).send({ boards });
	} catch (error) {
		res.status(500).send({ message: "Ошибка при получении досок." });
	}
});

module.exports = router;
