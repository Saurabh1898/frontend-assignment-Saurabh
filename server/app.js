// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

app.post('/api/fetchStockData', (req, res) => {
    // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION
    try {
        const { stockSymbol, date } = req.body;

        // Ensure stockSymbol and date are provided in the request
        if (!stockSymbol || !date) {
            return res.status(400).json({ error: "Stock symbol and date are required." });
        }

        // Format the date to match Polygon API's requirements (YYYY-MM-DD)
        const formattedDate = new Date(date).toISOString().split('T')[0];

        // Construct the API URL to fetch trade statistics for the given stock and date
        const apiUrl = `https://api.polygon.io/v1/open-close/${stockSymbol}/${formattedDate}?apiKey=${process.env.POLYGON_API_KEY}`;

        // Make a request to the Polygon API
        const response = await axios.get(apiUrl);

        // Extract the trade statistics from the response
        const { open, high, low, close, volume } = response.data;

        // Return the trade statistics as a JSON response
        res.json({ open, high, low, close, volume });
    } catch (error) {
        console.error("Error fetching trade statistics:", error.message);
        res.status(500).json({ error: "Failed to fetch trade statistics." });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
