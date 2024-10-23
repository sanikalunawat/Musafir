import React from "react";
import { Link } from "react-router-dom";
import { CiStar } from "react-icons/ci";

const ItineraryCard = ({ plan }) => {
  const [latitude, longitude] = plan?.geoCoordinates.split(',').map(coord => coord.trim());

  return (
    <Link to={`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=14`} target="_blank">
      <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 duration-300 itinerary-card">
        {/* <img
          className="object-cover w-full h-48"
          src={plan?.placeImageURL || "../../src/assets/fallback.jpg"}
          alt={plan?.placeName}
        /> */}
        <div className="p-4">
          <h3 className="text-xl font-bold">{plan?.placeName}</h3>
          <p className="text-gray-600">{plan?.placeDetails}</p>
          <div className="flex items-center mt-2">
          <span className="flex items-center">
              {plan?.rating}
              <CiStar />
            </span>
          <span className="ml-2">{plan?.ticketPricing}</span>
          </div>
          <p><strong>Location:</strong> {plan.geoCoordinates}</p>
          {/* <span className="flex items-center">
              {plan?.rating}
              <CiStar />
            </span>
          <span className="ml-2">{plan?.ticketPricing}</span> */}
        </div>
      </div>
    </Link>
  );
};

export default ItineraryCard;
