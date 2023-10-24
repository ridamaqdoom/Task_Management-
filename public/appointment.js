const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const path = require('path');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// changed user to mine, can change to your own too.
mongoose.connect("mongodb+srv://mas454:team24@cluster0.rad70rb.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function() {
  console.log("Connected to MongoDB");
});

// Create Mongoose Schema and Model for Appointments
const appointmentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    service: String,
    email: String,
    message: String
  });
  
  const Appointment = mongoose.model('Appointment', appointmentSchema);
  
  // Handle form submission
  app.post('/api/bookAppointment', (req, res) => {
    const { firstName, lastName, selectService, email, message } = req.body;
  
    // Create a new appointment instance
    const newAppointment = new Appointment({
      firstName,
      lastName,
      service: selectService,
      email,
      message
    });
  
    // Save the appointment to the database using promises
    newAppointment.save()
    .then(appointment => {
      console.log('Appointment created:', appointment);
      // Send JSON response with success message
      res.status(200).json({ message: 'Appointment booked successfully' });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Error saving appointment' });
    });
});
  app.get('/', (req, res) => {
    // You can send a response or render an HTML page here if needed
    res.redirect('/AppointmentBooking.html');
  });
  // Start the server
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
