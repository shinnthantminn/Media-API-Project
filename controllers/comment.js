const DB = require("../models/comment");
const { fMsg } = require("../ulit/helper");

module.exports = {
  add: async (req, res, next) => {
    const UserId = req.body.user._id;
    delete req.body.user;
    req.body.user = UserId;
    const newComment = await new DB(req.body).save();
    fMsg(res, "Comment Added", newComment);
  },
  getByPost: async (req, res, next) => {
    const result = await DB.find({ post: req.params.id }).populate(
      "user post",
      "-password -__v "
    );
    console.log(result);
    result.length !== 0
      ? fMsg(res, "get by Post Id", result)
      : next(new Error("no comment with that post"));
  },
  drop: async (req, res, next) => {
    await DB.findByIdAndDelete(req.params.id);
    fMsg(res, "comment delete complete");
  },
  patch: async (req, res, next) => {
    await DB.findByIdAndUpdate(req.params.id, req.body);
    const updateComment = await DB.findById(req.params.id);
    fMsg(res, "comment update complete", updateComment);
  },
};
