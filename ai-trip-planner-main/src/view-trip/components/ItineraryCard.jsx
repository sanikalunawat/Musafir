import React, { useEffect, useState } from "react";
import { GetPlaceDetails } from "@/service/GlobalApi";
import { Link } from "react-router-dom";

const ItineraryCard = ({ plan }) => {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (plan) {
      fetchPlacePhoto();
    }
  }, [plan]);

  const fetchPlacePhoto = async () => {
    const result = await GetPlaceDetails(plan?.placeName);
    const place = result.data.features[0];
    const [longitude, latitude] = place.center;
    const url = PHOTO_REF_URL.replace("{longitude}", longitude)
                             .replace("{latitude}", latitude);
    setPhotoUrl(url);
  };

  return (
    <Link
      to={
        `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=14`
      }
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
