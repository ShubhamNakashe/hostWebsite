// // geminiapi.js
const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config()
const GeminiAPI = process.env.GeminiAPI;

router.post('/generatePlan', async (req, res) => {
  try {
    const { queryParams, days, maxPeople, attractions, budget,foodRef, cuisine,selectedAttractions, cuisineRef } = req.body;

    const userInputMessage = `Generate a Travel Plan to visit ${queryParams} with a budget of ${budget} for ${days} days having ${maxPeople} people . It should include ${attractions} kind of places (which are close to each other), suggest places according to budget (must include transportation cost too). Suggest restaurants (for breakfast, lunch, and dinner) for each day having ${foodRef} food types and ${cuisine} type of cuisine, provide a proper plan along with local transportation (along with cost) facilities to pick between the places, hotels, and restaurants mentioned in the plan. Suggest hotels to stay for the day (suitable for the budget). Give safety tips for the generated plan as well as give emergency contacts (must include police, ambulance, fire brigade, tourist helpline, Local Embassy/Consulate along with others) details for the particular destination mentioned at the end of the generated plan. Give a time slot for visiting each place. For each day's itinerary, include time slots for visiting places and allocate time for travel between locations. Additionally, suggest suitable hotels for accommodation within the specified budget. At the end of the generated plan, provide safety tips(specific to the travel plan and places) and emergency contacts, including police, ambulance, fire brigade, tourist helpline, and local Embassy/Consulate details. Please format the time slots in a 12-hour clock format (e.g., 10:00 AM, 2:30 PM).`;

    const genAI = new GoogleGenerativeAI(`${GeminiAPI}`);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(userInputMessage);
    const response = await result.response;

    const generatedPlan = response.text();
    
    // You can save the generated plan to a database or file if needed

    res.json({ success: true, generatedPlan });
  } catch (error) {
    console.error('Error generating plan:', error);
    res.status(500).json({ success: false, error: 'Error generating plan' });
  }
});

module.exports = router;
