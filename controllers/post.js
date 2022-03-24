const DB = require("../models/post");
const { fMsg } = require("../ultis/helper");
const fs = require("fs");

module.exports = {
  all: async (req, res, next) => {
    const post = await DB.find().populate("user category", "-__v");
    fMsg(res, "all Post from server", post);
  },
  add: async (req, res, next) => {
    const userId = req.body.user._id;
    delete req.body.user;
    req.body.user = userId;
    await new DB(req.body).save();
    const allPost = await DB.find().populate("user category", "-__v");
    fMsg(res, "add Post Complete", allPost);
  },
  get: async (req, res, next) => {
    const post = await DB.findById(req.params.id).populate(
      "user category",
      "-__v"
    );
    post
      ? fMsg(res, "this Post is correct?", post)
      : next(new Error("no Post with that id"));
  },
  getByCategory: async (req, res, next) => {
    const post = await DB.find({ category: req.params.category }).populate(
      "user category",
      "-__v"
    );
    post
      ? fMsg(res, "this post was by category", post)
      : next(new Error("no post with that category"));
  },
  getByUserId: async (req, res, next) => {
    const post = await DB.find({ user: req.params.id }).populate(
      "user category",
      "-__v"
    );
    post
      ? fMsg(res, "this post was by user", post)
      : next(new Error("no post with that user"));
  },
  patch: async (req, res, next) => {
    const post = await DB.findById(req.params.id);
    if (post) {
      if (post.user.toString() === req.body.user._id.toString()) {
        await DB.findByIdAndUpdate(post._id, req.body);
        fs.unlinkSync(`./upload/${post.image}`);
        const allPost = await DB.find().populate("user category", "-__v");
        fMsg(res, "update Post Complete", allPost);
      } else
        next(
          new Error(
            "you are not allow to edit this post because your are not this post owner"
          )
        );
    } else next(new Error("no post with that id"));
  },
  drop: async (req, res, next) => {
    const post = await DB.findById(req.params.id);
    console.log(post);
    if (post) {
      if (post.user.toString() === req.body.user._id.toString()) {
        await DB.findByIdAndDelete(post._id);
        fs.unlinkSync(`./upload/${post.image}`);
        const allPost = await DB.find().populate("user category", "-__v");
        fMsg(res, "complete delete post to server", allPost);
      } else
        next(
          new Error(
            "you are not allow to edit this post because your are not this post owner"
          )
        );
    } else next(new Error("no post with that id"));
  },
};
