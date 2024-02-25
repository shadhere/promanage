const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const db = require("../config/db");
const dotenv = require("dotenv");
dotenv.config();
const { SECRET_KEY } = process.env;

router.post("/register", async (req, res) => {
  console.log("Received registration request:", req.body);
  const { email, name, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", existingUser);
      return res.status(400).send({ message: "Email already exists" });
    }
    console.log("Creating new user...");
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const user = new User({ email, name, password: hashedPassword });
    await user.save();
    console.log("User created:", user);

    // Generate token for the new user
    const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: "1h" });
    console.log("JWT token:", token);
    console.log("SECRET_KEY:", SECRET_KEY);

    res.header("auth-token", token).send({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Error occurred during registration:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  console.log("Received login request"); // Add this log statement

  const { email, password } = req.body;

  console.log("Email:", email); // Log email

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(400).send({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: "1h" });
    console.log("JWT token:", token);
    console.log("SECRET_KEY:", SECRET_KEY);

    res.header("auth-token", token).send({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
