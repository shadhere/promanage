const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const auth = require("./routes/auth");
const settings = require("./routes/settings");
const mongoose = require("mongoose");
const authMiddleware = require("./middleware/auth");
const task = require("./routes/task");
const { PORT } = process.env;
const analytics = require("./routes/analytics");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(settings);
app.use(auth);
app.use(analytics);
app.use("/settings", authMiddleware); // Apply authMiddleware only to the /settings route
app.use("/task", authMiddleware);
app.use("/tasks", authMiddleware);
app.use("/analytics", authMiddleware);

app.use(task());

app.get("/api", (req, res) => {
  res.send({ message: "Server Started!" });
});

// Return the Socket.IO server instance
// This is not necessary since the io instance is already globally accessible

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // Start the HTTP server
