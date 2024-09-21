const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) {
    return res
      .status(401)
      .send("Access token is missing. Unauthorized access.");
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send("Invalid token. Unauthorized access.");
  }
}

module.exports = verifyToken;
