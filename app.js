const express = require("express");
const { tasksRouter } = require("./routes/tasks");
const notFoundHandler = require("./middlewares/notFoundHandler");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const { userRouter } = require("./routes/users");

const app = express();

app.use(express.json());

app.use("/tasks", tasksRouter);
app.use("/users", userRouter)

app.use(notFoundHandler);

app.use(globalErrorHandler);

module.exports = app;
