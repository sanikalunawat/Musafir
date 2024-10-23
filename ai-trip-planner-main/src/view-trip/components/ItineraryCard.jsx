import React, { useEffect, useState } from "react";
import { GetPlaceDetails } from "@/service/GlobalApi";
import { Link } from "react-router-dom";

const PHOTO_REF_URL = "https://photo-api-url/{longitude}/{latitude}"; // Adjust your API URL

const ItineraryCard = ({ plan }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if (plan) {
      fetchPlacePhoto();
    }
  }, [plan]);

  const fetchPlacePhoto = async () => {
    try {
      const result = await GetPlaceDetails(plan?.placeName);
      const place = result.data.features[0];

      if (place) {
        const [longitude, latitude] = place.center;
        setCoordinates({ latitude, longitude });

        const url = PHOTO_REF_URL.replace("{longitude}", longitude).replace("{latitude}", latitude);
        setPhotoUrl(url);
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
      setPhotoUrl("../../src/assets/fallback.jpg"); // Fallback image on error
    }
  };

  return (
    <Link
      to={`https://www.openstreetmap.org/?mlat=${coordinates.latitude}&mlon=${coordinates.longitude}&zoom=14`}
      target="_blank"
    >
      <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 duration-300 itinerary-card">
        <img
          className="w-full h-48 object-cover"
          src={photoUrl}
          alt={plan.placeName}
        />
        <div className="p-4">
          <h4 className="text-xl font-semibold mb-2">{plan.placeName}</h4>
          <p className="text-md text-gray-600 truncate">{plan.placeDetails}</p>
        </div>
      </div>
    </Link>
  );
};

export default ItineraryCard;
