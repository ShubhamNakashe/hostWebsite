const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();

const API_KEY = process.env.rapidApiKey;
const API_HOST = "tripadvisor16.p.rapidapi.com";

router.get('/search', async (req, res) => {
  const latitude = encodeURIComponent(req.query.latitude);
  const longitude = encodeURIComponent(req.query.longitude);
  const checkIn = encodeURIComponent(req.query.checkIn);
  const checkOut = encodeURIComponent(req.query.checkOut);

  const url = `https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotelsByLocation?latitude=${latitude}&longitude=${longitude}&checkIn=${checkIn}&checkOut=${checkOut}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    
    res.json({
      data:result.data.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
