const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const { errorMiddleware, notFound } = require("./middleware/errorMiddleware");
const gamerRouter = require("./routes/gamer");
const PORT = process.env.PORT;

//Initializing connection to the database
connectDB();

const app = express();

app.get("/", (req, res) => {
	res.json({ message: "MJDFosjdJ" });
});

app.use(express.json());
app.use(gamerRouter);

app.use(errorMiddleware);
app.use(notFound);

app.listen(PORT, () =>
	console.log(`Server running at http://127.0.0.1:${PORT}`),
);
