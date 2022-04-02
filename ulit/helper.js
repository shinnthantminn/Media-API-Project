const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  fMsg: (res, msg = "you missing message", result = []) => {
    res.status(200).json({
      con: true,
      msg,
      result,
    });
  },
  encode: (payload) => bcrypt.hashSync(payload),
  compare: (plane, hash) => bcrypt.compareSync(plane, hash),
  token: (payload) =>
    jwt.sign(payload, process.env.KEY, {
      expiresIn: "1h",
    }),
  decode: (payload) => jwt.decode(payload, process.env.KEY),
};
