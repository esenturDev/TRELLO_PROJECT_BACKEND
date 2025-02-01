const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
	const token = req.header("Authorization");
	if (!token)
		return res
			.status(401)
			.send({ message: "Доступ запрещен. Токен не найден." });
			const pureToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
	try {
		const decoded = jwt.verify(pureToken, config.get("jwtPrivateKey"));
		req.user = decoded;
		next();
	} catch (error) {
		res.status(400).send({ message: "Недействительный токен." });
	}
};
