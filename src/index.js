require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// Routes (Placeholders)
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/masjids', require('./routes/masjidRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));
app.use('/api/maps', require('./routes/mapRoutes'));
app.use('/api', require('./routes/supportRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
