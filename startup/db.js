const mongoose = require("mongoose");
const { logger } = require("./logger");
const config = require("config");

module.exports = function () {
  const DB_AUTH = config.get("DB_AUTH");
  const DB_USER = config.get("DB_USER");
  // Connect to the database
  mongoose
    // .connect("mongodb://localhost/todo-app")
    .connect(
      `mongodb+srv://${DB_USER}:${DB_AUTH}@todo-app-cluster.8iqtdt8.mongodb.net/`
    )
    .then(() => logger.info("MongoDB was connected successfully..."));
};
