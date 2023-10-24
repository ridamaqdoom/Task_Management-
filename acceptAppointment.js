const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const router = express.Router();
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb+srv://mas454:team24@cluster0.rad70rb.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function() {
  console.log("Connected to MongoDB");
});

// Create Mongoose Schema and Model for acceptAppointments
//const appointment = require('/appointment.js');
const appointmentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  service: String,
  email: String,
  message: String,
});

const acceptAppointmentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    service: String,
    email: String,
    message: String,
    accepted: String
  });

const acceptAppointment = mongoose.model('acceptAppointment', acceptAppointmentSchema);
const appointment = mongoose.model('appointment', appointmentSchema);

router.get('/appointments', (req, res) => {
  // Retrieve all appointments from the database
  appointment.find({}, (err, appointments) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error occurred while fetching appointments.');
    }

    // Send the appointments as JSON to the client
    res.json(appointments);
  });
});

module.exports = router;

// Handle a POST request to accept an appointment
app.post('/api/acceptAppointment:id', (req, res) => {
    const appointmentId = req.params.id;
  
    // Find the original appointment by its ID
    appointment.findById(appointmentId, (err, originalAppointment) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error occurred while accepting the appointment.');
      }
  
      if (!originalAppointment) {
        return res.status(404).send('Appointment not found.');
      }
  
      // Create a new instance for the accepted appointment
      const acceptedAppointment = new acceptAppointment(originalAppointment.toObject());
  
      // Save the accepted appointment to the "acceptAppointment" collection
      acceptedAppointment.save((saveErr) => {
        if (saveErr) {
          console.error(saveErr);
          return res.status(500).send('Error occurred while saving the accepted appointment.');
        }
  
        // Optionally, remove the original appointment from the "appointments" collection
        originalAppointment.remove();
  
        res.status(200).send('Appointment accepted and moved to "acceptAppointment" collection.');
      });
    });
  });