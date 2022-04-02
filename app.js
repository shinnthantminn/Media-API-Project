//for .env file
require("dotenv").config();

const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const path = require("path");

//for database connection
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

app.use("/upload/User", express.static(path.join(__dirname, "/upload/User")));

//for json Body middleware
app.use(express.json());
//for multipart file middleware
app.use(fileUpload());

//router
const categoryRouter = require("./routers/category");
const userRouter = require("./routers/user");
const postRouter = require("./routers/post");
const tagRouter = require("./routers/tag");
const commentRouter = require("./routers/comment");

app.use("/category", categoryRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/tags", tagRouter);
app.use("/comment", commentRouter);

//fallback route
app.get("*", (req, res, next) => {
  res.status(200).json({
    msg: "this route path is not available in our server",
  });
});

//error catch middleware
app.use((err, req, res, next) => {
  err.status = err.status || 200;
  res.status(err.status).json({
    con: false,
    msg: err.message,
  });
});

//port listen
app.listen(process.env.PORT, () => {
  console.log(`i am running from port ${process.env.PORT}`);
});
