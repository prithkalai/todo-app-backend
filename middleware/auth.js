const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).send("Access Denied, No Token Provided");
  }

  try {
    const decoded = jwt.verify(token, config.get("JWTPRIVATEKEY"));
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).send("Invalid Token...");
  }
};
