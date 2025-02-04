const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
	const { title, colorContainer } = req.body;
	if (!title) {
		return res
			.status(400)
			.send({ message: 'Название доски должно быть минимум 1 символа."' });
	}
	console.log("req.body:", req.body); // Посмотрим, что приходит
	console.log("req.user:", req.user);

	try {
		const board = new Board({ title, userId: req.user._id, colorContainer });
		await board.save();
		res.status(201).send({ message: "Успешно", board });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.send({ message: "Ошибка при создании доски.", error: error.message });
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

router.get("/:id", auth, async (req, res) => {
	const { id } = req.params;
	if (!id)
		return res.status(404).send({ message: "Мындай id деги доска жок!" });
	try {
		const board = await Board.findById(id);
		if (!board)
			return res.status(404).send({ message: "Такой доски не существует!" });
		res.status(200).send(board);
	} catch (error) {
		console.error("Ошибка при получении доски:", error);
		res.status(500).send({ message: "что-то не так!", error: error.message });
	}
});

module.exports = router;
