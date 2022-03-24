const DB = require("../models/user");
const { tokenDecoded } = require("./helper");

module.exports = {
  validBody: (schema) => {
    return (req, res, next) => {
      let result = schema.validate(req.body);
      if (result.error) {
        console.log(next);
        next(new Error(result.error.details[0].message));
      } else next();
    };
  },
  validParam: (schema, name) => {
    return (req, res, next) => {
      let obj = {};
      obj[name] = req.params[name];
      const result = schema.validate(obj);
      if (result.error) {
        next(new Error(result.error.details[0].message));
      } else next();
    };
  },
  validToken: async (req, res, next) => {
    let auth = req.headers.authorization;
    if (auth) {
      let token = auth.split(" ")[1];
      const user = tokenDecoded(token);
      const result = await DB.findById(user._id).select("-__v");
      req.body.user = result;
      next();
    } else next(new Error("Tokenization Error"));
  },
};
