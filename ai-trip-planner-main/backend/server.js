const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://travel_user:yourSecurePassword123@travelplannerdb.ad9pf.mongodb.net/?retryWrites=true&w=majority&appName=TravelPlannerDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));


const tripSchema = new mongoose.Schema({
  userChoice: Object,
  tripData: String,
  userEmail: String,
});

const Trip = mongoose.model("Trip", tripSchema);

// Save trip
app.post("/api/trips", async (req, res) => {
  try {
    const newTrip = new Trip(req.body);
    await newTrip.save();
    res.status(201).json({ message: "Trip saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving trip" });
  }
});

// Fetch trips for a user
app.get("/api/trips/:email", async (req, res) => {
  try {
    const trips = await Trip.find({ userEmail: req.params.email });
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trips" });
  }
});

// Fetch a specific trip
app.get("/api/trips/:id", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (trip) {
      res.status(200).json(trip);
    } else {
      res.status(404).json({ message: "Trip not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching trip" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
