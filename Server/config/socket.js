const socketIO = require("socket.io");

function setupSocket(server) {
  console.log("Setting up Socket.IO...");

  // Create a new Socket.IO server instance and attach it to the provided HTTP server
  const io = socketIO(5000);

  // Event listener for handling client connections
  io.on("connection", (socket) => {
    console.log("A client connected to the Socket.IO server");

    // Additional event listeners or socket logic can be added here

    // Event listener for handling client disconnections
    socket.on("disconnect", () => {
      console.log("A client disconnected from the Socket.IO server");
    });
  });

  // Event listener for handling Socket.IO errors
  io.on("error", (error) => {
    console.error("Socket.IO error:", error);
  });

  console.log("Socket.IO setup complete");

  // Return the Socket.IO server instance
  return io;
}

module.exports = setupSocket;

// server.on("request", (req, res) => {
//   console.log("Request received:", req.method, req.url);
//   // Add logic to check if the request is for the Socket.IO connection endpoint
//   // For example, you can check req.url for the specific path
// });
