const DB = require("../models/user");
const { decode } = require("../ulit/helper");
const fs = require("fs");
const { fMsg } = require("./helper");

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = schema.validate(req.body);
      if (result.error) {
        next(new Error(result.error.details[0].message));
      } else next();
    };
  },
  validateParam: (schema, name) => {
    return (req, res, next) => {
      const obj = {};
      obj[name] = req.params[name];
      const result = schema.validate(obj);
      if (result.error) {
        next(new Error(result.error.details[0].message));
      } else next();
    };
  },
  validateUnique: (db, ...array) => {
    return async (req, res, next) => {
      const num = [];
      const check = await db.find();
      if (check.length === 0) {
        next();
      } else {
        array.map(async (i) => {
          const finder = {};
          finder[i] = req.body[i];
          const result = await db.findOne(finder);
          num.push(i);
          if (result) {
            next(new Error(`this ${i} was existing in our server`));
          }
          if (array.length === num.length) {
            next();
          }
        });
      }
    };
  },
  validateToken: async (req, res, next) => {
    const auth = req.headers.authorization;
    if (auth) {
      const token = auth.split(" ")[1];
      const user = decode(token);
      if (user) {
        const result = await DB.findById(user._id);
        req.body.user = result;
        next();
      } else next(new Error("Tokenization Error"));
    } else next(new Error("Tokenization Error"));
  },
  validatePermission: (db) => {
    return async (req, res, next) => {
      const post = await db.findById(req.params.id);
      if (post) {
        if (post.user.toString() === req.body.user._id.toString()) {
          next();
        } else next(new Error("you have no permission"));
      } else next(new Error("no Post With that id"));
    };
  },
};
