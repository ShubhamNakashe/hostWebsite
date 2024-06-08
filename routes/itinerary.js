const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');
const fetch = require('node-fetch');

router.post('/saveItinerary', async (req, res)=>{
    const {username,searchIti}=req.body;
  
    try{
      const user = await UserModel.findOne({username});
      if(user){
        const itineraryItem = {
          destination: searchIti.destination,
          numberofPeople: searchIti.numberofPeople,
          attractions : searchIti.attractions,
          cuisine : searchIti.cuisine,
        };
          user.searchItiHistory.push(itineraryItem);
          await user.save();
          res.json({success : true , msg:'Searched info saved successfully'});
      }else{
          res.status(404).json({success:false , msg:'User not found'});
      }
  
    }catch(error){
      console.error('Error saving itinerary information',error);
      res.status(500).json({success:false ,msg:'ServerError'})
    }
  
  });
  
  
  router.post('/saveHotel', async (req, res)=>{
      const {username,searchHotel}=req.body;
    
      try{
        const user = await UserModel.findOne({username});
        if(user){
          const hotelItem = {
            location:searchHotel.location ,
            checkin:searchHotel.checkin ,
            checkout:searchHotel.checkout ,
            adults:searchHotel.adults ,
            child:searchHotel.child ,
          };
            user.searchHotelHistory.push(hotelItem);
            await user.save();
            res.json({success : true , msg:'Searched info saved successfully'});
        }else{
            res.status(404).json({success:false , msg:'User not found'});
        }
    
      }catch(error){
        console.error('Error saving itinerary information',error);
        res.status(500).json({success:false ,msg:'ServerError'})
      }
    
    });
    
    router.post("/saveReview", async (req, res) => {
      const { username, review } = req.body;
    
      try {
        // Find the user by username
        const user = await UserModel.findOne({ username });
    
        if (user) {
          // Add the review to the user's reviews array
          user.reviews.push({
            location: review.location,
            review: review.review,
          });
    
          // Save the user document
          await user.save();
    
          // Respond with a success message
          res.json({ success: true, msg: "Review saved successfully" });
        } else {
          // Respond with an error if the user is not found
          res.status(404).json({ success: false, msg: "User not found" });
        }
      } catch (error) {
        // Log the error and respond with a server error message
        console.error("Error saving review", error);
        res.status(500).json({ success: false, msg: "ServerError" });
      }
    });
    
    //view all users' reviews
    router.get("/getAllReviews", async (_, res) => {
      try {
        // Find all users with non-empty review arrays
        const reviews = await UserModel.find({
          reviews: { $exists: true, $not: { $size: 0 } },
        });
    
        // Extract relevant data (username and reviews) for each user
        const formattedReviews = reviews.map((user) => ({
          username: user.username,
          reviews: user.reviews,
        }));
    
        console.log("Fetched reviews:", formattedReviews);
    
        // Respond with the formatted reviews
        res.json({ success: true, reviews: formattedReviews });
      } catch (error) {
        console.error("Error fetching all reviews:", error);
        res.status(500).json({ success: false, msg: "ServerError" });
      }
    });
  
    router.post('/saveBookmarkedItinerary', async (req, res) => {
      const { username, itinerary, destination } = req.body;
    
      try {
        const user = await UserModel.findOne({ username });
    
        if (user) {
          // Add the bookmarked itinerary to the user's document
          user.bookmarkedItineraries.push({ itinerary, destination });
          await user.save();
    
          return res.json({ success: true, msg: 'Bookmarked itinerary saved successfully' });
        } else {
          return res.status(404).json({ success: false, msg: 'User not found' });
        }
      } catch (error) {
        console.error('Error saving bookmarked itinerary:', error);
        return res.status(500).json({ success: false, msg: 'Server Error' });
      }
    });
    
    router.get('/getBookmarkedItineraries/:username', async (req, res) => {
      const { username } = req.params;
    
      try {
        const user = await UserModel.findOne({ username });

        if (user) {
          // Retrieve the bookmarked itineraries and destinations from the user's document
          const bookmarkedItineraries = user.bookmarkedItineraries.map(item => ({
            itinerary: item.itinerary,
            destination: item.destination
          }));
    
          return res.json({ success: true, bookmarkedItineraries });
        } else {
          return res.status(404).json({ success: false, msg: 'User not found' });
        }
      } catch (error) {
        console.error('Error retrieving bookmarked itineraries:', error);
        return res.status(500).json({ success: false, msg: 'Server Error' });
      }
    });
    
  
    
    router.post('/removeBookmarkedItinerary', async (req, res) => {
      try {
        const { username, indexToRemove } = req.body;
        const user = await UserModel.findOne({ username });
    
        if (!user) {
          return res.status(404).json({ success: false, msg: 'User not found' });
        }
        // Remove the itinerary at the specified index
        user.bookmarkedItineraries.splice(indexToRemove, 1);
        // Save the updated user data
        await user.save();
        return res.json({ success: true, msg: 'Bookmarked itinerary removed successfully' });
      } catch (error) {
        console.error('Error removing bookmarked itinerary:', error);
        return res.status(500).json({ success: false, msg: 'Server Error' });
      }
    });
      
  module.exports = router;
  