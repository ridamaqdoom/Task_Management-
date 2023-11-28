const mongoose = require("mongoose");

// Connect to the database

const db = mongoose.connection;

const formSchema = new mongoose.Schema({
  CaseNumber: String,
  ClientName: String,
  PhoneNumber: String,
  Date: String,
  DogName: String,
  DogBreed: String,
  DogAge: String,
  DogGender: String,
  Reason: String,
  Assessment: String,
  ProtractionLF: String,
  ProtractionRF: String,
  ProtractionLH: String,
  ProtractionRH: String,
  RetractionLF: String,
  RetractionRF: String,
  RetractionLH: String,
  RetractionRH: String,
  Muscle: String,
  Side: String,
  Key: String,
  Reassessment: String,
  ProtractionLF2: String,
  ProtractionRF2: String,
  ProtractionLH2: String,
  ProtractionRH2: String,
  RetractionLF2: String,
  RetractionRF2: String,
  RetractionLH2: String,
  RetractionRH2: String,
  ClientSign: String,
  TherapistSign: String,
});

const dogForm = mongoose.model("DogForm", formSchema);

function setup(app) {
  app.post("/saveCanineMessageForm", (req, res) => {
    const newForm = new dogForm({
      CaseNumber: req.body.caseNumber,
      ClientName: req.body.clientName,
      PhoneNumber: req.body.phoneNumber,
      Date: req.body.date,
      DogName: req.body.dogName,
      DogBreed: req.body.dogBreed,
      DogAge: req.body.dogAge,
      DogGender: req.body.dogGender,
      Reason: req.body.reason,
      Assessment: req.body.assessment,
      ProtractionLF: req.body.protractionLF,
      ProtractionRF: req.body.protractionRF,
      ProtractionLH: req.body.protractionLH,
      ProtractionRH: req.body.protractionRH,
      RetractionLF: req.body.retractionLF,
      RetractionRF: req.body.retractionRF,
      RetractionLH: req.body.retractionLH,
      RetractionRH: req.body.retractionRH,
      Muscle: req.body.muscles,
      Side: req.body.side,
      Key: req.body.key,
      Reassessment: req.body.reassessment,
      ProtractionLF2: req.body.protractionLF2,
      ProtractionRF2: req.body.protractionRF2,
      ProtractionLH2: req.body.protractionLH2,
      ProtractionRH2: req.body.protractionRH2,
      RetractionLF2: req.body.retractionLF2,
      RetractionRF2: req.body.retractionRF2,
      RetractionLH2: req.body.retractionLH2,
      RetractionRH2: req.body.retractionRH2,
      ClientSign: req.body.clientSign,
      TherapistSign: req.body.therapistSign,
    });

    newForm
      .save()
      .then((form) => {
        console.log("Form Created:", form);
        res.redirect("/addCanineForm.html");
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Error Creating Form" });
      });
  });

  app.get("/getFormsInfo", async (req, res) => {
    const clientName = req.query.clientName;
    const dogName = req.query.dogName;

    try {
      const formInformation = await dogForm.find({
        ClientName: clientName,
        DogName: dogName,
      });
      res.status(200).json(formInformation);
    } catch {
      res.status(500).json({ error: "Error getting form information" });
    }
  });

  app.get("/formInfo", async (req, res) => {
    const caseNumber = req.query.caseStudy;
    const clientName = req.query.clientName;
    const animalName = req.query.animalName;

    try {
      const formInformation = await dogForm.find({
        CaseNumber: caseNumber,
        ClientName: clientName,
        DogName: animalName,
      });
      res.status(200).json(formInformation);
    } catch {
      res.status(500).json({ error: "Error getting form information" });
    }
  });

  app.delete("/removeCanineForm", async (req, res) => {
    try {
      const caseNumber = req.body.CaseNumber;
      const clientName = req.body.ClientName;
      const animalName = req.body.DogName;

      const result = await dogForm.findOneAndDelete({
        CaseNumber: caseNumber,
        ClientName: clientName,
        DogName: animalName,
      });

      if (result) {
        console.log("Form Removed");
        res.status(200).send("Form Removed");
      } else {
        console.log("Form not found");
        res.status(500).send("Form not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error removing form" });
    }
  });

}

module.exports = {
  setup: setup,
};
