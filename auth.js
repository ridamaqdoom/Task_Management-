const jwt = require("jsonwebtoken");

const secretKey = "123"; // Replace with a secure secret key

function generateToken(user) {
  const payload = {
    username: user.username,
    isAdmin: user.isAdmin,
  };

  const options = {
    expiresIn: "24h",
  };

  return jwt.sign(payload, secretKey, options);
}

function authenticateToken(req, res, next) {
  console.log("Authenticating");
  const token = req.cookies.token;
  try {
    const decoded = jwt.verify(token, secretKey);
    req.username = decoded.username;
    console.log("Authenticated");
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/sign-in.html");
  }
}

module.exports = {
  generateToken,
  authenticateToken,
};
