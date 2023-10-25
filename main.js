const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb+srv://ghk506:team24@cluster0.rad70rb.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

// Import your modules
const AppointModule = require('./appointment');
const SigninModule = require('./Signin_database');
const clientModule = require('./client')
const AcceptAppointment = require('./public/acceptAppointment');
const OwnerBooking = require('./public/ownerbooking');
<<<<<<< HEAD
const AcceptAppointment = require('./public/acceptAppointment');
const OwnerBooking = require('./public/ownerbooking');

=======
const clientModule = require('./client')
>>>>>>> ececfaa7eae2e6e7bb2657512c02cef463dd5877

// Use the imported modules in your Express app
AppointModule.setup(app);
SigninModule.setup(app);
clientModule.setup(app);
AcceptAppointment.setup(app);
OwnerBooking.setup(app);

<<<<<<< HEAD
AcceptAppointment.setup(app);
OwnerBooking.setup(app);
=======
clientModule.setup(app);
>>>>>>> ececfaa7eae2e6e7bb2657512c02cef463dd5877

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
