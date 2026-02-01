const Masjid = require('../models/Masjid');

// @desc    Get all masjids
// @route   GET /api/masjids
// @access  Public
const getMasjids = async (req, res) => {
    try {
        const masjids = await Masjid.find({});
        res.json(masjids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single masjid
// @route   GET /api/masjids/:id
// @access  Public
const getMasjidById = async (req, res) => {
    try {
        const masjid = await Masjid.findById(req.params.id);
        if (masjid) {
            res.json(masjid);
        } else {
            res.status(404).json({ message: 'Masjid not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a masjid
// @route   POST /api/masjids
// @access  Private/Admin
const createMasjid = async (req, res) => {
    try {
        const masjid = new Masjid(req.body);
        const createdMasjid = await masjid.save();
        res.status(201).json(createdMasjid);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a masjid
// @route   PUT /api/masjids/:id
// @access  Private/Admin
const updateMasjid = async (req, res) => {
    try {
        const masjid = await Masjid.findById(req.params.id);

        if (masjid) {
            Object.assign(masjid, req.body);
            const updatedMasjid = await masjid.save();
            res.json(updatedMasjid);
        } else {
            res.status(404).json({ message: 'Masjid not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a masjid
// @route   DELETE /api/masjids/:id
// @access  Private/Admin
const deleteMasjid = async (req, res) => {
    try {
        const masjid = await Masjid.findById(req.params.id);

        if (masjid) {
            await masjid.deleteOne();
            res.json({ message: 'Masjid removed' });
        } else {
            res.status(404).json({ message: 'Masjid not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMasjids,
    getMasjidById,
    createMasjid,
    updateMasjid,
    deleteMasjid
};
