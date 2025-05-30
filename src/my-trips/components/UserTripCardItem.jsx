import { PHOTO_REF_URL } from "@/constants/options";
import { GetPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserTripCardItem = ({ trip }) => {
  const [photoURL, setPhotoURL] = useState("");
  // console.log(trip);
  const GetPlacePhoto = async () => {
    try {
      const data = {
        placeName: trip?.userChoice?.location?.label,
      };
      const result = await GetPlaceDetails(data.placeName);
      const place = result.data.features[0];

      if (place) {
        const [longitude, latitude] = place.center;
        const Url = PHOTO_REF_URL.replace("{longitude}", longitude)
                                 .replace("{latitude}", latitude);
        setPhotoURL(Url);
      } else {
        console.warn("Place not found.");
        setPhotoURL("../../src/assets/fallback.jpg");
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
      setPhotoURL("../../src/assets/fallback.jpg");
    }
  };

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);
  useEffect(() => {
    // console.log(trip);
  }, []);

  return (
    
    <Link to={`/view-trip/${trip?._id}`}>
      <div className="hover:scale-105 transition-all hover:shadow-md">
        {photoURL ? (
          <img
            className="object-cover rounded-xl mx-auto w-80 h-64"
            src={photoURL}
            alt={trip?.userChoice?.location?.label || "Trip Location"}
          />
        ) : (
          <div className="w-80 h-64 bg-gray-200 flex items-center justify-center rounded-xl">
            <span>No Image Available</span>
          </div>
        )}
        <h2 className="font-bold text-lg">{trip?.userChoice?.location?.label}</h2>
        <h2 className="text-sm text-gray-500">
          {trip?.userChoice?.noOfDays} days trip with "{trip?.userChoice?.budget}" budget.
        </h2>
      </div>
    </Link>
  );
};

export default UserTripCardItem;
