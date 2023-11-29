const mongoose = require("mongoose");
const circularJson = require("circular-json");
const auth = require("./auth");
const { Client, Animal, findClient } = require("./clientAnimal");

const recoverySchema = new mongoose.Schema({
  animalID: String,
  date: String,
  medication: String,
  health: String,
  status: String,
  comments: String,
});

const recovery = mongoose.model("Recovery", recoverySchema);

function setup(app) {
  app.get("/get-profile", auth.authenticateToken, async (req, res) => {
    try {
      const username = req.username;
      console.log("USER", username);

      const client = await Client.findOne({ username })
        .populate("animals")
        .exec();

      const jsonString = circularJson.stringify(client.animals);
console.log("JSON", jsonString);
      res.json(jsonString);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
}

module.exports = {
  setup: setup,
};
