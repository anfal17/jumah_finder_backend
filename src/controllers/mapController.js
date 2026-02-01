const { extractCoordinates } = require('../utils/maps');

exports.extractCoordinates = async (req, res) => {
    try {
        const { url } = req.body;
        console.log('Received map extract request:', url);
        if (!url) {
            return res.status(400).json({ message: 'URL is required' });
        }

        const coords = await extractCoordinates(url);

        if (coords) {
            res.json(coords);
        } else {
            res.status(404).json({ message: 'Could not extract coordinates from this URL' });
        }
    } catch (error) {
        console.error('Map extraction error:', error);
        res.status(500).json({ message: 'Server error processing map link' });
    }
};
