"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { Heart, LogOut } from "lucide-react";
import useStore from "../../store";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Profile = () => {
  const user = useStore((state) => state.user); // Access the user object from Zustand store
  const logout = useStore((state) => state.logout); // Import logout from store
  const destinations = useStore((state) => state.destinations); // Access saved destinations from Zustand store
  const removeDestination = useStore((state) => state.removeDestination); // Access removeDestination from Zustand store
  const router = useRouter();
  const clearDestinations = useStore((state) => state.clearDestinations);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">
          User not logged in. Please log in.
        </p>
      </div>
    );
  }

  const handleUnsaveDestination = (id) => {
    removeDestination(id); // Remove the destination from the Zustand store
    toast("Destination removed from saved list", {
      description: "You can add it back anytime by saving it again.",
    });
  };

  const handleLogout = () => {
    clearDestinations();
    logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  // Get first name for welcome message
  const getFirstName = (fullName) => {
    if (!fullName) return "";
    return fullName.split(" ")[0];
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pt-24">
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-travel-blue/30 to-travel-beige/40 rounded-xl p-6 md:p-8 mb-8 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold text-travel-dark">
                  Welcome back, {getFirstName(user.full_name)}!
                </h1>
                <div className="flex items-center mt-2 text-travel-gray">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>{user.email}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-white/80 backdrop-blur-sm px-5 py-3 rounded-lg shadow-sm">
                  <p className="text-travel-gray">Saved Destinations</p>
                  <p className="text-2xl font-semibold text-travel-dark">
                    {destinations.length}
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Saved Destinations */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-travel-dark mb-6 flex items-center">
            Saved Destinations
            <span className="ml-3 bg-travel-beige text-travel-dark text-sm py-1 px-3 rounded-full">
              {destinations.length}
            </span>
          </h2>

          {destinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {destinations.map((destination, index) => (
                <DestinationCard
                  key={`${destination.id}-${index}`} // Ensure unique keys
                  destination={destination}
                  onUnsave={handleUnsaveDestination}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <h3 className="text-xl font-semibold text-travel-dark mb-2">
                No saved destinations yet
              </h3>
              <p className="text-travel-gray mb-6">
                Start exploring and save places you'd love to visit!
              </p>
              <button
                onClick={() => router.push("/destinations")}
                className="bg-travel-sky hover:bg-travel-sky/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Explore Destinations
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// Destination Card Component
const DestinationCard = ({ destination, onUnsave }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  console.log(destination);
  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-52">
        <img
          src={destination.images}
          alt={destination.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <button
          onClick={() => onUnsave(destination.id)}
          className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
        >
          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent py-4 px-4">
          <p className="text-white/90 font-medium text-sm">
            {destination.country}
          </p>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-travel-dark">
            {destination.name}
          </h3>
          <p className="text-travel-sky font-semibold">{destination.price}</p>
        </div>

        <p className="text-travel-gray text-sm mb-4 flex-grow line-clamp-3">
          {destination.description}
        </p>

        <div className="pt-2 border-t border-gray-100">
          <Link
            href={`/destinations/place?id=${destination.id}&place=${destination.name}`}
          >
            <button className="text-sm text-travel-sky hover:text-travel-dark transition-colors font-medium">
              Explore {destination.name}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
