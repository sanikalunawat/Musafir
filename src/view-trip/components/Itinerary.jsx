import React from "react";
import ItineraryCard from "./ItineraryCard";

const Itinerary = ({ trip }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-gradient-to-b from-blue-50 to-white rounded-3xl shadow-xl overflow-hidden">
        <div className="pt-10 pb-12 px-6 sm:px-10">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-8">Your Itinerary</h2>
          {trip?.tripData?.itinerary?.map((item, index) => (
            <div key={index} className="mb-12">
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">{index + 1}</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900">{item.day}</h3>
                  <p className="text-lg text-gray-500">{item.bestTime}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {item.plan.map((plan, i) => (
                  <ItineraryCard key={i} plan={plan} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Itinerary;