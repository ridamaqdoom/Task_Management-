// ownerbooking.js

// Wait for the DOM to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", () => {
    // Select the list where requested appointments will be displayed
    const requestedList = document.getElementById("requestedList");

    // Function to fetch requested appointments from the server
    async function fetchRequestedAppointments() {
        try {
            // Fetch data from your server endpoint (assuming it returns JSON data)
            const response = await fetch('/api/requestedAppointments');
            const appointments = await response.json();

            // Call the function to display requested appointments
            displayRequestedAppointments(appointments);
        } catch (error) {
            console.error('Error fetching requested appointments:', error);
        }
    }

    // Function to display requested appointments in the DOM
    function displayRequestedAppointments(appointments) {
        // Clear the list before adding new items
        requestedList.innerHTML = "";

        // Loop through the fetched appointments and create list items
        appointments.forEach((appointment, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `Appointment ${index + 1}: ${appointment.firstName} ${appointment.lastName} - ${appointment.service}`;
            requestedList.appendChild(listItem);
        });
    }

    // Fetch and display requested appointments when the page loads
    fetchRequestedAppointments();
});
