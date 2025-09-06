const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user-route");
const authRouter = require("./routes/auth-route")
const eventRouter = require("./routes/event-route")
const errorHandler = require('./middlewares/error-handler')
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/event-ticket/users", userRouter);
app.use("/api/v1/event-ticket/auth", authRouter);
app.use("/api/v1/event-ticket/events",eventRouter)

app.use(errorHandler)
module.exports = app;
