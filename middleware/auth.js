// const jwt = require("jsonwebtoken");
// const config = require("config");

// module.exports = function (req, res, next) {
// 	console.log("Authorization Header:", req.header("Authorization"));

// 	const token = req.header("Authorization");
// 	console.log("req.user:", req.user);

// 	if (!token)
// 		return res
// 			.status(401)
// 			.send({ message: "Доступ запрещен. Токен не найден." });
// 	const pureToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
// 	try {
// 		const decoded = jwt.verify(pureToken, config.get("jwtPrivateKey"));
// 		console.log("req.user после декодирования:", req.user);

// 		req.user = decoded;
// 		next();
// 	} catch (error) {
// 		res.status(400).send({ message: "Недействительный токен." });
// 	}
// };

const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
	// console.log("Authorization Header:", req.header("Authorization"));

	const token = req.header("Authorization");
	console.log(token, 'token');
	
	if (!token) {
		return res
			.status(401)
			.send({ message: "Доступ запрещен. Токен не найден." });
	}


	// Убираем "Bearer "
	const pureToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

	try {
		const decoded = jwt.verify(pureToken, config.get("jwtPrivateKey"));
		req.user = decoded; // <-- Сначала присваиваем req.user
		// console.log("req.user после декодирования:", req.user);

		next();
	} catch (error) {
		console.error("Ошибка верификации токена:", error.message);
		res.status(400).send({ message: "Недействительный токен." });
	}
};
