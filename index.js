// index.js

const connectToMongo = require("./db.js");
const cors = require("cors");
const express = require("express");
const UserModel = require("./models/User.js");
const authRoutes = require("./routes/auth.js");
const itineraryRoutes = require("./routes/itinerary.js");
const weatherRoutes = require("./routes/weatherRoutes.js");
const hospMapRoutes = require("./routes/hospMapRoutes.js");
const hotelRoutes = require("./routes/hotelRoutes.js");
const geminiApiRoutes = require('./routes/geminiApi.js');
const restRoutes = require('./routes/restRoutes.js');
require('dotenv').config()


connectToMongo();
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use((req, res, next) => {
  const forwardedFor = req.headers["x-forwarded-for"];
  req.clientIP = forwardedFor
    ? forwardedFor.split(",")[0]
    : req.connection.remoteAddress;
  next();
});

app.get("/", (req, res) => {
  return res.json({
    ipAddress: req.clientIP,
  });
});

//API ENDPOINT ROUTES 
app.use("/api/auth", authRoutes);
app.use("/api/itinerary", itineraryRoutes);
app.use("/api/HospMap", hospMapRoutes);
app.use("/api/weather", weatherRoutes);
app.use('/api/hotel',hotelRoutes);
app.use('/api/gemini', geminiApiRoutes); 
app.use('/api/rest' , restRoutes);
app.use('/api/HospMap', hospMapRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/getAllUser", (req, res) => {
  UserModel.find()
    .then((users) => res.json(users))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});
