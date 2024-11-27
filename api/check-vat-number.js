// api/check-vat-number.js

const fetch = require('node-fetch');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const { countryCode, vatNumber } = req.body;

    if (!countryCode || !vatNumber) {
        res.status(400).json({ error: 'Missing countryCode or vatNumber' });
        return;
    }

    try {
        const response = await fetch('https://ec.europa.eu/taxation_customs/vies/rest-api/check-vat-number', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                countryCode: countryCode.toUpperCase(),
                vatNumber: vatNumber
            })
        });

        if (!response.ok) {
            throw new Error(`VIES API responded with status ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error contacting VIES API:', error);
        res.status(500).json({ error: 'Failed to validate VAT number' });
    }
};