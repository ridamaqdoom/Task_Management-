const bcrypt = require("bcrypt");
const User1 = require("./UserModel"); // Assuming your User model is defined in UserModel.js
const saltRounds = 10;

module.exports = User1;

function setup(app) {
  app.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);

    const hashedPassword0 = bcrypt.hashSync("admin012", saltRounds); // Hash the password
    const newUser0 = new User1({
      username: "samanta-123",
      password: hashedPassword0, // Store the hashed password
      isAdmin: true // or true if it's an admin user
    });
    newUser0.save();

    const hashedPassword = bcrypt.hashSync("team24", saltRounds); // Hash the password
    const newUser = new User1({
      username: "Spoongbob",
      password: hashedPassword, // Store the hashed password
      isAdmin: false // or true if it's an admin user
    });
    newUser.save();

    const hashedPassword1 = bcrypt.hashSync("asd234", saltRounds); // Hash the password
    const newUser1 = new User1({
      username: "Craig_23",
      password: hashedPassword1, // Store the hashed password
      isAdmin: false // or true if it's an admin user
    });
    newUser1.save();


    try {
      const user = await User1.findOne({ username: username });
      console.log(user);

      if (user && bcrypt.compareSync(password, user.password)) {
        console.log(user.isAdmin);
        if (user.isAdmin) {
          console.log("Admin user logged in:", user.username);
          res.redirect("/ownerMenu.html");
        } else {
          console.log("Regular user logged in:", user.username);
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

  app.get("/", (req, res) => {
    // You can send a response or render an HTML page here if needed
    res.redirect("/sign-in.html");
  });
}

module.exports = {
  setup: setup,
};
