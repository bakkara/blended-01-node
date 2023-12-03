const { Schema, model } = require("mongoose");

const schema = Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = model("task", schema);

module.exports = Task;
