const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema({
    username: String,
    feedback: String,
    videoLink: String
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

function setup(app) {
    app.post('/api/feedback', (req, res) => {
        const newFeedback = new Feedback({
            username: req.body.username,
            feedback: req.body.feedback,
            videoLink: req.body.videoLink
        });

        newFeedback.save()
            .then(feedback => {
                console.log('Feedback created:', feedback);
                res.status(200).json({ message: 'Feedback Created successfully' });
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Error saving feedback' });
            });
    });

    app.get('/api/feedbacks', async (req, res) => {
        try {
            const requestedFeedback = await Feedback.find({});
            res.status(200).json(requestedFeedback);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error fetching requested feedback' });
        }
    });

    app.get('/', (req, res) => {
        res.redirect('/Feedback.html');
    });
}

module.exports = {
    setup: setup
};
