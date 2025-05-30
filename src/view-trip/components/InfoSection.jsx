import React, { useEffect, useState } from "react";
import { GetPlaceDetails } from "@/service/GlobalApi";

const FALLBACK_IMAGE_URL = "../../src/assets/fallback.jpg"; // Ensure this path is correct
const PHOTO_REF_URL = "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/{longitude},{latitude},14.25,0/600x600?access_token=" +
  import.meta.env.VITE_MAPBOX_API_KEY;


const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState(FALLBACK_IMAGE_URL); // Start with the fallback image

  useEffect(() => {
    const GetPlacePhoto = async () => {
      try {
        const data = {
          placeName: trip?.userChoice?.location?.label,
        };
        const result = await GetPlaceDetails(data.placeName);
        const place = result.data.features[0];

        if (place) {
          const [longitude, latitude] = place.center;
          const url = PHOTO_REF_URL.replace("{longitude}", longitude)
                                   .replace("{latitude}", latitude);
          setPhotoUrl(url);
        } else {
          console.warn("Place not found.");
          setPhotoUrl(FALLBACK_IMAGE_URL);
        }
      } catch (error) {
        console.error("Error fetching place details:", error);
        setPhotoUrl(FALLBACK_IMAGE_URL);
      }
    };

    if (trip?.userChoice?.location?.label) {
      GetPlacePhoto();
    }
  }, [trip?.userChoice?.location?.label]);

  return (
    <div className="flex bg-gradient-to-b from-blue-100 to-gray-100 justify-between items-center mt-12 mx-auto md:mx-16 lg:mx-32 p-6 rounded-lg shadow-lg">

      <img
        className="h-40 w-40 rounded-full object-cover"
        src={photoUrl}
        alt="Trip Image"
      />
      <div className="flex flex-col ml-6 items-end">
        <div className="text-4xl font-bold mb-2 flex items-center">
          🗺️ {trip?.userChoice?.location?.label}
        </div>
        <div className="text-xl mb-1 flex items-center">
          📅 <span className="font-semibold ml-2">Duration:</span>
          {trip?.userChoice?.noOfDays} days
        </div>
        <div className="text-xl mb-1 flex items-center">
          💰 <span className="font-semibold ml-2">Budget:</span>
          {trip?.userChoice?.budget}
        </div>
        <div className="text-xl flex items-center">
          👥 <span className="font-semibold ml-2">Traveling with:</span>
          {trip?.userChoice?.noOfPeople}
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
