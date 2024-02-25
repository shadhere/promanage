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

router.put("/updatepassword", authMiddleware, async (req, res) => {
  try {
    const { name, oldPassword, newPassword } = req.body;

    // Check if the old password matches the user's current password
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await user.comparePassword(oldPassword);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;
