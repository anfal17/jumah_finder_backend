const mongoose = require('mongoose');

const masjidSchema = new mongoose.Schema({
    name: { type: String, required: true },
    area: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    city: { type: String, required: true, default: 'Bengaluru' },
    mapLink: { type: String },
    shifts: [{
        time: { type: String, required: true },
        lang: { type: String }
    }],
    facilities: {
        ladies: { type: Boolean, default: false },
        parking: { type: Boolean, default: false },
        outsidersAllowed: { type: Boolean, default: true }
    },
    verified: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Masjid', masjidSchema);
