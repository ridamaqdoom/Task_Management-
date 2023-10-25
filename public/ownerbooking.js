function setup(app) {
function displayAppointments() {
    // Make a request to the server to fetch appointments
    fetch('http://localhost:3000/appointment')
      .then(response => response.json())
      .then(appointments => {
        const requestedAppointmentsList = document.getElementById('requestedList');
        const confirmedAppointmentsList = document.getElementById('confirmedList');
  
        // Loop through the appointments and display them
        appointments.forEach(appointment => {
          const appointmentDiv = document.createElement('div');
          appointmentDiv.innerHTML = `
            <p>Name: ${appointment.firstName} ${appointment.lastName}</p>
            <p>Service: ${appointment.service}</p>
            <p>Email: ${appointment.email}</p>
            <button onclick="acceptAppointment('${appointment._id}')">Accept</button>
            <button onclick="rejectAppointment('${appointment._id}')">Reject</button>
          `;
  
          // Append the appointment to the appropriate list
          if (0 == 0) {
            requestedAppointmentsList.appendChild(appointmentDiv);
          } else {
            confirmedAppointmentsList.appendChild(appointmentDiv);
          }
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  // When the page loads, call the function to display appointments
  displayAppointments();
}
  module.exports = {
    setup: setup
  };
  