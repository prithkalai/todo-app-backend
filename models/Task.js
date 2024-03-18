const Joi = require("joi");
const mongoose = require("mongoose");

// Create data schema
const todoSchema = new mongoose.Schema({
  data: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Create model
const Todos = mongoose.model("todos", todoSchema);

// Request Validation
function validateTodos(reqBody) {
  const todoSchema = Joi.object({
    data: Joi.string().min(3).required(),
  });

  return todoSchema.validate(reqBody);
}

function validateCompleteTodos(reqBody) {
  const todoSchema = Joi.object({
    completed: Joi.boolean().required(),
  });

  return todoSchema.validate(reqBody);
}

module.exports.Todos = Todos;
module.exports.validate = validateTodos;
module.exports.validateCompleted = validateCompleteTodos;
