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
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  // Configure Socket.IO to allow requests from all origins
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
}); // Set up Socket.IO

app.use(bodyParser.json());
app.use(cors());
app.use(auth);
app.use(settings);
app.use("/settings", authMiddleware); // Apply authMiddleware only to the /settings route
app.use("/task", authMiddleware);
app.use("/tasks", authMiddleware);
app.use(task(io));

app.get("/api", (req, res) => {
  res.send({ message: "Server Started!" });
});

io.on("connection", (socket) => {
  console.log("A client connected to the Socket.IO server");
  console.log("Id:", socket.id);

  // Additional event listeners or socket logic can be added here

  // Event listener for handling client disconnections
  socket.on("disconnect", () => {
    console.log("A client disconnected from the Socket.IO server");
  });
});

// Event listener for handling Socket.IO connection errors
io.on("connect_error", (error) => {
  console.error("Socket.IO connection error:", error);
});

// Event listener for handling Socket.IO errors
io.on("error", (error) => {
  console.error("Socket.IO error:", error);
});

console.log("Socket.IO setup complete");

// Return the Socket.IO server instance
// This is not necessary since the io instance is already globally accessible

const port = PORT || 3000; // Provide a default port if PORT is not set
server.listen(port, () => console.log(`Server started on port ${port}`)); // Start the HTTP server
