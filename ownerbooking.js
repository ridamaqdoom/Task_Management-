// Sample data for requested appointments
const requestedAppointmentsData = [
    // Sample data containing appointment details
    { firstName: "John", lastName: "Doe", service: "Service 1", email: "john@example.com", message: "Appointment request for Service 1." },
    { firstName: "Alice", lastName: "Smith", service: "Service 2", email: "alice@example.com", message: "Appointment request for Service 2." }
];
const confirmedAppointmentsData = []; // Array to store confirmed appointments

const requestedList = document.getElementById("requestedList");
const appointmentDetails = document.getElementById("appointmentDetails");
const appointmentInfo = document.getElementById("appointmentInfo");
const approveBtn = document.getElementById("approveBtn");
const declineBtn = document.getElementById("declineBtn");

// Function to display requested appointments
function displayRequestedAppointments() {
    requestedList.innerHTML = "";
    requestedAppointmentsData.forEach((appointment, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Appointment ${index + 1}`;
        listItem.addEventListener("click", () => showAppointmentDetails(appointment));
        requestedList.appendChild(listItem);
    });
}

// Function to show appointment details
// Function to show appointment details
function showAppointmentDetails(appointment) {
    appointmentInfo.innerHTML = `
        <p><strong>First Name:</strong> ${appointment.firstName}</p>
        <p><strong>Last Name:</strong> ${appointment.lastName}</p>
        <p><strong>Service:</strong> ${appointment.service}</p>
        <p><strong>Email:</strong> ${appointment.email}</p>
        <p><strong>Message:</strong> ${appointment.message}</p>
    `;
    appointmentDetails.classList.remove("hidden");

    // Remove existing event listeners
    approveBtn.removeEventListener("click", approveAppointment);
    declineBtn.removeEventListener("click", hideAppointmentDetails);

    // Add new event listeners
    approveBtn.addEventListener("click", () => approveAppointment(appointment));
    declineBtn.addEventListener("click", hideAppointmentDetails);
}

// Function to approve the appointment

function approveAppointment(appointment) {
    // Logic to handle approval (send to backend, update data, etc.)
    // For now, let's just log the approved appointment
    console.log("Approved appointment: ", appointment);

    // Check if the appointment is already confirmed
    const isAlreadyConfirmed = confirmedAppointmentsData.some(confirmedAppointment => {
        return confirmedAppointment.firstName === appointment.firstName &&
               confirmedAppointment.lastName === appointment.lastName &&
               confirmedAppointment.service === appointment.service;
    });

    // If the appointment is not already confirmed, add it to the confirmed appointments list
    if (!isAlreadyConfirmed) {
        confirmedAppointmentsData.push(appointment);

        const confirmedList = document.getElementById("confirmedList");
        const listItem = document.createElement("li");
        listItem.textContent = `${appointment.firstName} ${appointment.lastName} - ${appointment.service}`;
        confirmedList.appendChild(listItem);
    }

    // Remove the approved appointment from the list of requested appointments
    const index = requestedAppointmentsData.indexOf(appointment);
    if (index !== -1) {
        requestedAppointmentsData.splice(index, 1);
        // Update the UI
        displayRequestedAppointments();
        hideAppointmentDetails();
    }
}

// Function to hide appointment details
function hideAppointmentDetails() {
    appointmentDetails.classList.add("hidden");
    appointmentInfo.innerHTML = "";
    approveBtn.removeEventListener("click", approveAppointment);
    declineBtn.removeEventListener("click", hideAppointmentDetails);
}

// Initial display of requested appointments
displayRequestedAppointments();
