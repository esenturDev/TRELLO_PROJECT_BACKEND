const express = require("express");
const router = express.Router();
const List = require("../models/list");

router.post("/", async (req, res) => {
	const { title, boardId } = req.body;

	if (!title || title.length <= 0)
		return res
			.status(400)
			.send({ message: "Название списка должно быть минимум 1 символа." });

	if (!boardId) return res.status(400).send({ message: "Не указан boardId." });

	try {
		const list = new List({ title, boardId });
		await list.save();
		res.status(201).send({ message: "Успешно", list });
	} catch (error) {
		res.status(500).send({ message: "Ошибка при создании списка." });
	}
});

router.get("/", async (req, res) => {
	try {
		const lists = await List.find();
		res.status(200).send(lists);
	} catch (error) {
		res.status(500).send({ message: "Ошибка при получении list." });
	}
});

module.exports = router;
