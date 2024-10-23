import React from "react";
import ItineraryCard from "./ItineraryCard";

const Itinerary = ({ trip }) => {
  return (
    <div className="mt-12 mx-auto md:mx-16 lg:mx-32 p-6 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold text-center mb-8">Your Itinerary</h2>
      {trip?.tripData?.itinerary?.map((item, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-2xl font-semibold">{item.day}</h3>
          <h4 className="text-lg font-medium">{item.bestTime}</h4>
          <div className="flex flex-wrap justify-between">
            {item.plan.map((plan, i) => (
              <div key={i} className="w-full md:w-1/3 p-2">
                <ItineraryCard plan={plan} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Itinerary;
