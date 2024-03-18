const morgan = require("morgan");
const todos = require("../routes/todos");
const login = require("../routes/login");
const users = require("../routes/users");
const cors = require("cors");
const express = require("express");
const error = require("../middleware/error");

module.exports = function (app) {
  // Configure CORS options
  const corsOptions = {
    exposedHeaders: ["x-auth-token"], // Specify which headers to expose
  };

  // Middleware
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(morgan("tiny"));

  // Todos API
  app.use("/api/login", login);
  app.use("/api/users", users);
  app.use("/api/todos", todos);

  // Error Handling
  app.use(error);
};
