const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
	const token = req.header("Authorization");
	if (!token)
		return res
			.status(401)
			.send({ message: "Доступ запрещен. Токен не найден." });

	try {
		const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
		req.user = decoded;
		next();
	} catch (error) {
		res.status(400).send({ message: "Недействительный токен." });
	}
};
