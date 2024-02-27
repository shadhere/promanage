// Task.js

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  priority: String,
  checklist: [{ text: String, completed: Boolean }],
  dueDate: Date,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
