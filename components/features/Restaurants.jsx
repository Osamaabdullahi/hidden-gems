import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import useFetch from "../../app/hooks/UseFetchData";
import Link from "next/link";

function Restaurants() {
  const { data, error, loading } = useFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/destinations?category=Food%20and%20Drink%20Spots`
  );
  if (loading || error) return <div>Loading....</div>;
  return (
    <motion.section
      className="py-20 bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-12 gap-4 items-center mb-16">
          <h2 className="col-span-12 md:col-span-6 text-6xl md:text-8xl font-bold tracking-tight">
            Featured Restaurants
          </h2>
          <p className="col-span-12 md:col-span-4 md:col-start-8 text-gray-400 text-lg">
            Discover Nairobi’s culinary gems, offering unforgettable dining
            experiences and flavors from around the world.
          </p>
        </div>

        <div className="space-y-32">
          {data.slice(0, 5).map((tour, index) => (
            <motion.div
              key={tour.name}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-12 gap-4 group relative"
            >
              {/* Large number */}
              <div className="absolute -left-8 top-0 text-8xl font-bold text-gray-800 opacity-20 select-none">
                {tour.id}
              </div>

              {/* Image and content layout alternates */}
              <div
                className={`col-span-12 md:col-span-7 ${
                  index % 2 === 0 ? "md:col-start-1" : "md:col-start-6"
                }`}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={tour.images || tour.image_url}
                    alt={tour.name}
                    width={800}
                    height={600}
                    className="w-full h-[70vh] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </div>

              <div
                className={`col-span-12 md:col-span-4 ${
                  index % 2 === 0 ? "md:col-start-9" : "md:col-start-2"
                } flex flex-col justify-center`}
              >
                <h3 className="text-4xl font-bold mb-6">{tour.name}</h3>
                <p className="text-gray-400 mb-8 leading-relaxed line-clamp-4">
                  {tour.description}
                </p>

                <motion.button
                  className="flex items-center space-x-4 text-lg group/btn"
                  whileHover={{ x: 10 }}
                >
                  <Link
                    className="flex items-center"
                    href={`/destinations?category=Food and Drink Spots`}
                  >
                    <span className="border-b-2 border-transparent group-hover/btn:border-white transition-all duration-300">
                      Explore More
                    </span>
                    <ChevronRight className="w-6 h-6 transition-transform duration-300 group-hover/btn:translate-x-2" />
                  </Link>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Restaurants;
