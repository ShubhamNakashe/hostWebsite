const mongoose = require("mongoose");
require('dotenv').config();
const mongoURI = process.env.mongoURL;

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Exit with failure
    }
};

module.exports = connectToMongo;
