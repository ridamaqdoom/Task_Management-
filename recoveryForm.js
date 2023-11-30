const mongoose = require("mongoose");
const auth = require("./auth");
const { findClient } = require("./clientAnimal");

const recoverySchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  animalID: String,
  date: String,
  medication: String,
  status: String,
  issue: String,
  comments: String,
});

const recoveryForm = mongoose.model("Recovery", recoverySchema);

function setup(app) {
  // Get the animals that are currently logged in to populate the dropdown in createRecoveryForm
  app.get("/getAnimals", auth.authenticateToken, async (req, res) => {
    try {
      // Assuming findClient is a function that finds a client based on the username
      const client = await findClient(req.query.username); // Use req.query.username to get the username from the query parameter
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }

      // Assuming client.animals is an array of animal data
      const animals = client.animals;
      // Send the list of animals as a response
      res.status(200).json({ animals });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/saveRecoveryForm", auth.authenticateToken, (req, res) => {
    const newForm = new recoveryForm({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      animalID: req.body.animalID,
      date: req.body.date,
      medication: req.body.meds,
      status: req.body.status,
      issue: req.body.issue,
      comments: req.body.comments,
    });
    newForm
      .save()
      .then((form) => {
        console.log("Form Created:", form);
        res.redirect("/recoveryProgress.html");
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Error Creating Form" });
      });
  });
}

module.exports = {
  setup: setup,
};
