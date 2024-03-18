const express = require("express");
const { validate, Todos } = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

// Get Todos : GET
router.get("/", auth, async (req, res) => {
  const todos = await Todos.find({ userId: req.user._id });
  if (!todos) return res.status(200).send({ data: [] });
  return res.send({ data: todos });
});

// Create a Todo : POST
router.post("/", auth, async (req, res) => {
  const valRes = validate(req.body);

  if (valRes.error) {
    return res.status(400).send({ message: validate.error.details[0].message });
  }

  const todo = new Todos({
    data: req.body.data,
    userId: req.user._id,
  });
  const result = await todo.save();
  return res.send(result);
});

// Update a Todo: PUT
router.put("/:id", auth, async (req, res) => {
  const valRes = validate(req.body);

  if (valRes.error) {
    return res.status(400).send({ message: valRes.error.details[0].message });
  }

  const todo = await Todos.findByIdAndUpdate(
    req.params.id,
    {
      $set: { data: req.body.data },
    },
    { new: true }
  );
  if (!todo)
    return res.status(404).send({ message: "Requested Todo not found..." });
  return res.send({ data: todo });
});

// Delete a Todo : DELETE
router.delete("/:id", auth, async (req, res) => {
  const result = await Todos.findByIdAndDelete({
    _id: req.params.id.toString(),
  });
  if (!result)
    return res.status(404).send({ message: "Requested Todo not found..." });
  return res.send({ data: result });
});

module.exports = router;
