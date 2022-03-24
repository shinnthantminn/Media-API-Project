const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  fMsg: (res, msg = "no massage add in this process", result = []) => {
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
  tokenDecoded: (token) => jwt.decode(token, process.env.KEY),
};
