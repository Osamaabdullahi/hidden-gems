"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Users,
  Building2,
  Cloud,
  Compass,
  X,
  ChevronRight,
  Star,
  Info,
} from "lucide-react";
import useFetch from "../hooks/UseFetchData";

export default function CitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const { data, loading, error } = useFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/counties/`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredCities = data
    ? data.filter(
        (city) =>
          city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          city.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
          city.overview.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filterOptions = [
    { id: "all", label: "All Cities" },
    { id: "Coast", label: "Coastal " },
    { id: "Rift Valley", label: "Rift Valley " },
    { id: "Central", label: "Central" },
  ];

  return (
    <>
      <div className="min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-4 py-8 sm:px-6 lg:px-8"
        >
          {/* Header Section */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12 pt-20"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Kenyan Counties to Explore
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the unique charm and cultural heritage of kenya's most
              fascinating places
            </p>
          </motion.div>

          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative max-w-2xl mx-auto"
            >
              <input
                type="text"
                placeholder="Search cities, countries, or descriptions..."
                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white shadow-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              )}
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex justify-center gap-4 flex-wrap"
            >
              {filterOptions.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    activeFilter === filter.id
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Cities Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCities.map((city) => (
                <motion.div
                  key={city.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8 }}
                  className="group relative"
                >
                  <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                    <div className="relative">
                      <div className="relative h-64 overflow-hidden">
                        <motion.img
                          src={city.image}
                          alt={city.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h2 className="text-2xl font-bold mb-2">{city.name}</h2>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-1" />
                            <span>{city.region}</span>
                          </div>
                          <div className="flex items-center">
                            <Star size={16} className="mr-1" />
                            <span>{city.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {city.overview}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center text-gray-600">
                          <Users size={16} className="mr-2" />
                          <span>{city.population}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Building2 size={16} className="mr-2" />
                          <span>{city.region}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Cloud size={16} className="mr-2" />
                          <span>{city.average_temp}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Compass size={16} className="mr-2" />
                          <span>{city.timezone}</span>
                        </div>
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }} className="mt-4">
                        <Link
                          href={{
                            pathname: `/counties/${city.name}`,
                            query: { city: city.name },
                          }}
                        >
                          <button
                            onClick={() => setSelectedCity(city)}
                            className="w-full bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
                          >
                            <span>Explore {city.name}</span>
                            <ChevronRight size={16} />
                          </button>
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredCities.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <p className="text-xl text-gray-500">
                No cities found matching your search criteria.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
}
