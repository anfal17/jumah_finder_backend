const express = require('express');
const router = express.Router();
const {
    getMasjids,
    getMasjidById,
    createMasjid,
    updateMasjid,
    deleteMasjid
} = require('../controllers/masjidController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(getMasjids)
    .post(protect, createMasjid);

router.route('/:id')
    .get(getMasjidById)
    .put(protect, updateMasjid)
    .delete(protect, deleteMasjid);

module.exports = router;
