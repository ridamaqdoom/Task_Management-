const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const path = require('path');
const { Collection } = require('mongodb');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// changed user to mine, can change to your own too.
mongoose.connect("mongodb+srv://qpb948:Team24@cluster0.rad70rb.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function() {
  console.log("Connected to MongoDB");
});

// Create Mongoose Schema and Model for Appointments
const clientsSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    animalID: Array,
  });
  
  const Appointment = mongoose.model('Client', clientsSchema);
  
  // Handle form submission
  app.post('/api/addClient', (req, res) => {
    const { firstName, lastName, email, phoneNumber, animalID } = req.body;
  
    // Create a new appointment instance
    const newAppointment = new Appointment({
      firstName,
      lastName,
      email,
      phoneNumber,
      animalID,
    });
  
    // Save the appointment to the database using promises
    newClient.save()
    .then(client => {
      console.log('Client Created:', appointment);
      // Send JSON response with success message
      res.status(200).json({ message: 'Client Created Successfully' });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Error Creating Client' });
    });
});
  app.get('/', (req, res) => {
    // You can send a response or render an HTML page here if needed
    res.redirect('/addClient.html');
  });
  // Start the server
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
