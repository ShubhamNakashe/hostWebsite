const mongoose = require("mongoose");
const { Schema } = mongoose

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      // unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },

    // lastLogin: {
    //   type: Date,
    //   default: null,
    // },
    // lastLogout: {
    //   type: Date,
    //   default: null,
    // },

    searchItiHistory: [
      {
        destination: String,
        numberofPeople: Number,
        attractions: [String],
        cuisine: [String],
      },

    ],

    searchHotelHistory: [
      {
        location: String,
        checkin: String,
        checkout: String,
        
      }
    ],

    searchRestHistory: [
      {
        location: String,
        date: String,
        rating: Number,
        
      }
    ],
    reviews: [
      {
        location: String,
        review: String,
      },
    ],

    bookmarkedItineraries: [
      {
        itinerary: String,
        destination: String,
      }
    ],

  },
);
module.exports = mongoose.model('users', userSchema);
