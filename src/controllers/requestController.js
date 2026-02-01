const Request = require('../models/Request');
const Masjid = require('../models/Masjid');

// @desc    Submit a new masjid request
// @route   POST /api/requests
// @access  Public
const submitRequest = async (req, res) => {
    try {
        const request = new Request(req.body);
        const createdRequest = await request.save();
        res.status(201).json(createdRequest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all requests
// @route   GET /api/requests
// @access  Private/Admin
const getRequests = async (req, res) => {
    try {
        // Can filter by status if query param provided ?status=pending
        const filter = req.query.status ? { status: req.query.status } : {};
        const requests = await Request.find(filter).sort({ createdAt: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single request
// @route   GET /api/requests/:id
// @access  Private/Admin
const getRequestById = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        if (request) {
            res.json(request);
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update request details (before approval)
// @route   PUT /api/requests/:id
// @access  Private/Admin
const updateRequest = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);

        if (request) {
            Object.assign(request, req.body);
            const updatedRequest = await request.save();
            res.json(updatedRequest);
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Approve request (Create Masjid)
// @route   POST /api/requests/:id/approve
// @access  Private/Admin
const approveRequest = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        if (request.status === 'approved') {
            return res.status(400).json({ message: 'Request already approved' });
        }

        // Create new Masjid from request data
        const masjid = new Masjid({
            name: request.name,
            area: request.area,
            lat: request.lat,
            lng: request.lng,
            city: request.city,
            mapLink: request.mapLink,
            shifts: request.shifts,
            facilities: request.facilities,
            verified: true
        });

        await masjid.save();

        // Update request status
        request.status = 'approved';
        request.reviewedBy = req.admin._id;
        request.reviewedAt = Date.now();
        await request.save();

        res.json({ message: 'Request approved and Masjid created', masjid });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Reject request
// @route   POST /api/requests/:id/reject
// @access  Private/Admin
const rejectRequest = async (req, res) => {
    try {
        const { adminNote } = req.body;
        const request = await Request.findById(req.params.id);

        if (request) {
            request.status = 'rejected';
            request.adminNote = adminNote || 'No reason provided';
            request.reviewedBy = req.admin._id;
            request.reviewedAt = Date.now();
            await request.save();
            res.json({ message: 'Request rejected' });
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    submitRequest,
    getRequests,
    getRequestById,
    updateRequest,
    approveRequest,
    rejectRequest
};
