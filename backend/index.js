import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();

// Enable CORS for all routes (you can customize the options based on your needs)
app.use(cors({
  origin: "*", // Frontend URL (adjust based on where your frontend runs)
  methods: "GET, POST, PUT, DELETE", // Allowed HTTP methods
  allowedHeaders: "Content-Type, Authorization, Cookie", // Allow specific headers
  credentials: true // Allow cookies to be sent with requests
}));

// Proxy endpoint for your frontend
app.get("/api/option-chain-indices", async (req, res) => {
  try {
    // Forward the request to the NSE India API (or any external API)
    const response = await axios.get("https://www.nseindia.com/api/option-chain-indices", {
      params: req.query, // Pass query params from frontend request
      headers: {
        // Forward necessary headers (like cookies) to the external API
        Cookie: req.headers.cookie, // Attach cookie from frontend request
        "User-Agent": req.headers["user-agent"] || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
        "Accept-Language": req.headers["accept-language"] || "en-US,en;q=0.5"
      },
      withCredentials: true // Ensure cookies are sent with the request
    });

    // Send the response from the external API back to the frontend
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error fetching data from external API:", error.response ? error.response.data : error.message);
    // Send a more detailed error message
    res.status(500).json({
      error: "Failed to fetch data from external API",
      details: error.response ? error.response.data : error.message
    });
  }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
