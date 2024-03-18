const express = require("express");
const app = express();
require("express-async-errors");

// API Routes
require("./startup/routes")(app);

// Database Connection
require("./startup/db")();

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Listening on Port ${PORT}`));
