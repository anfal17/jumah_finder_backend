const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    content: { type: String, required: true },
    type: { type: String, default: 'general' },
    status: { type: String, enum: ['pending', 'reviewed'], default: 'pending' },
    contactEmail: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
