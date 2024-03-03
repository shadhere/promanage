// Import necessary modules and models
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const mongoose = require("mongoose");
const Task = require("../models/Task");
const User = require("../models/User");

// Endpoint to get count of tasks created by a particular user grouped by status and priority
router.get("/analytics", authMiddleware, async (req, res) => {
  console.log("Analytics endpoint called");

  const userId = req.user._id;
  console.log(`Analytics endpoint called with userId: ${userId}`);

  try {
    // Aggregate counts by status
    const statusCounts = await Task.aggregate([
      {
        $match: { createdBy: new mongoose.Types.ObjectId(userId) },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Aggregate counts by priority
    const priorityCounts = await Task.aggregate([
      {
        $match: { createdBy: new mongoose.Types.ObjectId(userId) },
      },
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ]);

    console.log("Task counts by status:", statusCounts);
    console.log("Task counts by priority:", priorityCounts);

    const overdueCount = await Task.countDocuments({
      createdBy: new mongoose.Types.ObjectId(userId),
      dueDate: { $lt: new Date() }, // Find tasks with due dates less than the current date
    });

    const aggregatedCounts = {
      status: {},
      priority: {},
      overdue: overdueCount,
    };

    // Store status counts
    statusCounts.forEach(({ _id, count }) => {
      aggregatedCounts.status[_id] = count;
    });

    // Store priority counts
    priorityCounts.forEach(({ _id, count }) => {
      aggregatedCounts.priority[_id] = count;
    });

    console.log("Aggregated counts:", aggregatedCounts);

    res.json(aggregatedCounts);
  } catch (error) {
    console.error("Error in analytics endpoint:", error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
