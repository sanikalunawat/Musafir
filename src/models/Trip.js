// models/Trip.js
import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  userChoice: {
    location: String,
    noOfDays: Number,
    budget: String,
    noOfPeople: Number,
  },
  tripData: String,
  userEmail: String,
});

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;
