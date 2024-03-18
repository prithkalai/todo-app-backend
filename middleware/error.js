const { logger } = require("../startup/logger");

module.exports = function (err, req, res, next) {
  // Error handling logic
  // Log the error using winston
  logger.log("error", "Internal Server Error", err);
  res.status(500).send({ message: "Internal Server Error..." });
};
