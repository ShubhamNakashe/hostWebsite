const express = require('express');
const router = express.Router();
// const fetch = require('node-fetch');
const fetch = require('isomorphic-fetch');

require('dotenv').config();

const apiKey = process.env.rapidApiKey;
const apiHost = "tripadvisor16.p.rapidapi.com";
// Endpoint to search for location
router.get('/searchLocation', async (req, res) => {
  const { query } = req.query;
  try {
    const apiUrl = `https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation?query=${query}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": apiHost,
      },
    });

    if (!response.ok) {
      throw new Error("Location search failed");
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to search for restaurants
router.get('/searchRestaurants', async (req, res) => {
  const { locationId } = req.query;
  try {
    const apiUrl = `https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=${locationId}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": apiHost,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;