const DB = require("../models/post");
const commentsDB = require("../models/comment");
const { fMsg } = require("../ulit/helper");
const fs = require("fs");

module.exports = {
  all: async (req, res, next) => {
    const post = await DB.find().populate(
      "user category tag",
      "-password -__v"
    );
    fMsg(res, "all post from server", post);
  },
  add: async (req, res, next) => {
    const userId = req.body.user._id;
    delete req.body.user;
    req.body.user = userId;
    await new DB(req.body).save();
    const post = await DB.find().populate(
      "user category tag",
      "-password -__v"
    );
    fMsg(res, "add post from server", post);
  },
  get: async (req, res, next) => {
    const commentDb = await commentsDB
      .find({ post: req.params.id })
      .populate("user", "-password -email");
    let post = await DB.findById(req.params.id).populate(
      "user category",
      "-password -__v"
    );
    post = post.toObject();
    post.comment = commentDb;
    if (post) fMsg(res, "single post get", post);
    else next(new Error("no post with that id"));
  },
  byCategory: async (req, res, next) => {
    const post = await DB.find({ category: req.params.id }).populate(
      "user category",
      "-password -__v"
    );
    if (post.length === 0) next(new Error("no post with that category"));
    else fMsg(res, "get post by Category", post);
  },
  byTag: async (req, res, next) => {
    const post = await DB.find({ tag: req.params.id }).populate(
      "user category tag",
      "-password -__v"
    );
    if (post.length === 0) next(new Error("no post with that category"));
    else fMsg(res, "get post by tag", post);
  },
  byUser: async (req, res, next) => {
    const post = await DB.find({ user: req.params.id }).populate(
      "user category",
      "-password -__v"
    );
    console.log();
    if (post.length === 0) next(new Error("no post with that user"));
    else fMsg(res, "get post by user", post);
  },
  patch: async (req, res, next) => {
    const post = await DB.findById(req.params.id);
    if (req.body.image) {
      fs.unlinkSync(`./upload/User/${post.image}`);
    }
    await DB.findByIdAndUpdate(req.params.id, req.body);
    const newPost = await DB.find().populate("user category", "-password -__v");
    fMsg(res, "post update complete", newPost);
  },
  drop: async (req, res, next) => {
    const post = await DB.findById(req.params.id);
    fs.unlinkSync(`./upload/User/${post.image}`);
    await DB.findByIdAndDelete(req.params.id);
    const DeletePost = await DB.find();
    fMsg(res, "delete post complete", DeletePost);
  },
  paginate: async (req, res, next) => {
    const num = req.params.page === 1 ? 0 : req.params.page - 1;
    const limit = Number(process.env.POST_LIMIT);
    const pageStartCount = num * limit;
    if (pageStartCount !== -limit) {
      const post = await DB.find().skip(pageStartCount).limit(limit);
      post.length !== 0
        ? fMsg(res, "pagination complete", post)
        : next(new Error("404 error"));
    } else next(new Error("no post with that page"));
  },
  toggle: async (req, res, next) => {
    const post = await DB.findById(req.params.id);
    if (post) {
      if (req.params.page == 1) post.like = post.like + 1;
      else {
        if (post.like === 0) post.like = 0;
        else post.like = post.like - 1;
      }
      await DB.findByIdAndUpdate(post._id, post);
      const updatePost = await DB.findById(req.params.id);
      fMsg(res, "like toggle complete", updatePost);
    } else next(new Error("no post with that id"));
  },
};
