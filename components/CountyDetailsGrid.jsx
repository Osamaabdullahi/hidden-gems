// CountyDetailsGrid.jsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const CountyDetailsGrid = ({ county }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  // Animation variants for grid items
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" },
  };

  // Sections based on your model
  const sections = [
    {
      id: "overview",
      title: "Overview",
      icon: "📌",
      content: (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg">{county.name}</span>
            {county.rating && (
              <div className="flex items-center text-yellow-500">
                <span>★</span>
                <span className="ml-1 text-gray-800">{county.rating}</span>
                <span className="ml-1 text-sm text-gray-500">
                  ({county.review_count} reviews)
                </span>
              </div>
            )}
          </div>
          <p>{county.overview}</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="text-sm">
              <span className="text-gray-500">Population:</span>{" "}
              {county.population}
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Languages:</span>{" "}
              {county.languages}
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Timezone:</span> {county.timezone}
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Best time to visit:</span>{" "}
              {county.best_time_to_visit}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "weather",
      title: "Weather",
      icon: "🌤️",
      content: (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-3xl font-light">{county.average_temp}</span>
            <div className="text-right">
              <div className="font-medium">{county.season}</div>
              <div className="text-sm text-gray-500">{county.months}</div>
            </div>
          </div>
          <div className="text-sm">
            <div>
              <span className="text-gray-500">Temperature range:</span>{" "}
              {county.temperature_range}
            </div>
            <div className="mt-1">{county.weather_description}</div>
          </div>
        </div>
      ),
    },
    {
      id: "economy",
      title: "Economy & Living",
      icon: "💵",
      content: (
        <div className="space-y-2">
          <div className="font-medium">
            Avg. Income: {county.average_income}
          </div>
          <div className="text-sm">
            <span className="text-gray-500">Major Industries:</span>
            <p>{county.major_industries}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 text-sm">
            <div>
              <span className="text-gray-500">Rent:</span>{" "}
              {county.cost_of_living_rent}
            </div>
            <div>
              <span className="text-gray-500">Utilities:</span>{" "}
              {county.cost_of_living_utilities}
            </div>
            <div>
              <span className="text-gray-500">Meal:</span> {county.meal_cost}
            </div>
            <div>
              <span className="text-gray-500">Transport:</span>{" "}
              {county.transport_cost}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "healthcare",
      title: "Healthcare",
      icon: "🏥",
      content: (
        <div className="space-y-2">
          <div className="font-medium">{county.hospital_name}</div>
          <div className="text-sm">
            <div>
              <span className="text-gray-500">Type:</span>{" "}
              {county.hospital_type}
            </div>
            <div>
              <span className="text-gray-500">Specialties:</span>{" "}
              {county.specialties}
            </div>
            <div className="mt-2">
              {county.health_insurance_recommendation ? (
                <span className="text-green-600 flex items-center">
                  <span className="mr-1">✓</span> Health insurance recommended
                </span>
              ) : (
                <span className="text-gray-600">Health insurance optional</span>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "education",
      title: "Education",
      icon: "🎓",
      content: (
        <div className="space-y-2">
          <div className="font-medium">
            Literacy Rate: {county.literacy_rate}%
          </div>
          <div className="text-sm">
            <span className="text-gray-500">Universities:</span>
            <p>{county.universities}</p>
          </div>
        </div>
      ),
    },
    {
      id: "infrastructure",
      title: "Infrastructure",
      icon: "🚆",
      content: (
        <div className="space-y-2">
          <div className="text-sm">
            <div>
              <span className="text-gray-500">Transportation:</span>
            </div>
            <p>{county.transportation_options}</p>
          </div>
          <div className="text-sm mt-2">
            <div>
              <span className="text-gray-500">Utilities:</span>
            </div>
            <p>{county.utilities}</p>
          </div>
        </div>
      ),
    },
    {
      id: "safety",
      title: "Safety & Emergency",
      icon: "🚨",
      content: (
        <div className="space-y-2">
          <div className="font-medium">Safety Index: {county.safety_index}</div>
          <div className="text-sm">
            <div>
              <span className="text-gray-500">Safe Areas:</span>{" "}
              {county.safe_areas}
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div className="bg-red-100 p-2 rounded text-center">
                <div className="text-xs text-gray-500">Police</div>
                <div className="font-medium">{county.police_contact}</div>
              </div>
              <div className="bg-green-100 p-2 rounded text-center">
                <div className="text-xs text-gray-500">Ambulance</div>
                <div className="font-medium">{county.ambulance_contact}</div>
              </div>
              <div className="bg-blue-100 p-2 rounded text-center">
                <div className="text-xs text-gray-500">County</div>
                <div className="font-medium">
                  {county.county_emergency_contact}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Stagger animation for grid items
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center mb-6">
        <div className="relative w-20 h-20 rounded-full overflow-hidden mr-4">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {county.image ? (
              <img
                src={county.image}
                alt={county.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white text-2xl font-bold">
                {county.name.charAt(0)}
              </div>
            )}
          </motion.div>
        </div>
        <div>
          <motion.h1
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {county.name}
          </motion.h1>
          <motion.div
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {county.region}
          </motion.div>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            className={`
              relative bg-white rounded-lg shadow-md overflow-hidden
              ${
                expandedSection === section.id
                  ? "md:col-span-2 lg:col-span-3"
                  : ""
              }
            `}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            layoutId={`card-${section.id}`}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <span className="text-xl mr-2">{section.icon}</span>
                  <h2 className="text-lg font-medium">{section.title}</h2>
                </div>
                <motion.button
                  onClick={() =>
                    setExpandedSection(
                      expandedSection === section.id ? null : section.id
                    )
                  }
                  className="text-gray-500 hover:text-gray-800"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {expandedSection === section.id ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  )}
                </motion.button>
              </div>
              <motion.div
                className="overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                {section.content}
              </motion.div>
            </div>

            {/* Decorative border with gradient */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2 + 0.05 * index }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CountyDetailsGrid;
