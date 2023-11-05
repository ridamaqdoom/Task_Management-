const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  username: String,
  password: String,
});

const client = mongoose.model("Clients", clientSchema);

function setup(app) {
  app.post("/saveClient", (req, res) => {
    const newClient = new client({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      username: req.body.username,
      password: req.body.password,
    });

    newClient
      .save()
      .then((client) => {
        console.log("Client Created:", client);
        // Send JSON response with success message
        res.redirect("/addClient.html");
        //alert("Client Created Successfully");
        //res.status(200).json({ message: 'Client Created Successfully' });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Error Creating Client" });
      });
  });

  app.get("/clientInfo", async (req, res) => {
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

  app.get("/listClientInfo", async (req, res) => {
    try {
      const clientInformation = await client.find({});
      res.status(200).json(clientInformation);
    } catch {
      res.status(500).json({ error: "Error getting clients information " });
    }
  });

  app.delete("/removeClient", async (req, res) => {
    try {
      // Extract the username from the request body
      const user = req.body.username;

      // Use the findOneAndDelete method to remove the client based on the username
      const result = await client.findOneAndDelete({ username: user });

      if (result) {
        console.log(
          "Client Deleted: " + result.firstName + " " + result.lastName
        );
        res.status(200).send("Client deleted");
      } else {
        console.log("Client not found");
        res.status(404).send("Client not found");
      }
    } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Error Deleting client");
    }
  });

  app.post('/updateClient', (req, res) => {
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
  setup: setup,
};