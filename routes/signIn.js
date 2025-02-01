const express = require("express");
const router = express.Router();
const { SignUp } = require("../models/signUp");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await SignUp.findOne({ email });
		if (!user)
			return res.status(400).send({ message: "Неверный email или пароль." });

		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword)
			return res.status(400).send({ message: "Неверный email или пароль." });

		const token = user.generateAuthToken();
		res.status(201).send({ token, message: "Успешно" });
	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: "Ошибка сервера." });
	}
});

module.exports = router;
