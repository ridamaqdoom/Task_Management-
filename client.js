const User1 = require('./UserModel');
const bcrypt = require('bcrypt');
const auth = require('./auth');

module.exports = User1;
const { Client, deleteClientAnimals } = require('./clientAnimal');

const client = Client;

function setup(app) {

  app.post("/saveClient", auth.authenticateToken, (req, res) => {
    const newClient = new client({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      username: req.body.username,
      password: req.body.password,
      animals: []
    });

    newClient
      .save()
      .then((client) => {
        console.log("Client Created:", client);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Error Creating Client" });
      });
      
    const cryptedPassword = bcrypt.hashSync(req.body.password, 10);
    const newLogIn = new User1({
      username: req.body.username,
      password: cryptedPassword,
      isAdmin: false,
    });

    newLogIn
      .save()
      .then((user) => {
        console.log("User Created:", user);
        // Send JSON response with success message
        res.redirect("/addClient.html");
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Error Creating Client" });
      });
  });

  app.get("/clientInfo", auth.authenticateToken, async (req, res) => {
    const clientFirstName = req.query.firstName1;
    const clientLastName = req.query.lastName1;

    try {
      const clientInformation = await client.find({
        firstName: clientFirstName, lastName: clientLastName
      });
      res.status(200).json(clientInformation);
    } catch {
      res.status(500).json({ error: "Error getting client information" });
    }
  });

  app.get("/listClientInfo", auth.authenticateToken, async (req, res) => {
    try {
      const clientInformation = await client.find({});
      res.status(200).json(clientInformation);
    } catch {
      res.status(500).json({ error: "Error getting clients information " });
    }
  });

  app.delete("/removeClient", auth.authenticateToken, async (req, res) => {
    try {
      // Extract the username from the request body
      const user = req.body.username;
  
      // Find the client to get the list of associated animal IDs
      const clientToDelete = await client.findOne({ username: user });
  
      if (clientToDelete) {
        const animalIdsToDelete = clientToDelete.animals;
  
        // Use the deleteClientAnimals function to delete the associated animals
        await deleteClientAnimals(animalIdsToDelete);
  
        // Now, delete the client
        const result = await client.findOneAndDelete({ username: user });
  
        if (result) {
          console.log("Client Deleted: " + result.firstName + " " + result.lastName + "\nTheir Animals Deleted");
          res.status(200).send("Client and associated animals deleted");
        } else {
          console.log("Client not found");
          res.status(404).send("Client not found");
        }
      } else {
        console.log("Client not found");
        res.status(404).send("Client not found");
      }
    } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Error Deleting client");
    }
  });
  
  app.post('/updateClient', auth.authenticateToken, (req, res) => {
    try {
      const updatedDate = req.body;

      const result = client.findOneAndUpdate({ _id: updatedDate.collectionID }, updatedDate).exec();

      if (result) {
        console.log(
          "Client Updated: " + updatedDate.firstName + " " + updatedDate.lastName
        );
        res.status(200).redirect("./editRemoveClient.html");
      } else {
        console.log("Client not found");
        res.status(404).send("Client not found");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Error Updating Client");
    }
  });
}

module.exports = {
  setup: setup
};
