const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const path = require('path');
const app = express();
const router = express.Router();

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

const appointmentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  service: String,
  email: String,
  message: String,
});

const Appointment = mongoose.model('appointment', appointmentSchema);

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


const PORT = 3000;
app.use('/api', router); // Use the router for the '/api' prefix
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

