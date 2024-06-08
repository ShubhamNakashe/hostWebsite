const express = require('express');
const router = express.Router();
const fetch = require('isomorphic-fetch');
require('dotenv').config();

const API_KEY = process.env.weatherApiKey; // Replace with your OpenWeatherMap API key

router.get('/location', async (req, res) => {
    try {
        const { city } = req.query;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${API_KEY}`; // Change api_key to API_KEY
        const response = await fetch(url);
        const data = await response.json();
        
        if (!data.main || !data.weather || !data.weather[0]) {
                        throw new Error("Invalid data in the response");
                    }
                    res.json({
                        lat:data.coord.lat,
                        lon:data.coord.lon,
                        temperature: data.main.temp,
                        humidity: data.main.humidity,
                        feels_like: data.main.feels_like,
                        weather: data.weather[0].main,
                        description: data.weather[0].description,
                        clouds: data.clouds.all,
                        mintemp:data.main.temp_min,
                        maxtemp:data.main.temp_max
                    });
    } catch (error) {
        console.error('Error fetching location data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/current', async (req, res) => {
    try {
        const { city } = req.query;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching current weather:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Endpoint to fetch forecast data
router.get('/forecast', async (req, res) => {
    try {
        const { lon, lat } = req.query; // Extract longitude and latitude from the query parameters
        const url = `https://api.openweathermap.org/data/2.5/forecast?lon=${lon}&lat=${lat}&units=metric&appid=${API_KEY}`; // Corrected URL
        const response = await fetch(url);
        const data = await response.json();
        if (!data.list || data.list.length === 0) {
            throw new Error("Invalid data in the response");
        }
        const forecastData = data.list.map(item => ({
            temperature: item.main.temp,
            humidity: item.main.humidity,
            feels_like: item.main.feels_like,
            mintemp: item.main.temp_min,
            maxtemp: item.main.temp_max,
            weather: item.weather[0].main,
            description: item.weather[0].description,
            clouds: item.clouds.all,
            datetime: item.dt_txt
        }));
        res.json(forecastData);
    } catch (error) {
        console.error('Error fetching forecast data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;

