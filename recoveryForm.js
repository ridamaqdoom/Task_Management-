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
  // Retrieve a client's animals
  app.get("/getAnimals", auth.authenticateToken, async (req, res) => {
    try {
      // Find the client using the username
      const client = await findClient(req.query.username);
      if (!client) {
        // Return an error if the client is not found
        return res.status(404).json({ error: "Client not found" });
      }
      // Retrieve and send the client's animals
      const animals = client.animals;
      res.status(200).json({ animals });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Save a new recovery form
  app.post("/saveRecoveryForm", auth.authenticateToken, (req, res) => {
    // Create a new recovery form based on the incoming request data
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

    // Save the new form to the database
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

  app.get(
    "/getAnimalRecoveryForm",
    auth.authenticateToken,
    async (req, res) => {
      const animalID = req.query.animalID;

      try {
        const formInformation = await recoveryForm.find({
          animalID: animalID,
        });
        res.status(200).json(formInformation);
      } catch {
        res.status(500).json({ error: "Error getting form information" });
      }
    }
  );

  app.delete(
    "/deleteRecoveryForm/:formId",
    auth.authenticateToken,
    async (req, res) => {
      const formId = req.params.formId;

      try {
        const deletedForm = await recoveryForm.findByIdAndDelete(formId);
        if (!deletedForm) {
          return res.status(404).json({ error: "Form not found" });
        }

        res.status(200).json({ message: "Form deleted successfully" });
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  );
}

module.exports = {
  setup: setup,
};
