// taskRoutes.js

const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Create a new task
router.post("/task", async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add other routes for updating, deleting, fetching tasks, etc.

module.exports = router;
