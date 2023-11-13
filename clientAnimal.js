const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb+srv://ghk506:team24@cluster0.rad70rb.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define common schemas and models
const clientSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    username: String,
    password: String,
    animals: Array,
});

const animalSchema = new mongoose.Schema({
    Name: String,
    ID: String,
    OwnerUser: String,
    Species: String,
    Breed: String,
    
});

const Client = mongoose.model('Client', clientSchema);
const Animal = mongoose.model('Animal', animalSchema);

function findClient(username) {
  return Client.findOne({ username });
}

async function deleteClientAnimals(animalIds) {
  try {
    for (const animalId of animalIds) {
      // Delete each animal by its _id
      await Animal.findOneAndDelete({ _id: animalId });
    }
  } catch (error) {
    console.error("Error deleting animals:", error);
    // Handle errors as needed
  }
}


module.exports = {
  Client,
  Animal,
  findClient,
  deleteClientAnimals
};
