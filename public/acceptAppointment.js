const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();



const appointmentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  service: String,
  email: String,
  message: String,
});

const Appointment = mongoose.model('appointment', appointmentSchema);

function setup(app) {

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Owner-Booking.html');
});

// Define a route to fetch appointments
router.get('/appointment', async (req, res) => {
  try {
    const appointments = await Appointment.find(); // Fetch all appointments from the database
    res.json(appointments); // Send the appointments as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching appointments');
  }
  console.log(`got`)
});

}
module.exports = {
  setup: setup
};
