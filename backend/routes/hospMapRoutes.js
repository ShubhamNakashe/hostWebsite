const express = require("express");
const router = express.Router();
const fetch = require("isomorphic-fetch");
require('dotenv').config();

const rapidApiKey = process.env.rapidApiKey;
const hospMapRapidApiHost = "local-business-data.p.rapidapi.com";

router.get("/search", async (req, res) => {
  try {
    console.log("entered");

    // Extract and log query parameters
    const { lat, lng, category } = req.query;
    console.log(`lat: ${lat}, lng: ${lng}, category: ${category}`);

    // Construct the request URL
    const url = `https://local-business-data.p.rapidapi.com/search-nearby?query=${category}&lat=${lat}&lng=${lng}&limit=5&language=en&region=us`;
    console.log(`Request URL: ${url}`);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": `${rapidApiKey}`,
        "X-RapidAPI-Host": `${hospMapRapidApiHost}`,
      },
    });

    if (!response.ok) {
      // Log the response status and text for debugging
      const errorText = await response.text();
      console.error(
        `Error fetching nearby locations: ${response.status} ${response.statusText}`
      );
      console.error(`Response body: ${errorText}`);
      throw new Error(
        `HTTP error! Status: ${response.status} ${response.statusText}`
      );
    }

    console.log("Response received:", response);
    const data = await response.json();
    console.log("Data received:", data);

    const locationData = data.data.map((result) => ({
      lat: result.latitude,
      lng: result.longitude,
      name: result.name || "Location",
      address: result.full_address || "No address available",
      rating: result.rating || "No rating available",
      phone: result.phone_number || "No phone available",
      website: result.website || "No website available",
    }));

    res.json(locationData);
  } catch (error) {
    console.error("Error fetching nearby locations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;