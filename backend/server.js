const express = require("express");
require("dotenv").config();
const cors = require('cors');
const PORT = process.env.PORT;

//Importing Routers
const gamerRouter = require("./routes/gamer");
const admin = require('./routes/admin');
const authoriseAdmin = require('./routes/authoriseAdmin');

//Initializing connection to the database
const connectDB = require("./config/db");
connectDB();

//Setting express application
const app = express();
app.use(express.json());
app.use(cors());

app.use(gamerRouter);
app.use(admin);
app.use(authoriseAdmin);

app.listen(PORT, () =>
	console.log(`Server running at http://127.0.0.1:${PORT}`),
);
