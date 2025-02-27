/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function toggleMenu() {
    var nav = document.getElementById("myDropdown");
    nav.classList.toggle("show");
}

function tM() {
    var menuu = document.getElementById("menuu");
    menuu.classList.toggle("show");
}
document.getElementById("submitBtn").addEventListener("click", function () {
    event.preventDefault(); 
    const username = document.getElementById("username").value;
    const feedbackText = document.getElementById("feedback").value;
    const video = document.getElementById("video").files[0];

    if (username && (feedbackText || video)) {
        const feedbackList = document.getElementById("feedbackList");
        const feedbackItem = document.createElement("div");
        feedbackItem.classList.add("feedback-item");

        const userInfo = document.createElement("p");
        userInfo.textContent = `Submitted by: ${username}`;
        feedbackItem.appendChild(userInfo);

        if (feedbackText) {
            const feedbackPara = document.createElement("p");
            feedbackPara.textContent = feedbackText;
            feedbackItem.appendChild(feedbackPara);
        }

        if (video) {
            const videoElement = document.createElement("video");
            videoElement.src = URL.createObjectURL(video);
            videoElement.controls = true;
            feedbackItem.appendChild(videoElement);
        }

        feedbackList.appendChild(feedbackItem);

        // Clear input fields after submission
        document.getElementById("username").value = "";
        document.getElementById("feedback").value = "";
        document.getElementById("video").value = "";
    } else {
        alert("Please enter your name and provide feedback or upload a video.");
    }
});


function onSubmitForm(event) {
    event.preventDefault();
  
    // Get form data
    const formData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      selectService: document.getElementById('selectService').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
    };
  
    // Make a POST request to the server
    fetch('/api/bookAppointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json()) // Parse JSON response from the server
      .then(data => {
        // Check if the response contains a success message
        if (data.message === 'Appointment booked successfully') {
          // Display success message as an alert
          alert('Appointment booked successfully');
          window.location.reload();

        } else {
          // If there's an error, display the error message as an alert
          alert(data.error || 'Error booking appointment');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      });
  }
  

  