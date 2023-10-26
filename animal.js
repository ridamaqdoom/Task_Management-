const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
    Name: String,
    ID: String,
    Owner: String,
    Breed: String,
    
});

const animal = mongoose.model('Animals', animalSchema);

function setup(app) {
    app.post('/saveAnimal', (req, res) => {
        const newAnimal = new animal({
            Name: req.body.animalName,
            ID: req.body.animalID,
            Owner: req.body.owner,
            Breed: req.body.breed
        });

        newAnimal.save()
            .then(animal => {
                console.log('Animal Created:', animal);
                // Send JSON response with success message
                res.redirect("/addAnimal.html");
                //alert("Animal Created Successfully");
                //res.status(200).json({ message: 'Animal Created Successfully' });
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Error Creating Animal' });
            });
    });

    app.get('/animalInfo', async (req, res) => {
        const animalName = req.query.name1;
        const animalID = req.query.id1;

        try {
          const animalInformation = await animal.find({ Name: animalName, ID: animalID });
          res.status(200).json(animalInformation);
        } catch {
          res.status(500).json({ error: 'Error getting animal information' });
        }
      });
}



module.exports = {
    setup: setup
  };

