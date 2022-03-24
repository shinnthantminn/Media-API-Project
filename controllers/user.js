const DB = require("../models/user");
const { fMsg, encode, compare, token } = require("../ultis/helper");
const fs = require("fs");

module.exports = {
  all: async (req, res, next) => {
    const user = await DB.find();
    fMsg(res, "all User From Server", user);
  },
  register: async (req, res, next) => {
    const name = await DB.findOne({ name: req.body.name });
    const email = await DB.findOne({ email: req.body.email });
    if (name) {
      next(new Error("This username is existence in our server"));
      return;
    } else if (email) {
      next(new Error("This username is existence in our server"));
    }

    req.body.password = encode(req.body.password);
    const user = await new DB(req.body).save();
    fMsg(res, "register complete", user);
  },
  login: async (req, res, next) => {
    const user = await DB.findOne({ email: req.body.email }).select("-__v");
    if (user) {
      if (compare(req.body.password, user.password)) {
        const getUser = user.toObject();
        delete getUser.password;
        getUser.token = token(getUser);
        fMsg(res, "login Success", getUser);
      } else next(new Error("password is not correct"));
    } else next(new Error("no user with that email"));
  },
  get: async (req, res, next) => {
    const user = await DB.findById(req.params.id);
    user
      ? fMsg(res, "this user is correct?", user)
      : next(new Error("no user with that id"));
  },
  patch: async (req, res, next) => {
    const user = await DB.findById(req.params.id);
    if (user) {
      if (req.body.image) {
        fs.unlinkSync(`./upload/${user.image}`);
      }
      await DB.findByIdAndUpdate(user._id, req.body);
      const NewUser = await DB.find();
      fMsg(res, "update user correctly", NewUser);
    } else next(new Error("no user with that id"));
  },
  drop: async (req, res, next) => {
    const user = await DB.findById(req.params.id);
    if (user) {
      fs.unlinkSync(`./upload/${user.image}`);
      await DB.findByIdAndDelete(user._id);
      fMsg(res, "delete user account is complete");
    } else next(new Error("no user with user"));
  },
};
