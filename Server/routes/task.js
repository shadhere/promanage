// taskRoutes.js

const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const User = require("../models/User"); // Require the User model

// Create a new task
router.post("/task", async (req, res) => {
  try {
    // Extract the logged-in user's ID from the request
    const userId = req.user._id; // Modify this according to your authentication setup

    // Create a new task with the provided data
    const newTask = new Task({
      ...req.body,
      createdBy: userId, // Associate the task with the logged-in user
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/tasks", async (req, res) => {
  try {
    // Extract the logged-in user's ID from the request
    const userId = req.user._id; // Modify this according to your authentication setup
    const user = await User.findById(userId);

    // Query the database for tasks associated with the user
    const tasks = await Task.find({ createdBy: userId }).populate(
      "createdBy",
      "name"
    );
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});
// Add other routes for updating, deleting, fetching tasks, etc.

module.exports = router;
