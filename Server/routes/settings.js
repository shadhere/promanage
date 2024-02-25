// routes/user.js

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");

// Route to get current user's name
router.get("/settings", authMiddleware, async (req, res) => {
  try {
    console.log(req.user._id);
    console.log(req.user);
    // Fetch the current user's data from the database
    const user = await User.findById(req.user._id);

    // If user not found, send error response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user's name in the response
    res.json({ name: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
