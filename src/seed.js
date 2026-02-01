require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');
const Masjid = require('./models/Masjid');

const importData = async () => {
    await connectDB();

    try {
        // Check if superadmin exists
        const adminExists = await Admin.findOne({ email: process.env.SUPERADMIN_EMAIL });

        if (adminExists) {
            console.log('Superadmin already exists');
        } else {
            const admin = new Admin({
                email: process.env.SUPERADMIN_EMAIL,
                passwordHash: process.env.SUPERADMIN_PASSWORD, // Will be hashed by pre-save hook
                role: 'superadmin'
            });

            await admin.save();
            console.log('Superadmin created successfully');
        }

        // Seed Masjids (Clear old data first to avoid validation errors)
        await Masjid.deleteMany({});
        console.log('Old masjids cleared');

        const masjids = [
            {
                name: "Masjid-e-Bilal",
                area: "Bannerghatta Road",
                lat: 12.9249,
                lng: 77.6003,
                shifts: [
                    { time: "1:30 PM", lang: "Urdu" },
                    { time: "2:30 PM", lang: "Urdu" }
                ],
                facilities: { ladies: true, parking: true, outsidersAllowed: true },
                verified: true
            },
            {
                name: "Jamia Masjid",
                area: "City Market",
                lat: 12.9632,
                lng: 77.5759,
                shifts: [
                    { time: "1:30 PM", lang: "Urdu" }
                ],
                facilities: { ladies: false, parking: false, outsidersAllowed: true },
                verified: true
            },
            {
                name: "Masjid-e-Khadriya",
                area: "Millers Road",
                lat: 12.9961,
                lng: 77.5956,
                shifts: [
                    { time: "1:15 PM", lang: "Urdu" }
                ],
                facilities: { ladies: false, parking: true, outsidersAllowed: true },
                verified: true
            },
            {
                name: "Modispaces Office Prayer Room",
                area: "Indiranagar",
                lat: 12.9734,
                lng: 77.6433,
                shifts: [
                    { time: "1:30 PM", lang: "English" }
                ],
                facilities: { ladies: false, parking: false, outsidersAllowed: false },
                verified: true
            }
        ];

        await Masjid.insertMany(masjids);
        console.log('Masjids seeded successfully');

        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
