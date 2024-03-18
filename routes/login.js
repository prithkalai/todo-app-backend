const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/User");

const router = express.Router();

// Login an existing User
router.post("/", async (req, res) => {
  // Validate the request
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the user is not registered

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({ message: "Invalid Email or Password" });

  // Verify the password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send({ message: "Invalid Email or Password" });
  }
  // Generate Json Web Token
  const token = user.generateAuthToken();
  // return the token to the client

  return res.send({ message: "Logged in successfully", token: token });
});

function validateLogin(body) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(body);
}

module.exports = router;
