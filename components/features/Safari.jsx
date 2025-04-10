"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function Safari({ title, tours, fadeInUp, category }) {
  return (
    <motion.section
      className="py-24 px-6 md:px-24 bg-white"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          variants={fadeInUp}
          className="text-4xl md:text-5xl font-light text-black mb-16 text-center tracking-wide"
        >
          {title}
        </motion.h2>

        <div className="grid gap-12 md:grid-cols-3">
          {tours.slice(0, 9).map((tour, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <Image
                  src={tour.image || tour.image_url}
                  alt={tour.name}
                  width={500}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-light text-black mb-3 tracking-wider line-clamp-1">
                  {tour.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {tour.description}
                </p>

                <motion.button
                  className="mt-6 flex items-center space-x-2 text-black group/button"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/destinations?category=${category}`}>
                    <span className="text-sm uppercase tracking-wider">
                      Discover More
                    </span>
                  </Link>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-2" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Safari;
