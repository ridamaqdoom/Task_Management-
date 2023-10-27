const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  Name: String,
  ID: String,
  Owner: String,
  Species: String,
  Breed: String,
});

const animal = mongoose.model("Animals", animalSchema);

function setup(app) {
  app.post("/saveAnimal", (req, res) => {
    const newAnimal = new animal({
      Name: req.body.animalName,
      ID: req.body.animalID,
      Owner: req.body.owner,
      Species:
        req.body.species === "Other" ? req.body.otherSpecies : req.body.species,
      Breed: req.body.breed,
    });

    newAnimal
      .save()
      .then((animal) => {
        console.log("Animal Created:", animal);
        // Send JSON response with success message
        res.redirect("/addAnimal.html");
        //alert("Animal Created Successfully");
        //res.status(200).json({ message: 'Animal Created Successfully' });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Error Creating Animal" });
      });
  });

  app.get("/animalInfo", async (req, res) => {
    const animalName = req.query.name1;
    const animalID = req.query.id1;

    try {
      const animalInformation = await animal.find({
        Name: animalName,
        ID: animalID,
      });
      res.status(200).json(animalInformation);
    } catch {
      res.status(500).json({ error: "Error getting animal information" });
    }
  });

  app.delete("/removeAnimal", async (req, res) => {
    try {
      // Extract the ID from the request body
      const aniID = req.body.animalID;

      // Use the findOneAndDelete method to remove the client based on the username
      const result = await animal.findOneAndDelete({ animalID: aniID });

      if (result) {
        console.log("Animal Deleted: " + result.Name + " " + result.ID);
        res.status(200).send("Animal deleted");
      } else {
        console.log("Animal not found");
        res.status(404).send("Animal not found");
      }
    } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Error Deleting Animal");
    }
  });
}

module.exports = {
  setup: setup,
};
