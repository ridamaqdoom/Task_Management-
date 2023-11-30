const jwt = require("jsonwebtoken");
const { findClient } = require("./clientAnimal");


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

async function authenticateToken(req, res, next) {
  console.log("Authenticating");
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      console.log("Authenticated");
      
      // Assuming findClient is a function that finds a client based on the username
      const client = await findClient(decoded.username);

      // Access the username from the decoded token and attach it to res.locals
      res.locals.username = decoded.username;

      // You can also attach the entire client object if needed
      res.locals.client = client;

      next();
    } catch (err) {
      alert("Please sign in. Your session may have expired.");
      res.clearCookie("token");
      return res.redirect("/sign-in.html");
    }
  } else {
    console.log("No token. Must sign in first.");
    alert("Please sign in. Your session may have expired.");
    return res.redirect("/sign-in.html");
  }
}



module.exports = {
  generateToken,
  authenticateToken,
};
