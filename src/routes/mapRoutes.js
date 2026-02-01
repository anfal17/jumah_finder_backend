const express = require('express');
const router = express.Router();
const mapController = require('../controllers/mapController');
const { protect } = require('../middleware/authMiddleware');

router.post('/extract', protect, mapController.extractCoordinates);

module.exports = router;
