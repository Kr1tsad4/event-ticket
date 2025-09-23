const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user-route");
const authRouter = require("./routes/auth-route");
const eventRouter = require("./routes/event-route");
const errorHandler = require("./middlewares/error-handler");
const app = express();
app.use(
  cors({
    origin: process.env.ALLOW_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/event-ticket/users", userRouter);
app.use("/api/v1/event-ticket/auth", authRouter);
app.use("/api/v1/event-ticket/events", eventRouter);

app.use(errorHandler);
module.exports = app;
