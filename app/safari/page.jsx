"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, TrendingUp, Search } from "lucide-react";
import useFetch from "../hooks/UseFetchData";
import { CityCard } from "../../components/ui/CityCard";

const regions = [
  {
    id: "Central",
    name: "Central",
    count: Math.floor(Math.random() * (15 - 5 + 1)) + 5,
  },
  {
    id: "Coast",
    name: "Coast",
    count: Math.floor(Math.random() * (15 - 5 + 1)) + 5,
  },
  {
    id: "Eastern",
    name: "Eastern",
    count: Math.floor(Math.random() * (15 - 5 + 1)) + 5,
  },
  {
    id: "Nairobi",
    name: "Nairobi",
    count: Math.floor(Math.random() * (15 - 5 + 1)) + 5,
  },
  {
    id: "North Eastern",
    name: "North Eastern",
    count: Math.floor(Math.random() * (15 - 5 + 1)) + 5,
  },
  {
    id: "Nyanza",
    name: "Nyanza",
    count: Math.floor(Math.random() * (15 - 5 + 1)) + 5,
  },
  {
    id: "Rift Valley",
    name: "Rift Valley",
    count: Math.floor(Math.random() * (15 - 5 + 1)) + 5,
  },
  {
    id: "Western",
    name: "Western",
    count: Math.floor(Math.random() * (15 - 5 + 1)) + 5,
  },
];

export default function ExploreCities() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { data, error, loading } = useFetch(
    // "${process.env.NEXT_PUBLIC_BACKEND_URL}/api/destinations/?category=safari"
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/destinations/?category=safari&region=${selectedCategory}`
  );

  if (loading || error) return <CitySkeleton />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <section className="py-12 px-4 md:px-8 pt-20">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="mb-12">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Popular Game Parks
              </h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow mb-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        {regions.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-4 py-2 rounded-full text-sm transition-colors ${
                              selectedCategory === category.id
                                ? "bg-black text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            {category.name} ({category.count})
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* <div>
                      <h3 className="text-lg font-medium mb-4">
                        subcategories
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {subcategory.map((region, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedRegion(region)}
                            className={`px-4 py-2 rounded-full text-sm transition-colors ${
                              selectedRegion === region
                                ? "bg-black text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            {region}
                          </button>
                        ))}
                      </div>
                    </div> */}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Trending Section */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-red-500" />
              <h2 className="text-xl font-semibold">Trending Cities</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.map((city, index) => (
                <CityCard key={city.id} city={city} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const CitySkeleton = () => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="group relative bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <div className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 " />

        <div className="absolute top-4 right-4 flex gap-2">
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <div className="w-5 h-5 bg-white/90" />
          </button>
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <div className="w-5 h-5 bg-white/90" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900" />
            <p className="text-gray-500" />
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
            <div className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium" />
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3" />

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4" />
            <span className="line-clamp-1" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4" />
            <span className="line-clamp-1" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
