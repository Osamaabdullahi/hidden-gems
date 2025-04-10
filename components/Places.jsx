"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  MapPin,
  Utensils,
  Camera,
  Landmark,
  Tree,
  Music,
  ShoppingBag,
  Dumbbell,
  ChevronRight,
  HistoryIcon,
} from "lucide-react";
import useFetch from "../app/hooks/UseFetchData";
import Link from "next/link";

const categories = [
  { name: "Safari Destinations", icon: MapPin },
  { name: "Food and Drink Spots", icon: Utensils },
  { name: "Unique Local Experiences", icon: Camera },
  { name: "Recreational and Chill Areas", icon: Landmark },
  { name: "Entertainment and Leisure", icon: Music },
  { name: "Outdoor Activities and Nature Spots", icon: ShoppingBag },
  { name: "Cultural Centers", icon: Dumbbell },
  { name: "	Historical Sites", icons: HistoryIcon },
];

export default function CoolPlaces() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { data, error, loading } = useFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/destinations`
  );

  const filteredPlaces =
    selectedCategory === "All"
      ? data
      : data.filter((place) => place.category === selectedCategory);

  if (loading || error) return <div>Loading.....</div>;
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <motion.section
        className="py-24 px-6 md:px-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-light text-black mb-16 text-center tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Cool Places in Your City
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <motion.button
              className={`px-6 py-3 rounded-full text-sm uppercase tracking-wider transition-colors duration-300 ${
                selectedCategory === "All"
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => setSelectedCategory("All")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All
            </motion.button>
            {categories.map((category) => (
              <motion.button
                key={category.name}
                className={`flex items-center px-6 py-3 rounded-full text-sm uppercase tracking-wider transition-colors duration-300 ${
                  selectedCategory === category.name
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setSelectedCategory(category.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.icon && <category.icon className="w-4 h-4 mr-2" />}
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {filteredPlaces.slice(0, 9).map((place, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={place.images || place.image_url}
                    alt={place.name}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="mt-6">
                  <h3 className="text-2xl font-light text-black mb-2 tracking-wider line-clamp-1">
                    {place.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {place.description}
                  </p>
                  <span className="text-xs uppercase tracking-wider text-gray-500">
                    {place.category}
                  </span>

                  <motion.button
                    className="mt-4 flex items-center space-x-2 text-black group/button"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link href={`/destinations?category=${place.category}`}>
                      <span className="text-sm uppercase tracking-wider">
                        View More
                      </span>
                    </Link>
                    <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-2" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
