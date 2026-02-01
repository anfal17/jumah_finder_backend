require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// CORS Configuration - Allow multiple origins including Vercel previews
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://jumah-finder-blr.vercel.app',  // Production domain
    process.env.FRONTEND_URL
].filter(Boolean);

// Regex to match Vercel preview URLs (anfals-projects-00db9509.vercel.app)
const vercelPreviewPattern = /^https:\/\/.*-anfals-projects-00db9509\.vercel\.app$/;

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, etc)
        if (!origin) return callback(null, true);

        // Check exact match or Vercel preview pattern
        if (allowedOrigins.includes(origin) || vercelPreviewPattern.test(origin)) {
            callback(null, true);
        } else {
            console.log('Blocked by CORS:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
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
