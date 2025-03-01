import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const healthRoute = express.Router();

// Health tips route
healthRoute.post('/health-tips', async (req, res) => {
  const { age, weight, lifestyle } = req.body;

  const options = {
    method: 'POST',
    url: 'https://holyentgold-medical-assistant-api.p.rapidapi.com/health-tips',
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': 'holyentgold-medical-assistant-api.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
    data: { age, weight, lifestyle },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error('Error Response:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to fetch health tips',
      details: error.response?.data || error.message,
    });
  }
});


export default healthRoute;
