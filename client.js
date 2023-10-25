const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    username: String,
    password: String
});

const client = mongoose.model('Clients', clientSchema);

function setup(app) {
    app.post('/saveClient', (req, res) => {
        const newClient = new client({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            username: req.body.username,
            password: req.body.password
        });

        newClient.save()
            .then(client => {
                console.log('Client Created:', client);
                // Send JSON response with success message
                res.redirect("/addClient.html");
                //alert("Client Created Successfully");
                //res.status(200).json({ message: 'Client Created Successfully' });
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Error Creating Client' });
            });
    });

    app.get('/clientInfo', async (req, res) => {
        const clientFirstName = req.query.firstName1;
        const clientLastName = req.query.lastName1;
    
        try {
          const clientInformation = await client.find({ firstName: clientFirstName });
          res.status(200).json(clientInformation);
        } catch {
          res.status(500).json({ error: 'Error getting client information' });
        }
      });
}

module.exports = {
    setup: setup
  };
