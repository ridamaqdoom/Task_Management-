const mongoose = require("mongoose");
const auth = require('./auth');
const appointmentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    service: String,
    email: String,
    message: String
  });
  
  const Appointment = mongoose.model('Appointment', appointmentSchema);
  const ConfirmedAppointment = mongoose.model("ConfirmedAppointment", appointmentSchema);

  

  function setup(app) {

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

app.get('/api/appointments', auth.authenticateToken, async (req, res) => {
  try {
    // Fetch requested appointments from the database
    const requestedAppointments = await Appointment.find({/* Add conditions if necessary */});

    // Send the requested appointments as JSON response
    res.status(200).json(requestedAppointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching requested appointments' });
  }
});

    // Handle confirming appointments
    app.post("/api/confirmAppointment", auth.authenticateToken, async (req, res) => {
      const { firstName, lastName, selectService, email, message } = req.body;

      const confirmedAppointment = new ConfirmedAppointment({
        firstName,
        lastName,
        service: selectService,
        email,
        message
      });

      // Save the confirmed appointment to the database using promises
      confirmedAppointment.save()
        .then((appointment) => {
          console.log("Appointment confirmed:", appointment);
          // Send JSON response with success message
          res.status(200).json({ message: "Appointment confirmed successfully" });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: "Error confirming appointment" });
        });
    });

    // fetch confirmed appointments
    app.get('/api/confirmedAppointments', auth.authenticateToken, async (req, res) => {
      try {
        const confirmedAppointments = await ConfirmedAppointment.find();
        res.status(200).json(confirmedAppointments);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching confirmed appointments' });
      }
    });


  app.get('/', (req, res) => {
    // You can send a response or render an HTML page here if needed
    res.redirect('/AppointmentBooking.html');
  });

}


// ... (other route handlers and setup code)


module.exports = {
  setup: setup
};
