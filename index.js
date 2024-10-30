import express, { Router } from "express";
import axios from "axios";
import serverless from "serverless-http";

const api = express();
const router = Router();

// Proxy route to fetch MP3 files
router.get("/proxy", async (req, res) => {
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

// Sample greeting route
router.get("/hello", (req, res) => res.send("Hello World!"));

api.use("/api/", router);

export const handler = serverless(api);
