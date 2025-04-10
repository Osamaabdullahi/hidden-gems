"use client";
import { useState, useEffect } from "react";
import { Star, Clock, MapPin, Users } from "lucide-react";
import Link from "next/link";

const Recommendation = ({ title, category }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/destinations?category=${category}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }
        const data = await response.json();
        // Only take the first 6 places
        setPlaces(Array.isArray(data) ? data.slice(0, 6) : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [category]);

  if (loading) return <div>Loading recommendations...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map((place) => (
          <div
            key={place.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={place.images}
                alt={place.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold">{place.name}</h3>
                  <div className="flex items-center bg-white/90 rounded-full px-2 py-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">
                      {place.average_rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{place.region}</span>
                <Clock className="w-4 h-4 ml-4 mr-1" />
                <span>{place.best_times_to_visit}</span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {place.description}
              </p>

              <Link
                href={`/destinations/place?id=${place.id}&place=${place.name}`}
                className="block w-full"
              >
                <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  Explore More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendation;
