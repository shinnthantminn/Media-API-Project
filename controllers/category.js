const DB = require("../models/category");
const { fMsg } = require("../ultis/helper");
const fs = require("fs");

module.exports = {
  all: async (req, res, next) => {
    const result = await DB.find();
    fMsg(res, "all category from server", result);
  },

  add: async (req, res, next) => {
    const title = await DB.findOne({ title: req.body.title });
    if (title) {
      next(new Error("title name was remain in our server"));
      return;
    }
    const result = await new DB(req.body).save();
    fMsg(res, "add category complete", result);
  },

  get: async (req, res, next) => {
    const result = await DB.findById(req.params.id);
    result
      ? fMsg(res, "this category?", result)
      : next(new Error("no category with that id"));
  },

  patch: async (req, res, next) => {
    let cate = await DB.findById(req.params.id);
    if (cate) {
      if (req.body.image) {
        fs.unlinkSync(`./upload/${cate.image}`);
      }
      await DB.findByIdAndUpdate(cate._id, req.body);
      const newCate = await DB.find();
      fMsg(res, "update complete", newCate);
    } else next(new Error("no category with that id"));
  },
  drop: async (req, res, next) => {
    const cate = await DB.findById(req.params.id);
    if (cate) {
      fs.unlinkSync(`./upload/${cate.image}`);
      await DB.findByIdAndDelete(cate._id);
      const deleteCate = await DB.find();
      fMsg(res, "delete category complete", deleteCate);
    } else next(new Error("no category with that id"));
  },
};
