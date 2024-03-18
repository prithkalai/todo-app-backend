const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nameRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: function (v) {
        return nameRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid name !`,
    },
    required: true,
    minLength: 4,
    maxLength: 50,
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return emailRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid email !`,
    },
    required: true,
  },

  password: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 1024,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      isAdmin: this.isAdmin,
      name: this.name,
      email: this.email,
      _id: this._id,
    },
    config.get("JWTPRIVATEKEY")
  );
};

const User = mongoose.model("user", userSchema);

function validateUser(body) {
  const schema = Joi.object({
    name: Joi.string().required().regex(nameRegex).min(4).max(50),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4).max(1024),
  });

  return schema.validate(body);
}

module.exports.User = User;
module.exports.userSchema = userSchema;
module.exports.validate = validateUser;
