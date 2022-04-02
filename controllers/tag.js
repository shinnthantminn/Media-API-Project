const DB = require("../models/tag");
const { fMsg } = require("../ulit/helper");
const fs = require("fs");

module.exports = {
  all: async (req, res, next) => {
    const tag = await DB.find();
    fMsg(res, "all tag from server", tag);
  },
  add: async (req, res, next) => {
    const userId = req.body.user._id;
    delete req.body.user;
    req.body.user = userId;
    await new DB(req.body).save();
    const tag = await DB.find().populate("user", "-password");
    fMsg(res, "tag created complete", tag);
  },
  get: async (req, res, next) => {
    const tag = await DB.findById(req.params.id);
    tag
      ? fMsg(res, "single tag from server", tag)
      : next(new Error("no tags with that id"));
  },
  patch: async (req, res, next) => {
    const tags = await DB.findById(req.params.id);
    if (req.body.image) {
      fs.unlinkSync(`./upload/User/${tags.image}`);
    }
    await DB.findByIdAndUpdate(tags._id, req.body);
    const tagUpdate = await DB.findById(req.params.id);
    fMsg(res, "tags update complete", tagUpdate);
  },
  drop: async (req, res, next) => {
    const tags = await DB.findById(req.params.id);
    fs.unlinkSync(`./upload/User/${tags.image}`);
    await DB.findByIdAndDelete(tags._id);
    const tagUpdate = await DB.find().populate("user", "-password -__v");
    fMsg(res, "tags update complete", tagUpdate);
  },
};
