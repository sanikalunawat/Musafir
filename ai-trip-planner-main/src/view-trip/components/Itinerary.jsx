import React, { useEffect, useState } from "react";
import { GetPlaceDetails } from "@/service/GlobalApi";
import { Link } from "react-router-dom";
import { PHOTO_REF_URL } from "@/constants/options";

const ItineraryCard = ({ plan }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    if (plan) {
      fetchPlacePhoto();
    }
  }, [plan]);

  const fetchPlacePhoto = async () => {
    const result = await GetPlaceDetails(plan?.placeName);
    const place = result.data.features[0];
    if (place) {
      const [long, lat] = place.center;
      setLongitude(long);
      setLatitude(lat);
      const url = PHOTO_REF_URL.replace("{longitude}", long)
                               .replace("{latitude}", lat);
      setPhotoUrl(url);
    }
  };

  return (
    <Link to={`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=14`} target="_blank">
      <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 duration-300 itinerary-card">
        <img
          className="object-cover w-full h-48"
          src={photoUrl || "../../src/assets/fallback.jpg"}
          alt={plan?.placeName}
        />
        <div className="p-4">
          <h3 className="text-xl font-bold">{plan?.placeName}</h3>
          <p className="text-gray-600">{plan?.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ItineraryCard;
