const express = require("express");
const router = express.Router();
const Card = require("../models/card");

router.post("/", async (req, res) => {
	const { title, description, listId } = req.body;

	if (!title || title.length <= 0)
		return res
			.status(400)
			.send({ message: "Название карточки должно быть минимум 1 символа." });

	if (!listId) return res.status(400).send({ message: "е указан listId." });

	try {
		const card = new Card({ title, description, listId });
		await card.save();
		res.status(201).send({ message: "Успешно" }, card);
	} catch (error) {
		res.status(500).send({ message: "Ошибка при создании карточки." });
	}
});

// router.get('/', async (req, res) => {
//   try {
//     const cards = await Card.find({list})
//   } catch (error) {
    
//   }
// })

module.exports = router;