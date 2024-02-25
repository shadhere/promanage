const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const auth = require("./routes/auth");
const settings = require("./routes/settings");
const mongoose = require("mongoose");
const authMiddleware = require("./middleware/auth");
const { PORT } = process.env;

app.use(bodyParser.json());
app.use(cors());
app.use(auth);
app.use("/settings", authMiddleware); // Apply authMiddleware only to the /settings route
app.use(settings);

app.get("/api", (req, res) => {
  res.send({ message: "Server Started!" });
});

const port = PORT;
app.listen(port, () => console.log(`Server started on port ${port}`));
