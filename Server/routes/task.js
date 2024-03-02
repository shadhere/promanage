const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const User = require("../models/User");

module.exports = function () {
  // Create a new task
  router.post("/task", async (req, res) => {
    try {
      const userId = req.user._id;

      const newTask = new Task({
        ...req.body,
        createdBy: userId,
      });

      await newTask.save();
      console.log(newTask);

      res.status(201).json(newTask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.get("/tasks", async (req, res) => {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);

      // Fetch tasks based on timeframe query parameter
      let tasks;
      const { timeframe } = req.query;
      if (timeframe === "today") {
        tasks = await Task.find({
          createdBy: userId,
          createdAt: {
            $gte: new Date().setHours(0, 0, 0, 0),
            $lte: new Date().setHours(23, 59, 59, 999),
          },
        }).populate("createdBy", "name");
      } else if (timeframe === "thisWeek") {
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date();
        endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the week
        endOfWeek.setHours(23, 59, 59, 999);

        tasks = await Task.find({
          createdBy: userId,
          createdAt: { $gte: startOfWeek, $lte: endOfWeek },
        }).populate("createdBy", "name");
      } else if (timeframe === "thisMonth") {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const endOfMonth = new Date();
        endOfMonth.setMonth(endOfMonth.getMonth() + 1); // Next month
        endOfMonth.setDate(0); // Last day of the current month
        endOfMonth.setHours(23, 59, 59, 999);

        tasks = await Task.find({
          createdBy: userId,
          createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        }).populate("createdBy", "name");
      } else {
        // Default: fetch all tasks
        tasks = await Task.find({ createdBy: userId }).populate(
          "createdBy",
          "name"
        );
      }

      // Group tasks by status
      const tasksByStatus = {};
      tasks.forEach((task) => {
        if (!tasksByStatus[task.status]) {
          tasksByStatus[task.status] = [];
        }
        tasksByStatus[task.status].push(task);
      });

      // Response data containing tasks grouped by status
      const responseData = {
        tasksByStatus: tasksByStatus,
      };

      res.json(responseData);
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

      // Send the updated task object as the response
      res.json(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  // Edit task
  router.put("/task/:taskId", async (req, res) => {
    try {
      const { taskId } = req.params;
      const { updatedTaskData } = req.body;

      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        updatedTaskData,
        { new: true }
      );

      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.json(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Delete task
  router.delete("/tasks/:taskId", async (req, res) => {
    try {
      const { taskId } = req.params;

      const deletedTask = await Task.findByIdAndDelete(taskId);

      if (!deletedTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.get("/tasks/:taskId", async (req, res) => {
    try {
      const { taskId } = req.params; // Correctly access taskId from request parameters
      const task = await Task.findById(taskId);
      if (!task) {
        // If task not found, return 404 status with an informative error message
        return res
          .status(404)
          .json({ error: "Task not found with the provided ID" });
      }
      res.json(task);
    } catch (error) {
      // Internal server error occurred
      console.error("Error getting task:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return router;
};
