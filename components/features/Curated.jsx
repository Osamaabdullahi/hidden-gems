import React from "react";
import { motion } from "framer-motion";
import { features } from "../../data";

function Curated() {
  return (
    <motion.section
      className="py-32 bg-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.02)25%,transparent_25%,transparent_75%,rgba(0,0,0,0.02)75%,rgba(0,0,0,0.02))] bg-[length:20px_20px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative">
        <div className="grid grid-cols-12 gap-8 mb-20">
          <motion.h2
            className="col-span-12 md:col-span-6 text-5xl md:text-7xl font-bold tracking-tight"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Local Favorites, Curated for You
          </motion.h2>

          <motion.p
            className="col-span-12 md:col-span-4 md:col-start-8 text-gray-600 text-lg"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore Kenya’s finest with our curated experiences—from iconic
            landmarks and top dining spots to thrilling adventures and serene
            escapes. We bring you the best of Kenya, crafted for unforgettable
            journeys.
          </motion.p>
        </div>

        <div className="grid gap-8 md:gap-12 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`group relative p-12 bg-white border border-gray-100
                before:absolute before:inset-0 before:w-0 before:hover:w-full
                before:transition-all before:duration-700 before:-z-10
                hover:border-transparent transition-colors duration-700 ${feature.accentClass}`}
            >
              {/* Large Number */}
              <span className="absolute -top-8 right-8 text-8xl font-bold text-gray-100 transition-colors duration-700 group-hover:text-gray-200">
                {feature.number}
              </span>

              {/* Icon */}
              <div className="text-black mb-8 relative">{feature.icon}</div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-2xl font-bold mb-4 text-black">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>

              {/* Hover Indicator */}
              <div className="h-1 w-12 bg-black mt-8 transition-all duration-500 group-hover:w-20" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Curated;
