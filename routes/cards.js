const express = require("express");
const router = express.Router();
const Card = require("../models/card");
const auth = require("../middleware/auth");
router.post("/", auth, async (req, res) => {
	const { title, description, listId, boardId } = req.body;

	if (!title || title.length <= 0)
		return res
			.status(400)
			.send({ message: "Название карточки должно быть минимум 1 символа." });

	if (!listId) return res.status(400).send({ message: "е указан listId." });
	if (!boardId) return res.status(400).send({ message: "Не указан boardId." });

	try {
		const card = new Card({
			title,
			description,
			listId,
			boardId,
			userId: req.user._id,
		});
		await card.save();
		res.status(201).send({ message: "Успешно", card });
	} catch (error) {
		res.status(500).send({ message: "Ошибка при создании карточки." });
	}
});

router.get("/", auth, async (req, res) => {
	try {
		const { listId } = req.query;
		const filter = { userId: req.user._id };
		if(listId) {
			filter.listId = listId;
		}
		const cards = await Card.find(filter);
		res.status(200).send(cards);
	} catch (error) {
		res.status(500).send({ message: "Ошибка при получении карточек.4" });
	}
});

module.exports = router;
