import { PHOTO_REF_URL } from "@/constants/options";
import { GetPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ItineraryCardItem = ({ itinerary }) => {
  console.log(itinerary); // Verify itinerary data
  const [photoUrl, setPhotoUrl] = useState("");
  const [latitude, longitude] = itinerary.geoCoordinates
    .split(",")
    .map((coord) => coord.trim());

  useEffect(() => {
    if (itinerary) fetchPlacePhoto();
  }, [itinerary]);

  const fetchPlacePhoto = async () => {
    try {
      const result = await GetPlaceDetails(itinerary?.placeName);
      const place = result.data.features[0]; // Ensure structure matches
      console.log(place); // Debug: Log to check the data

      if (place) {
        const [lng, lat] = place.center;
        const url = PHOTO_REF_URL.replace("{longitude}", lng).replace("{latitude}", lat);
        setPhotoUrl(url);
      }
    } catch (error) {
      console.error("Error fetching itinerary photo:", error);
      setPhotoUrl("../../src/assets/fallback.jpg"); // Fallback image
    }
  };

  return (
    <div>
      <Link
        to={`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=14`}
        target="_blank"
      >
        <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 duration-300">
          <img
            className="w-full h-48 object-cover"
            src={photoUrl || "../../src/assets/fallback.jpg"} // Dynamic or fallback image
            alt={itinerary.placeName}
          />
          <div className="p-4">
            <h4 className="text-xl font-semibold mb-2">{itinerary.placeName}</h4>
            <p className="text-md text-gray-600 truncate">{itinerary.placeDetails}</p>
            <p className="text-sm text-gray-500">Rating: {itinerary.rating} ⭐</p>
            <p className="text-sm text-gray-500">Tickets: {itinerary.ticketPricing}</p>
            <p className="text-sm text-gray-500">Estimated Time: {itinerary.timeTravel}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ItineraryCardItem;
