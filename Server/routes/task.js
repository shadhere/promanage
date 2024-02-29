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
      io.emit("tasksUpdated", tasks);
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.put("/tasks/:taskId", async (req, res) => {
    try {
      const { taskId } = req.params; // Correctly access taskId from request parameters
      const { newStatus } = req.body; // Extract newStatus from the request body

      // Update the task's status in the database
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { status: newStatus },
        { new: true }
      );

      // Check if the task exists and was successfully updated
      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      // Emit event to notify clients about the updated task with new status
      io.emit("taskStatusUpdated", updatedTask);

      // Send the updated task object as the response
      res.json(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return router;
};
