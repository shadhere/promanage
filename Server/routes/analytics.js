const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.get("/analytics", async (req, res) => {
  try {
    // Ensure that req.user.id exists
    if (!req.user || !req.user.id) {
      return res.status(400).send("User ID not provided in request.");
    }

    // Get the current user ID from the request object
    const userId = req.user.id;

    // Find tasks belonging to the current user
    const tasks = await Task.find({ createdBy: userId });

    let backlogTasks = 0;
    let todoTasks = 0;
    let inProgressTasks = 0;
    let completedTasks = 0;
    let lowPriorityTasks = 0;
    let moderatePriorityTasks = 0;
    let highPriorityTasks = 0;
    let dueDateTasks = {};

    const currentDate = new Date();

    tasks.forEach((task) => {
      // Categorize tasks based on status
      switch (task.status) {
        case "Backlog":
          backlogTasks++;
          break;
        case "To-do":
          todoTasks++;
          break;
        case "In-Progress":
          inProgressTasks++;
          break;
        case "Completed":
          completedTasks++;
          break;
        default:
          break;
      }

      // Categorize tasks based on priority
      switch (task.priority) {
        case "Low Priority":
          lowPriorityTasks++;
          break;
        case "Moderate Priority":
          moderatePriorityTasks++;
          break;
        case "High Priority":
          highPriorityTasks++;
          break;
        default:
          break;
      }

      // Categorize tasks based on due date
      if (task.dueDate) {
        const dueDate = new Date(task.dueDate);
        const dueDateString = dueDate.toDateString();
        if (!dueDateTasks[dueDateString]) {
          dueDateTasks[dueDateString] = 1;
        } else {
          dueDateTasks[dueDateString]++;
        }
      }
    });

    // Sort the keys in dueDateTasks chronologically
    const sortedDueDateTasks = {};
    Object.keys(dueDateTasks)
      .sort()
      .forEach((key) => {
        sortedDueDateTasks[key] = dueDateTasks[key];
      });

    res.status(200).json({
      backlogTasks,
      todoTasks,
      inProgressTasks,
      completedTasks,
      lowPriorityTasks,
      moderatePriorityTasks,
      highPriorityTasks,
      dueDateTasks: sortedDueDateTasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
});

module.exports = router;
