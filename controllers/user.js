const DB = require("../models/user");
const { fMsg, encode, compare, token } = require("../ulit/helper");
const fs = require("fs");

module.exports = {
  all: async (req, res, next) => {
    const user = await DB.find();
    fMsg(res, "all user from server", user);
  },
  register: async (req, res, next) => {
    req.body.password = encode(req.body.password);
    const user = await new DB(req.body).save();
    fMsg(res, "register complete", user);
  },
  login: async (req, res, next) => {
    const user = await DB.findOne({ email: req.body.email });
    if (user) {
      if (compare(req.body.password, user.password)) {
        const getUser = user.toObject();
        delete getUser.password;
        getUser.token = token(getUser);
        fMsg(res, "Login success", getUser);
      } else next(new Error("Password is not correact"));
    } else next(new Error("no user with that email"));
  },
  get: async (req, res, next) => {
    const user = await DB.findById(req.params.id);
    user
      ? fMsg(res, "single user searching complete", user)
      : next(new Error("no user with that id"));
  },
  patch: async (req, res, next) => {
    const user = await DB.findById(req.params.id);
    if (user) {
      if (req.body.image) {
        fs.unlinkSync(`./upload/User/${user.image}`);
      }
      await DB.findByIdAndUpdate(user._id, req.body);
      const updateUser = await DB.findById(user.id);
      fMsg(res, "single user searching complete", updateUser);
    } else next(new Error("no user with that id"));
  },
  drop: async (req, res, next) => {
    const user = await DB.findById(req.params.id);
    if (user) {
      fs.unlinkSync(`./upload/User/${user.image}`);
      await DB.findByIdAndDelete(user._id);
      const DeleteUser = await DB.find();
      fMsg(res, "delete complete", DeleteUser);
    } else next(new Error("no user with that id"));
  },
};
