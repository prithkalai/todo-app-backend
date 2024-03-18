const express = require("express");
const app = express();
require("express-async-errors");

// API Routes
require("./startup/routes")(app);

// Database Connection
require("./startup/db")();

app.listen(3000, console.log("Listening on Port 3000"));
