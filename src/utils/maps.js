const axios = require('axios');

const extractCoordinates = async (url) => {
    if (!url) return null;

    let targetUrl = url;

    // Handle short URLs (maps.app.goo.gl or goo.gl) by following redirects
    if (url.includes('goo.gl') || url.includes('maps.app.goo.gl')) {
        try {
            console.log('Expanding URL:', url);
            const response = await axios.head(url, {
                maxRedirects: 5,
                validateStatus: (status) => status >= 200 && status < 400,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });
            // axios follows redirects by default for GET/HEAD, so response.request.res.responseUrl is the final URL
            targetUrl = response.request.res.responseUrl || url;
            console.log('Expanded to:', targetUrl);
        } catch (error) {
            console.error('Error expanding URL:', error.message);
            // Fallback: try using the input URL if head failed but maybe it's parseable?
        }
    }

    let lat = null;
    let lng = null;

    try {
        // Regex patterns (same as frontend)

        // pattern 1: @lat,lng
        const atRegex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
        const atMatch = targetUrl.match(atRegex);
        if (atMatch) {
            return { lat: parseFloat(atMatch[1]), lng: parseFloat(atMatch[2]) };
        }

        // pattern 2: search query q=lat,lng
        const qRegex = /q=(-?\d+\.\d+),(-?\d+\.\d+)/;
        const qMatch = targetUrl.match(qRegex);
        if (qMatch) {
            return { lat: parseFloat(qMatch[1]), lng: parseFloat(qMatch[2]) };
        }

        // pattern 3: !3dlat!4dlng (embeds/data params)
        const dataRegex = /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/;
        const dataMatch = targetUrl.match(dataRegex);
        if (dataMatch) {
            return { lat: parseFloat(dataMatch[1]), lng: parseFloat(dataMatch[2]) };
        }

        // pattern 4: destination daddr=lat,lng
        const daddrRegex = /daddr=(-?\d+\.\d+),(-?\d+\.\d+)/;
        const daddrMatch = targetUrl.match(daddrRegex);
        if (daddrMatch) {
            return { lat: parseFloat(daddrMatch[1]), lng: parseFloat(daddrMatch[2]) };
        }

    } catch (e) {
        console.error("Error parsing maps URL pattern:", e);
    }

    return null;
};

module.exports = { extractCoordinates };
