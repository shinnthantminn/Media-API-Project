require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

//middleware for jsonBody
app.use(express.json());

//middleware for file Upload
app.use(fileUpload());

//for Database connection
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

//router and route middleware
const categoryRouter = require("./routers/category");
const userRouter = require("./routers/user");
const postRouter = require("./routers/post");

app.use("/category", categoryRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);

//fallback Route
app.get("*", (req, res, next) => {
  res.status(200).json({
    msg: "this route is not available in our server",
  });
});

//error handler
app.use((err, req, res, next) => {
  err.status = err.status || 200;
  res.status(err.status).json({
    con: false,
    msg: err.message,
  });
});

app.listen(process.env.PORT);
