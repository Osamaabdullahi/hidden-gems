import { motion } from "framer-motion";
import { Heart, Share2, Star, Clock, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import useStore from "../../store"; // Import Zustand store
import { toast } from "sonner";

export const CityCard = ({ city }) => {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const addDestination = useStore((state) => state.addDestination); // Access addDestination from the store
  const [isSaved, setIsSaved] = useState(false); // Track if the destination is saved

  const handleSaveDestination = () => {
    if (!isAuthenticated) {
      toast.error("Please sign up to save destinations");
      router.push("/sighup");
      return;
    }
    addDestination(city); // Add the destination to the store
    setIsSaved(true); // Mark the destination as saved
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={city.images}
          alt={city.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 " />

        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={handleSaveDestination}
            className={`p-2 rounded-full transition-colors ${
              isSaved ? "bg-red-500 text-white" : "bg-white/90 text-gray-700"
            }`}
          >
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{city.name}</h3>
            <p className="text-gray-500">{city.region}</p>
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{city.average_rating}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {city.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-16">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span className="line-clamp-1">{city.best_times_to_visit}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span className="line-clamp-1">100 activities</span>
          </div>
        </div>

        <Link href={`/destinations/place?id=${city.id}&place=${city.name}`}>
          <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer line-clamp-1 absolute bottom-0 left-0 right-0 ">
            Explore {city.name}
          </button>
        </Link>
      </div>
    </motion.div>
  );
};
