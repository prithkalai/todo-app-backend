const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validate, User } = require("../models/User");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const config = require("config");
const router = express.Router();

// Get Current Info about logged in user
router.get("/me", auth, async (req, res) => {
  return res.send(_.pick(req.user, ["name", "email", "id"]));
});

// Register a new User
router.post("/", async (req, res) => {
  // Validate Req Body
  const { error } = validate(req.body);

  if (error) return res.status(400).send({ message: error.details[0].message });

  // Check if the user is already registered
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send({ message: "User is already registered..." });

  // Create the new User

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  // Hash the Password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  // Generate json web token
  const token = user.generateAuthToken();

  await user.save();

  return res.send({
    data: _.pick(user, ["_id", "name", "email"]),
    token: token,
  });
});

router.get("/", auth, admin, async (req, res) => {
  const users = await User.find();
  return res.send({ data: users });
});

module.exports = router;
