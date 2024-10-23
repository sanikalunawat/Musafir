import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItineraryCard from "./ItineraryCard"; // Import ItineraryCard component
import axios from "axios"; // For making API calls

const Itinerary = () => {
  const [itinerary, setItinerary] = useState([]); // Store fetched itinerary data as an empty array
  const [loading, setLoading] = useState(true);   // Handle loading state
  const [error, setError] = useState(null);       // Track error state

  useEffect(() => {
    fetchItineraryData(); // Fetch itinerary on component mount
  }, []);

  // Function to fetch itinerary data from API
  const fetchItineraryData = async () => {
    try {
      const response = await axios.get("/api/itinerary"); // Adjust the API endpoint
      console.log(response.data); // Check the data returned
      setItinerary(Array.isArray(response.data) ? response.data : []); // Ensure the data is an array
      setLoading(false); // Set loading to false
    } catch (err) {
      console.error("Error fetching itinerary:", err);
      setError("Failed to load itinerary"); // Set error message
      setLoading(false);
    }
  };

  // Handle loading and error states
  if (loading) return <div>Loading itinerary...</div>;
  if (error) return <div>{error}</div>;

  // If itinerary is not an array or is empty, display a fallback message
  if (!Array.isArray(itinerary) || itinerary.length === 0) {
    return <div>No itinerary available.</div>;
  }

  return (
    <div className="mt-12 mx-auto md:mx-16 lg:mx-32 p-6 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-8">Trip Itinerary</h1>
      {itinerary.map((dayPlan, i) => (
        <div key={i} className="mb-6">
          <h2 className="text-2xl font-bold mb-4">{dayPlan.day}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dayPlan.plan.map((place, index) => (
              <ItineraryCard key={index} plan={place} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Itinerary;
