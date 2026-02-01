const express = require('express');
const { authAdmin, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const r = express.Router();

r.post('/login', authAdmin);
r.get('/me', protect, getMe);

module.exports = r;
