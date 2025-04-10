"use client";

import React from "react";
import { Star, Clock, DollarSign } from "lucide-react";
import useFetch from "../../app/hooks/UseFetchData";
import Link from "next/link";

function Neighborhoods({ region }) {
  const { data, loading, error } = useFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/destinations/?category=Food+and+Drink+Spots&county=${region}`
  );

  if (loading || error) return <div>Loading......</div>;

  return (
    <section className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Top Attractions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((attraction) => (
          <Link
            key={attraction.id}
            href={`/destinations/place?id=${
              attraction.id
            }&place=${encodeURIComponent(attraction.name)}`}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
          >
            <div>
              <img
                src={attraction.images || attraction.image_url}
                alt={attraction.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{attraction.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{attraction.average_rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {attraction.description}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="line-clamp-1">
                      {attraction.hours_of_operation}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 line-clamp-1">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="line-clamp-1">
                      {attraction.admission_fees}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Neighborhoods;
