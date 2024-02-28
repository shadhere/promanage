const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const User = require("../models/User");

module.exports = function (io) {
  // Create a new task
  router.post("/task", async (req, res) => {
    try {
      const userId = req.user._id;

      const newTask = new Task({
        ...req.body,
        createdBy: userId,
      });

      await newTask.save();

      // Emit the 'newTaskAdded' event to the connected clients
      io.emit("taskUpdated", newTask);
      res.status(201).json(newTask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.get("/tasks", async (req, res) => {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);

      const tasks = await Task.find({ createdBy: userId }).populate(
        "createdBy",
        "name"
      );
      // io.emit("tasksUpdated", tasks);
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return router;
};
