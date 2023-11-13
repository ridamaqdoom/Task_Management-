const mongoose = require("mongoose");
const multer = require('multer');
const upload = multer(); // Initialize Multer
const feedbackSchema = new mongoose.Schema({
    username: String,
    feedback: String,
    video: {
        data: String,
        contentType: String
    }
});


const Feedback = mongoose.model('Feedback', feedbackSchema);

function setup(app) {
    app.post('/api/feedback', upload.single('video'), (req, res) => {
        if (req.file) {
            // File has been uploaded
            const videoBuffer = req.file.buffer;
    
            // Create a new feedback instance
            const newFeedback = new Feedback({
                username: req.body.username,
                feedback: req.body.feedback,
                video: {
                    data: videoBuffer,
                    contentType: req.file.mimetype
                }
            });
    
            // Save the feedback to the database using promises
            newFeedback.save()
                .then(feedback => {
                    console.log('Feedback created:', feedback);
                    // Send JSON response with success message
                    res.status(200).json({ message: 'Feedback Created successfully' });
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).json({ error: 'Error saving feedback' });
                });
        } else {
            // Handle case where no file is uploaded
            res.status(400).json({ error: 'No file uploaded' });
        }
    });

    app.get('/api/feedbacks', async (req, res) => {
        try {
            // Fetch requested feedback from the database
            const requestedFeedback = await Feedback.find({/* Add conditions if necessary */});

            // Send the requested feedback as JSON response
            res.status(200).json(requestedFeedback);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error fetching requested feedback' });
        }
    });

    app.get('/', (req, res) => {
        // You can send a response or render an HTML page here if needed
        res.redirect('/Feedback.html');
    });
}

module.exports = {
    setup: setup
};
