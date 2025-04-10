"use client";
import React, { useState } from "react";
import { cityData } from "../../data";
import { Sun, Calendar, Cloud } from "lucide-react";

function Overview({ data }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const quickFacts = {
    population: data[0].population,
    language: data[0].languages,
    region: data[0].region,
    timeZone: data[0].timezone,
    bestTime: data[0].best_time_to_visit,
    avgTemp: data[0].average_temp,
  };

  return (
    <>
      <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Quick Facts</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {Object.entries(quickFacts).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <span className="text-sm text-gray-500 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">About {data[0].name}</h2>
        <p className="text-gray-600 leading-relaxed">
          {showFullDescription
            ? data[0].overview
            : `${data[0].overview.slice(0, 300)}...`}
        </p>
        <button
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="text-blue-600 hover:text-blue-700 mt-2 text-sm font-medium"
        >
          {showFullDescription ? "Read less" : "Read more"}
        </button>
      </section>
      <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Weather & Climate</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(cityData.weather).map(([season, data]) => (
            <div key={season} className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium capitalize mb-2">{season}</h3>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  {data.temp}
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {data.season}
                </p>
                <p className="flex items-center gap-2">
                  <Cloud className="w-4 h-4" />
                  {data.condition}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Overview;
