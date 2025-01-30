// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const cors = require("cors");
// const signUpRoute = require("./routes/signUp");
// const signInRoute = require("./routes/signIn");
// const config = require("config");
// require("dotenv").config();

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin) {
//       return callback(null, true); // Разрешаем запросы без origin (например, для локальных запросов)
//     }
//     callback(null, true); // Разрешаем все запросы с origin
//   }
// };

// app.use(cors(corsOptions));

// if (!config.get("jwtPrivateKey")) {
// 	console.error("FATAL ERROR: jwtPrivateKey не задан в конфигурации.");
// 	process.exit(1);
// }

// const urlIsFrond = "http://localhost:3000";
// const resultIsCors = cors({
// 	origin: urlIsFrond,
// 	methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
// });

// const urlIsMongoDB = "mongodb://localhost/trelloProject";
// mongoose
// 	.connect(urlIsMongoDB)
// 	.then(() => console.log("MongoDB подключён успешно!"))
// 	.catch((err) => console.log("Ошибка подключения к MongoDB:", err));
// app.use(express.json());
// app.use(resultIsCors());

// app.use("/auth/signUp", signUpRoute);
// app.use("/auth/signIn", signInRoute);

// const port = process.env.PORT || 7000;
// app.listen(port, () => console.log(`Сервер запущен на порту ${port}...`));

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const signUpRoute = require("./routes/signUp");
const signInRoute = require("./routes/signIn");
const config = require("config");
require("dotenv").config();

const corsOptions = {
	origin: function (origin, callback) {
		if (!origin) {
			return callback(null, true); // Разрешаем запросы без origin (например, для локальных запросов)
		}
		callback(null, true); // Разрешаем все запросы с origin
	},
};

app.use(cors(corsOptions)); // Убираем дублирование мидлваров CORS

if (!config.get("jwtPrivateKey")) {
	console.error("FATAL ERROR: jwtPrivateKey не задан в конфигурации.");
	process.exit(1);
}

const urlIsMongoDB = "mongodb://localhost/trelloProject";
mongoose
	.connect(urlIsMongoDB)
	.then(() => console.log("MongoDB подключён успешно!"))
	.catch((err) => console.log("Ошибка подключения к MongoDB:", err));

app.use(express.json());
app.use("/auth/signUp", signUpRoute);
app.use("/auth/signIn", signInRoute);

const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`Сервер запущен на порту ${port}...`));
