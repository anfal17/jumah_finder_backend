const express = require('express');
const router = express.Router();
const {
    submitReport,
    getReports,
    updateReportStatus,
    submitFeedback,
    getFeedbacks,
    updateFeedbackStatus
} = require('../controllers/supportController');
const { protect } = require('../middleware/authMiddleware');

// Reports routes
router.route('/reports')
    .post(submitReport)
    .get(protect, getReports);

router.route('/reports/:id')
    .put(protect, updateReportStatus);

// Feedbacks routes
router.route('/feedbacks')
    .post(submitFeedback)
    .get(protect, getFeedbacks);

router.route('/feedbacks/:id')
    .put(protect, updateFeedbackStatus);

module.exports = router;
