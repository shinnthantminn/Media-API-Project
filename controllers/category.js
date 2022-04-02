const DB = require("../models/category");
const { fMsg } = require("../ulit/helper");

module.exports = {
  all: async (req, res, next) => {
    const category = await DB.find().populate("user", "-password -email -__v");
    fMsg(res, "all category from server", category);
  },
  add: async (req, res, next) => {
    const userId = req.body.user._id;
    delete req.body.user;
    req.body.user = userId;
    const newCategory = await new DB(req.body).save();
    fMsg(res, "add new category complete", newCategory);
  },
  get: async (req, res, next) => {
    const getCategory = await DB.findById(req.params.id).populate(
      "user",
      "-password -email -__v"
    );
    if (getCategory) fMsg(res, "single category", getCategory);
    else next(new Error("no category with that id"));
  },
  patch: async (req, res, next) => {
    const getCategory = await DB.findById(req.params.id);
    if (getCategory) {
      await DB.findByIdAndUpdate(getCategory._id, req.body);
      const newCategory = await DB.findById(req.params.id);
      fMsg(res, "patch category complete", newCategory);
    } else next(new Error("no category with that id"));
  },
  drop: async (req, res, next) => {
    const getCategory = await DB.findById(req.params.id);
    if (getCategory) {
      await DB.findByIdAndDelete(getCategory._id);
      const allCategory = await DB.find();
      fMsg(res, "delete category from server", allCategory);
    } else next(new Error("no category with that id"));
  },
};
