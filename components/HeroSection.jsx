"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Image */}
      <Image
        src="https://i.pinimg.com/474x/09/51/32/09513208e74ebe89f8cd6d409d72ea6b.jpg"
        alt="City Skyline"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
        className="opacity-50 grayscale"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Discover Your City&apos;s Hidden Gems
        </motion.h1>
        <motion.p
          className="text-xl sm:text-2xl md:text-3xl mb-8 max-w-3xl mx-auto text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Uncover the best local spots, from cozy cafes to breathtaking
          viewpoints
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button
            className="px-8 py-3 bg-white text-black rounded-full text-lg font-semibold transition-all duration-300 hover:bg-gray-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onTap={() => router.push("/destinations")}
          >
            Explore Now
          </motion.button>
          <motion.button
            onTap={() => router.push("/destinations")}
            className="px-8 py-3 border-2 border-white rounded-full text-lg font-semibold transition-all duration-300 hover:bg-white hover:text-black group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
            <ArrowRight className="inline-block ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white rounded-full p-1"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <div className="w-1 h-3 bg-white rounded-full mx-auto" />
        </motion.div>
      </motion.div>
    </section>
  );
}
