const mongoose = require("mongoose");
const auth = require('./auth');


const formSchema = new mongoose.Schema({
  CaseNumber: String,
  ClientName: String,
  PhoneNumber: String,
  Date: String,
  HorseName: String,
  HorseBreed: String,
  HorseAge: String,
  HorseGender: String,
  Reason: String,
  Assessment: String,
  CoxalTuber: String,
  Spinaprominens: String,
  Belly: String,
  SpinalSpring: String,
  Hula: String,
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
  Structural: String,
  ProtractionLF2: String,
  ProtractionRF2: String,
  ProtractionLH2: String,
  ProtractionRH2: String,
  RetractionLF2: String,
  RetractionRF2: String,
  RetractionLH2: String,
  RetractionRH2: String,
  Suggestions: String,
  ClientSign: String,
  TherapistSign: String,
});

const horseForm = mongoose.model("HorseForm", formSchema);

function setup(app) {
  app.post("/saveEquineMessageForm", auth.authenticateToken, (req, res) => {
    const newForm = new horseForm({
      CaseNumber: req.body.caseNumber,
      ClientName: req.body.clientName,
      PhoneNumber: req.body.phoneNumber,
      Date: req.body.date,
      HorseName: req.body.horseName,
      HorseBreed: req.body.horseBreed,
      HorseAge: req.body.horseAge,
      HorseGender: req.body.horseGender,
      Reason: req.body.reason,
      Assessment: req.body.assessment,
      CoxalTuber: req.body.coxalTuberSpring,
      Spinaprominens: req.body.spinaprominensReflex,
      Belly: req.body.bellyLift,
      SpinalSpring: req.body.spinalSpringTest,
      Hula: req.body.hulaTest,
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
      Structural: req.body.structural,
      ProtractionLF2: req.body.protractionLF2,
      ProtractionRF2: req.body.protractionRF2,
      ProtractionLH2: req.body.protractionLH2,
      ProtractionRH2: req.body.protractionRH2,
      RetractionLF2: req.body.retractionLF2,
      RetractionRF2: req.body.retractionRF2,
      RetractionLH2: req.body.retractionLH2,
      RetractionRH2: req.body.retractionRH2,
      Suggestions: req.body.suggestions,
      ClientSign: req.body.clientSign,
      TherapistSign: req.body.therapistSign,
    });

    newForm
      .save()
      .then((form) => {
        console.log("Form Created:", form);
        res.redirect("/addEquineForm.html");
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Error Creating Form" });
      });
  });

  app.get("/getHorseFormsInfo", auth.authenticateToken, async (req, res) => {
    const clientName = req.query.clientName;
    const horseName = req.query.horseName;

    try {
        const formInformation = await horseForm.find({
            ClientName: clientName,
            HorseName: horseName,
        });
        res.status(200).json(formInformation);
        } catch {
        res.status(500).json({ error: "Error getting form information" });
    }
  });

  app.get("/equineFormInfo", async (req, res) => {
    const caseNumber = req.query.caseStudy;
    const clientName = req.query.clientName;
    const animalName = req.query.animalName;

    try {
      const formInformation = await horseForm.find({
        CaseNumber: caseNumber,
        ClientName: clientName,
        HorseName: animalName,
      });
      res.status(200).json(formInformation);
    } catch {
      res.status(500).json({ error: "Error getting form information" });
    }
  });

  app.delete("/removeEquineForm", async (req, res) => {
    try {
      const caseNumber = req.body.CaseNumber;
      const clientName = req.body.ClientName;
      const horseName = req.body.HorseName;

      const result = await horseForm.findOneAndDelete({ CaseNumber: caseNumber, ClientName: clientName, HorseName: horseName });

      if (result) {
        console.log("Form Removed");
        res.status(200).send("Form Removed");
      } else {
        console.log("Form not found");
        res.status(500).send("Form not found");
      }
    } catch {
      res.status(500).json({ error: "Error deleting form" });
    }
  })
}

module.exports = {
  setup: setup,
};
