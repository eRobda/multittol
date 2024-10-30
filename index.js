// server.js

import express from 'express';
import axios from 'axios';

const app = express();

// Route to proxy MP3 files
app.get('/proxy', async (req, res) => {
    const { url } = req.query; // Get the URL parameter from the query string

    if (!url) {
        return res.status(400).send('URL parameter is required.'); // Respond with error if no URL is provided
    }

    try {
        // Make a request to the MP3 file URL
        const response = await axios.get(url, {
            responseType: 'stream', // Stream the response
        });

        // Set the content type to audio/mpeg
        res.set('Content-Type', 'audio/mpeg');

        // Pipe the response stream to the client response
        response.data.pipe(res);
    } catch (error) {
        console.error('Error fetching the MP3 file:', error.message);
        res.status(500).send('Error fetching the MP3 file.'); // Respond with error if fetching fails
    }
});

// Sample route to respond with a greeting
app.get('/scd', (req, res) => {
    const name = req.query.name || 'Guest'; // Get name from query, default to 'Guest'
    res.send(`Hello ${name}!`); // Respond with greeting
});

// Start the server
const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
