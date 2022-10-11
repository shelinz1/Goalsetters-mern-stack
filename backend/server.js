const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/database");

const goalRouter = require("./routes/goalRoutes");
const userRouter = require("./routes/userRoutes");

dotenv.config();

const { errorHandler } = require("./middleware/errorMiddleware");

const port = process.env.PORT || 8000;

connectDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRouter);
app.use("/api/users", userRouter);

app.use(errorHandler);
app.listen(port, console.log(`server started on ${port}`));
