const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { errorMiddleware, notFound } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT;

//Importing Routers
const userRouter = require("./routes/user");
const deviceRouter = require("./routes/device");
const adminRouter = require("./routes/admin");
const authoriseAdmin = require("./routes/authoriseAdmin");

//Initializing connection to the database
const connectDB = require("./config/db");
connectDB();

//Setting express application
const app = express();
app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(deviceRouter);
app.use(adminRouter);
app.use(authoriseAdmin);

//Disabled to get accurate errors

// app.use(errorMiddleware);
// app.use(notFound);

app.listen(PORT, () =>
	console.log(`Server running at http://127.0.0.1:${PORT}`),
);
