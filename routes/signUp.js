const express = require("express");
const router = express.Router();
const { SignUp, validateSignUp } = require("../models/signUp");
const bcrypt = require("bcrypt");
const _ = require("lodash");
router.post("/", async (req, res) => {
	const { email, password, name } = req.body;
	const { error } = validateSignUp(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let signUp = await SignUp.findOne({ email });
	if (signUp)
		return res
			.status(400)
			.send(`тилеке каршы мындай колдонучу бар экен базада! ${email}`);
	try {
		signUp = new SignUp(_.pick(req.body, ["name", "email", "password"]));
		const salt = await bcrypt.genSalt();
		signUp.password = await bcrypt.hash(signUp.password, salt);
		await signUp.save();
		return res.status(201).send(_.pick(signUp, ["email", "email", "_id"]));
	} catch (error) {
		console.error(error);
		return res.status(500).send(`что то не так! ${error.message}`);
	}
});
module.exports = router;
