const express = require('express');
const router = express.Router();
const {
    submitRequest,
    getRequests,
    getRequestById,
    updateRequest,
    approveRequest,
    rejectRequest
} = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(submitRequest)
    .get(protect, getRequests);

router.route('/:id')
    .get(protect, getRequestById)
    .put(protect, updateRequest);

router.post('/:id/approve', protect, approveRequest);
router.post('/:id/reject', protect, rejectRequest);

module.exports = router;
