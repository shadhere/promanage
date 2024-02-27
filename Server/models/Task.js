// Task.js

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  priority: String,
  checklist: [{ text: String, completed: Boolean }],
  dueDate: Date,
  status: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model, adjust this accordingly
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
