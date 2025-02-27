const bcrypt = require("bcrypt");
const auth = require("./auth");
const User1 = require("./UserModel"); // Assuming your User model is defined in UserModel.js
const saltRounds = 10;

module.exports = User1;

const hashedPassword0 = bcrypt.hashSync("admin012", saltRounds); // Hash the password
const newUser0 = new User1({
  username: "samanta-123",
  password: hashedPassword0, // Store the hashed password
  isAdmin: true, // or true if it's an admin user
});
newUser0.save();

const hashedPassword1 = bcrypt.hashSync("team24", saltRounds); // Hash the password
const newUser1 = new User1({
  username: "Spoongbob",
  password: hashedPassword1, // Store the hashed password
  isAdmin: false, // or true if it's an admin user
});
newUser1.save();

const hashedPassword2 = bcrypt.hashSync("asd234", saltRounds); // Hash the password
const newUser2 = new User1({
  username: "Craig_23",
  password: hashedPassword2, // Store the hashed password
  isAdmin: false, // or true if it's an admin user
});
newUser2.save();

function setup(app) {
  app.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);

    try {
      const user = await User1.findOne({ username: username });
      console.log(user);

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = auth.generateToken(user);
        console.log(user.isAdmin);
        if (user.isAdmin) {
          console.log("Admin user logged in:", user.username);
          res.cookie("token", token); // Store the token in a cookie
          res.redirect("/ownerMenu.html");
        } else {
          console.log("Regular user logged in:", user.username);
          res.cookie("token", token); // Store the token in a cookie
          res.redirect("/userMenu.html");
        }
      } else {
        res.send("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  // Use the authenticateToken middleware in routes that require authentication
  app.get("/protected-route", auth.authenticateToken, (req, res) => {
    // Access req.user to get the authenticated user information
    res.send("Protected route");
  });

  app.get("/", (req, res) => {
    res.redirect("/sign-in.html");
  });
}

module.exports = {
  setup: setup,
};
