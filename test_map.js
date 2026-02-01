const axios = require('axios');

// Mock function similar to src/utils/maps.js
const extractCoordinates = async (url) => {
    console.log('Testing URL:', url);
    let targetUrl = url;

    if (url.includes('goo.gl') || url.includes('maps.app.goo.gl')) {
        try {
            console.log('Sending HEAD request...');
            const response = await axios.head(url, {
                maxRedirects: 5,
                validateStatus: (status) => status >= 200 && status < 400,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });
            targetUrl = response.request.res.responseUrl || url;
            console.log('Resolved URL:', targetUrl);
        } catch (error) {
            console.error('Expansion Error:', error.message);
        }
    }

    // Checking patterns
    const patterns = [
        /@(-?\d+\.\d+),(-?\d+\.\d+)/,
        /q=(-?\d+\.\d+),(-?\d+\.\d+)/,
        /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/,
        /daddr=(-?\d+\.\d+),(-?\d+\.\d+)/
    ];

    for (const pattern of patterns) {
        const match = targetUrl.match(pattern);
        if (match) {
            console.log('Match found!', { lat: match[1], lng: match[2] });
            return;
        }
    }
    console.log('No match found for patterns.');
};

extractCoordinates('https://maps.app.goo.gl/5ZfvnJswU6wkc9487');
