const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

module.exports = function (req, res, next) {
  console.log("Middleware executing...");

  const token = req.header("authorization");
  const newToken = token.substring(7);
  console.log("newToken:", newToken);
  console.log("Token:", token);

  if (!token) {
    console.log("No token found, access denied");
    return res.status(401).send({ message: "Access denied" });
  }

  try {
    const decodedToken = jwt.decode(newToken, { complete: true });
    console.log("Decoded Token:", decodedToken);

    const verified = jwt.verify(newToken, SECRET_KEY);
    console.log("Token verified:", verified);

    req.user = verified;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(400).send({ message: "Invalid token" });
  }
};
