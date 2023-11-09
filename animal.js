const express = require("express");
const app = express();
app.use(express.json());
const { Animal, Client, findClient } = require("./clientAnimal");

const animal = Animal;
const client = Client;

function setup(app) {
  app.post("/saveAnimal", (req, res) => {
    const newAnimal = new animal({
      Name: req.body.animalName,
      ID: req.body.animalID,
      OwnerUser: req.body.owner,
      Species:
        req.body.species === "Other" ? req.body.otherSpecies : req.body.species,
      Breed: req.body.breed,
    });
  
    // Find the client by their "OwnerUser" field using the findClientByUsername function
    findClient(req.body.owner)
      .then((foundClient) => {
        if (foundClient) {
          // Add the newly created animal to the client's "animals" array
          foundClient.animals.push(newAnimal);
  
          foundClient
            .save()
            .then(() => {
              // Save the client document first
              console.log("Animal added to client's array");
  
              // Now, save the new animal
              newAnimal
                .save()
                .then((animal) => {
                  console.log("Animal Created:", animal);
                  res.redirect("/addAnimal.html");
                })
                .catch((error) => {
                  console.error("Error Creating Animal:", error);
                  res.status(500).json({ error: "Error Creating Animal" });
                });
            })
            .catch((error) => {
              console.error("Error saving client document:", error);
              res.status(500).json({ error: "Error Creating Animal" });
            });
        } else {
          console.log("Client not found");
          res.status(404).json({ error: "Client not found" });
        }
      })
      .catch((err) => {
        console.error("Error finding the client:", err);
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

  app.get("/listAnimalInfo", async (req, res) => {
    try {
      const animalInformation = await animal.find({});
      res.status(200).json(animalInformation);
    } catch {
      res.status(500).json({ error: "Error getting animals information " });
    }
  });

  app.delete("/removeAnimal", async (req, res) => {
    try {
      const animalIdToRemove = req.body.animalID;
  
      // Find the animal by its ID
      const animalObject = await animal.findOne({ ID: animalIdToRemove });
  
      if (animalObject) {
        // Extract the animalOwner from the found animal object
        const animalOwner = animalObject.OwnerUser;
  
        console.log(animalIdToRemove, animalOwner);
  
        // Find the client by their username
        const foundClient = await client.findOne({ username: animalOwner });
  
        if (foundClient) {
          // Remove the animal from the client's "animals" array
          const index = foundClient.animals.findIndex(
            (animal) => animal.ID === animalIdToRemove
          );
  
          if (index !== -1) {
            foundClient.animals.splice(index, 1);
  
            // Save the updated client document
            await foundClient.save();
  
            // Delete the animal from the animal schema
            const result = await animal.findOneAndDelete({
              ID: animalIdToRemove,
            });
  
            if (result) {
              console.log("Animal removed:", animalIdToRemove);
              res.status(200).send("Animal removed");
            } else {
              console.log("Animal not found");
              res.status(404).send("Animal not found");
            }
          } else {
            console.log("Animal not found in the client's array");
            res.status(404).send("Animal not found in the client's array");
          }
        } else {
          console.log("Client not found");
          res.status(404).send("Client not found");
        }
      } else {
        console.log("Animal not found");
        res.status(404).send("Animal not found");
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error removing animal");
    }
  });
  

  app.post("/updateAnimal", (req, res) => {
    try {
      const updateAnimalName = req.body.animalName;
      const updateAnimalID = req.body.animalID;
      const updateAnimalOwnerUser = req.body.animalOwner;
      const updateAnimalSpecies =
        req.body.species === "Other" ? req.body.otherSpecies : req.body.species;
      const updateAnimalBreed = req.body.breed;
      const updateAnimalId = req.body.collectionID;

      const result = animal
        .findOneAndUpdate(
          { _id: updateAnimalId },
          {
            Name: updateAnimalName,
            ID: updateAnimalID,
            OwnerUser: updateAnimalOwnerUser,
            Species: updateAnimalSpecies,
            Breed: updateAnimalBreed,
          }
        )
        .exec();

      if (result) {
        console.log(
          "Animal Updated: " + updateAnimalName + " " + updateAnimalID
        );
        res.status(200).redirect("./editRemoveAnimal.html");
      } else {
        console.log("Animal not found");
        res.status(404).send("Animal not found");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Error Updating Animal");
    }
  });
}

module.exports = {
  setup: setup,
};
