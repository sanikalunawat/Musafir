import { PHOTO_REF_URL } from "@/constants/options";
import { GetPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiStar } from "react-icons/ci";

const HotelCardItem = ({ h }) => {
  console.log(h)
  const [photoUrl, setPhotoUrl] = useState("");
  const [latitude, longitude] = h.geoCoordinates.split(',').map(coord => coord.trim());
  useEffect(() => {
    if (h) {
      GetPlacePhoto();
    }
  }, [h]);

  const GetPlacePhoto = async () => {
    try {
      const result = await GetPlaceDetails(h?.name);
      const place = result.data.features[0];
      console.log(place)
      if (place) {
        const [longitude, latitude] = place.center;
        const url = PHOTO_REF_URL.replace("{longitude}", longitude)
                                 .replace("{latitude}", latitude);
        setPhotoUrl(url);
      }
    } catch (error) {
      console.error("Error fetching hotel photo:", error);
      setPhotoUrl("../../src/assets/fallback.jpg");
    }
  };

  return (
    <div>
      <Link to={`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=14`} target="_blank">
        <div className="flex flex-col items-center justify-center">
          <img className="w-80 h-52 rounded-md" src={photoUrl} alt={h?.name} />
          <div className="flex w-full items-center justify-between px-8 mt-2">
            <div className="font-bold">{h.name}</div>
            <div className="flex items-center">
              {h.rating}
              <CiStar />
            </div>
          </div>
          <div className="w-full px-8 my-1 text-md">{h.address}</div>
        </div>
      </Link>
    </div>
  );
};

export default HotelCardItem;
