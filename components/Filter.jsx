"use client";

import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

const AttractionsFilter = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});

  const filterCategories = {
    "Historical Sites": [
      "Museums and Galleries",
      "Monuments and Landmarks",
      "Heritage Sites",
    ],
    "Cultural Centers": [
      "Art Districts",
      "Community Centers",
      "Religious Sites",
    ],
    "Outdoor Activities": [
      "Hiking and Nature Trails",
      "Beaches and Lakes",
      "National Parks and Forests",
    ],
    Entertainment: [
      "Cinemas and Theaters",
      "Amusement and Water Parks",
      "Live Music Venues",
      "Shopping Districts",
    ],
    "Food and Drink": [
      "Restaurants",
      "Cafes and Tea",
      "Bars and Nightlife",
      "Street Food Markets",
    ],
    "Recreational Areas": [
      "Beach Clubs and Poolside Lounges",
      "Public Libraries and Reading Rooms",
      "City Plazas and Squares",
      "Picnic Spots",
    ],
    "Local Experiences": [
      "Workshops and Classes",
      "Farmers Markets",
      "Craft and Artisan Markets",
    ],
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleFilterChange = (category, item) => {
    setSelectedFilters((prev) => {
      const newFilters = {
        ...prev,
        [category]: {
          ...prev[category],
          [item]: !prev[category]?.[item],
        },
      };
      onFilterChange?.(newFilters);
      return newFilters;
    });
  };

  const filteredCategories = Object.entries(filterCategories).filter(
    ([category]) => category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="font-semibold text-lg mb-4">Filter Attractions</h2>

      <div className="relative mb-4">
        <div className="relative">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      <div className="space-y-2">
        {filteredCategories.map(([category, items]) => (
          <div key={category} className="border rounded-lg">
            <button
              onClick={() => toggleCategory(category)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 rounded-lg"
            >
              <span className="font-medium">{category}</span>
              <ChevronDown
                className={`w-5 h-5 transform transition-transform ${
                  expandedCategories[category] ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedCategories[category] && (
              <div className="px-4 pb-3 space-y-2">
                {items.map((item) => (
                  <label
                    key={item}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedFilters[category]?.[item] || false}
                      onChange={() => handleFilterChange(category, item)}
                    />
                    <span className="text-sm text-gray-600">{item}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttractionsFilter;
