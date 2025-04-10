import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Compass,
  Users,
  HomeIcon,
} from "lucide-react";
import Image from "next/image";

function SafariCard({ tour, fadeInUp, index }) {
  return (
    <motion.div
      variants={fadeInUp}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <Image
          src={tour.imageUrl}
          alt={tour.name}
          width={500}
          height={600}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-light text-black mb-3 tracking-wider">
          {tour.name}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {tour.description}
        </p>

        <motion.button
          className="mt-6 flex items-center space-x-2 text-black group/button"
          whileHover={{ x: 10 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-sm uppercase tracking-wider">
            Discover More
          </span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-2" />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default SafariCard;
