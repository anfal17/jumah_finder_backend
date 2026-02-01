const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    masjidId: { type: mongoose.Schema.Types.ObjectId, ref: 'Masjid', required: false }, // Optional in case masjid ID is missing from old data
    masjidName: { type: String, required: true },
    issueType: { type: String, required: true }, // incorrect_time, mosque_closed, other
    correctTime: { type: String },
    description: { type: String },
    status: { type: String, enum: ['pending', 'resolved'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
