"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, TrendingUp, Search } from "lucide-react";
import useFetch from "../hooks/UseFetchData";
import { CityCard } from "../../components/ui/CityCard";
import { regions, categories } from "../../data";
import { useRouter, useSearchParams } from "next/navigation";

export default function ExploreCities() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const search = useSearchParams().get("query");
  const category = useSearchParams().get("category");

  // Dynamically build query string
  const queryParams = new URLSearchParams();

  if (selectedCategory) {
    queryParams.append("category", selectedCategory);
  }
  if (selectedRegion && selectedRegion !== "all") {
    queryParams.append("region", selectedRegion);
  }
  if (searchQuery) {
    queryParams.append("name", searchQuery); // Optional: only if search is supported
  }

  if (search) {
    queryParams.append("name", search); // Optional: only if search is supported
  }

  if (category) {
    queryParams.append("category", category); // Optional: only if search is supported
  }

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/destinations/${
    queryParams.toString() ? "?" + queryParams.toString() : ""
  }`;

  // Then use it in the fetch
  const { data, error, loading } = useFetch(url);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    handleRouteChange();
  }, [router]);

  if (loading || error) return <CitySkeleton />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] bg-black">
        <img
          src="https://i.pinimg.com/474x/ca/2d/ee/ca2dee0fa09d5a68f87b718308cc0f4a.jpg"
          alt="African cities"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl text-white font-bold text-center mb-6"
          >
            Explore the Wonders of Kenya
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 text-center max-w-2xl mb-12"
          >
            Embark on unforgettable adventures through the country's vibrant
            cities, where you can discover family-friendly attractions, indulge
            in local cuisine, and experience thrilling safaris!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-3xl px-4"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search cities, attractions, or experiences..."
                className="w-full h-14 pl-12 pr-4 rounded-xl bg-white/95 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="mb-12">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Popular Destinations
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
                        {categories.map((category) => (
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

                    <div>
                      <h3 className="text-lg font-medium mb-4">Regions</h3>
                      <div className="flex flex-wrap gap-2">
                        {regions.map((region) => (
                          <button
                            key={region.id}
                            onClick={() => setSelectedRegion(region.id)}
                            className={`px-4 py-2 rounded-full text-sm transition-colors ${
                              selectedRegion === region.id
                                ? "bg-black text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            {region.name}
                          </button>
                        ))}
                      </div>
                    </div>
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
