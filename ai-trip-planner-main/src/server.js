// server.js
import express from 'express';
import mongoose from 'mongoose';
import connectDB from './db.js';
import Trip from './models/Trip.js';
import cors from 'cors';

const app = express();
const PORT = 5173;

connectDB(); // Connect to MongoDB

app.use(cors());
app.use(express.json()); // Parse JSON requests

// Route to save a trip
app.post('/trips', async (req, res) => {
  try {
    const { userChoice, tripData, userEmail } = req.body;
    const newTrip = new Trip({ userChoice, tripData, userEmail });
    await newTrip.save();
    res.status(201).json({ message: 'Trip saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save trip' });
  }
});

// Route to get trips by user email
app.get('/trips/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const trips = await Trip.find({ userEmail: email });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
