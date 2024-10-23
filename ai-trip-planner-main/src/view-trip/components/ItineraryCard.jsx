import React from "react";
import { Link } from "react-router-dom";
import { CiStar } from "react-icons/ci";

const ItineraryCard = ({ plan }) => {
  const [latitude, longitude] = plan?.geoCoordinates.split(',').map(coord => coord.trim());

  return (
    <Link 
      to={`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=14`} 
      target="_blank"
      className="block"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{plan?.placeName}</h3>
          <p className="text-gray-600 mb-4">{plan?.placeDetails}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="flex items-center">
              <CiStar className="text-yellow-400 mr-1" />
              {plan?.rating}
            </span>
            <span>{plan?.ticketPricing}</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            <strong>Location:</strong> {plan.geoCoordinates}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ItineraryCard;