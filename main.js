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
const animalModule = require('./animal')

// Use the imported modules in your Express app
AppointModule.setup(app);
SigninModule.setup(app);
clientModule.setup(app);
animalModule.setup(app);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
