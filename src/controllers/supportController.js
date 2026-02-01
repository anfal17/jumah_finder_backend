const Report = require('../models/Report');
const Feedback = require('../models/Feedback');

// @desc    Submit a report
// @route   POST /api/reports
// @access  Public
const submitReport = async (req, res) => {
    try {
        const report = new Report(req.body);
        const savedReport = await report.save();
        res.status(201).json(savedReport);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all reports
// @route   GET /api/reports
// @access  Private/Admin
const getReports = async (req, res) => {
    try {
        const reports = await Report.find({}).sort({ createdAt: -1 });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update report status
// @route   PUT /api/reports/:id
// @access  Private/Admin
const updateReportStatus = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (report) {
            report.status = req.body.status || report.status;
            const updatedReport = await report.save();
            res.json(updatedReport);
        } else {
            res.status(404).json({ message: 'Report not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Submit feedback
// @route   POST /api/feedbacks
// @access  Public
const submitFeedback = async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        const savedFeedback = await feedback.save();
        res.status(201).json(savedFeedback);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all feedbacks
// @route   GET /api/feedbacks
// @access  Private/Admin
const getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update feedback status
// @route   PUT /api/feedbacks/:id
// @access  Private/Admin
const updateFeedbackStatus = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (feedback) {
            feedback.status = req.body.status || feedback.status;
            const updatedFeedback = await feedback.save();
            res.json(updatedFeedback);
        } else {
            res.status(404).json({ message: 'Feedback not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    submitReport,
    getReports,
    updateReportStatus,
    submitFeedback,
    getFeedbacks,
    updateFeedbackStatus
};
