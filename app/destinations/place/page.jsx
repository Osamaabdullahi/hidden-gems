"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Clock,
  Phone,
  Globe,
  Mail,
  Star,
  MapPin,
  DollarSign,
  Calendar,
  Heart,
  Share2,
  Navigation,
  ChevronRight,
} from "lucide-react";
import useFetch from "../../hooks/UseFetchData";
import { useSearchParams } from "next/navigation";
import { faker } from "@faker-js/faker";
import PointsOfInterest from "../../../components/Directions";
import Recommendation from "../../../components/Recommendation";

const Page = () => {
  <GalleryPlaceDetail />;
};

export default Page;

const GalleryPlaceDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const search = useSearchParams();
  const [reviews, setReviews] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const {
    data: photos,
    loading: load,
    error: err,
  } = useFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/images/?place=${search.get(
      "place"
    )}`
  );

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const { data, loading, error } = useFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/destinations/${search.get(
      "id"
    )}/`
  );

  useEffect(() => {
    // Generate an array of 10 fake reviews
    const generateFakeReviews = () => {
      const reviewsArray = [];
      for (let i = 0; i < 10; i++) {
        reviewsArray.push({
          id: i,
          userName: faker.name.fullName(),
          content: faker.lorem.sentences(3),
          rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
          date: faker.date.recent().toDateString(),
        });
      }
      setReviews(reviewsArray);
    };

    generateFakeReviews();
  }, []);

  const DATA = {
    basicInfo: {
      name: "Table Mountain",
      category: "Natural Landmark",
      location: "Table Mountain National Park, Cape Town",
      images: [
        "https://i.pinimg.com/474x/fe/57/c4/fe57c465561a1b95ca84e6c673539cf0.jpg",
        "https://i.pinimg.com/474x/d2/df/e6/d2dfe61dafdfab0e6c8c2a72cb993eef.jpg",
        "https://i.pinimg.com/474x/bc/a9/0d/bca90d6ab809c2f465f9ac8476752f18.jpg",
        "https://i.pinimg.com/474x/27/01/a2/2701a2bf9b04e7199c633d048615824c.jpg",
      ],
    },
    keyDetails: {
      description:
        "One of the New 7 Wonders of Nature, Table Mountain is a flat-topped mountain forming a prominent landmark overlooking Cape Town. Its unique rich biodiversity makes it a remarkable tourist destination.",
      hours: {
        regular: "7:30 AM - 6:30 PM",
        seasonal: "Last cable car down varies by season",
        notes: "Weather dependent operation",
      },
      contact: {
        phone: "+27 21 424 8181",
        email: "info@tablemountain.net",
        website: "www.tablemountain.net",
      },
      admission: {
        adult: "R380",
        child: "R190",
        notes: "Prices vary by season. SA residents get discounted rates.",
      },
    },
    visitorExperience: {
      features: [
        "Cable Car Rides",
        "Hiking Trails",
        "Restaurant at Summit",
        "Spectacular Views",
        "Flora and Fauna",
      ],
      bestTimes: {
        peak: "10:00 AM - 2:00 PM",
        recommended: "Early morning or late afternoon",
        seasonal: "October to March for best weather",
      },
    },
    userFeedback: {
      rating: 4.8,
      totalReviews: 12500,
      highlights: [
        "Amazing views",
        "Well maintained trails",
        "Efficient cable car service",
        "Incredible sunset views",
        "Great hiking experience",
      ],
    },
  };

  if (loading || load) return <p>Loading...</p>;
  if (error || err) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen pt-16 bg-white md:pt-20">
      <div className="px-4 py-4 mx-auto md:max-w-7xl md:py-8">
        <ImageGallery images={photos} mainImg={data.images} />

        {/* Header */}
        <div className="flex flex-col gap-4 mb-6 md:flex-row md:justify-between md:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2 md:gap-3">
              <span className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-50 rounded-full">
                {data.category}
              </span>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-medium">{data.average_rating}</span>
                <span className="text-gray-500">
                  ({DATA.userFeedback.totalReviews.toLocaleString()})
                </span>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2 md:text-4xl">{data.name}</h1>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{data.county}</span>
            </div>
          </div>

          <div className="flex gap-2 md:gap-3">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-xl ${
                isLiked ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-600"
              } hover:bg-gray-100 transition-colors md:p-3`}
            >
              <Heart
                className={`w-5 h-5 md:w-6 md:h-6 ${
                  isLiked ? "fill-current" : ""
                }`}
              />
            </button>
            <button className="p-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors md:p-3">
              <Share2 className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={handleToggleVisibility}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors md:px-6 md:py-3 md:text-base"
            >
              <Navigation className="w-4 h-4 md:w-5 md:h-5" />
              Get Directions
            </button>
          </div>
        </div>

        {/* <QuickInfo data={data} /> */}

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          <div className="md:col-span-2">
            <div className="prose max-w-none mb-6 md:mb-8">
              <h2 className="text-xl font-bold mb-3 md:text-2xl md:mb-4">
                About
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {data.description}
              </p>
            </div>

            <h2 className="text-xl font-bold mb-3 md:text-2xl md:mb-4">
              Features & Highlights
            </h2>
            <div className="grid grid-cols-1 gap-3 mb-6 sm:grid-cols-2 md:gap-4 md:mb-8">
              {/* {data.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl md:p-4"
                >
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="font-medium">{feature.name}</span>
                </div>
              ))} */}
            </div>

            <h2 className="text-xl font-bold mb-3 md:text-2xl md:mb-4">
              Visitor Reviews
            </h2>

            {/* <div className="space-y-3 md:space-y-4">
              {reviews.map((review, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-xl md:p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(review.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        } fill-current`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">{review.content}</p>
                  <div className="text-xs text-gray-500 mt-1">
                    <span>
                      - {review.userName},{" "}
                      {new Date(review.date).toDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div> */}
            <Reviews destination={data.name} />
          </div>

          <div className="space-y-4 md:space-y-6">
            <FeatureCard
              icon={Clock}
              title="Hours"
              content={
                <div>
                  <p>{data.hours_of_operation}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {DATA.keyDetails.hours.notes}
                  </p>
                </div>
              }
            />
            <FeatureCard
              icon={DollarSign}
              title="Admission"
              content={
                <div>
                  <p> {data.admission_fees}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {DATA.keyDetails.admission.notes}
                  </p>
                </div>
              }
            />
            <FeatureCard
              icon={Calendar}
              title="Best Times to Visit"
              content={
                <div>
                  <p>Peak Hours: {DATA.visitorExperience.bestTimes.peak}</p>
                  <p>Recommended: {data.best_times_to_visit}</p>
                  <p>
                    Best Season: {DATA.visitorExperience.bestTimes.seasonal}
                  </p>
                </div>
              }
            />
            <FeatureCard
              icon={Phone}
              title="Contact"
              content={
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {data.contact_phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {data.contact_email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {data.contact_website}
                  </p>
                </div>
              }
            />
          </div>
        </div>

        <Recommendation title={"Similar Places"} category={data.category} />
        <Recommendation
          title={"Safari Destinations"}
          category={"Safari Destinations"}
        />
        <MapOfPlace
          handleToggleVisibility={handleToggleVisibility}
          isVisible={isVisible}
          map_location={data.map_location}
        />
      </div>
    </div>
  );
};

const ImageGallery = ({ images, mainImg }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  console.log("_____________>", images);

  return (
    <div className="grid grid-cols-1 gap-2 mb-6 md:grid-cols-4 md:gap-4 md:mb-8">
      <div className="md:col-span-2 md:row-span-2">
        <img
          src={mainImg}
          alt={"main image"}
          className="w-full h-64 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity md:h-[72vh]"
          onClick={() => setSelectedImage(0)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 md:col-span-2 md:gap-4">
        {images.map((item, index) => (
          <div key={index + 1} className="relative">
            <img
              src={item.image}
              alt={`${item.place} ${index + 2}`}
              className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity md:h-48"
              onClick={() => setSelectedImage(index + 1)}
            />
            {index === 3 && images.length > 5 && (
              <button
                onClick={() => setShowAllImages(true)}
                className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center text-white font-semibold"
              >
                <span className="text-sm md:text-base">
                  +{images.length - 5} more
                </span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const QuickInfo = ({ data }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl mb-6 md:flex md:gap-8 md:p-6 md:mb-8">
      <div>
        <div className="text-sm text-gray-500 mb-1">Hours Today</div>
        <div className="font-semibold">{data.hours_of_operation}</div>
      </div>
      <div>
        <div className="text-sm text-gray-500 mb-1">Adult Admission</div>
        <div className="font-semibold">{data.admission_fees}</div>
      </div>
      <div>
        <div className="text-sm text-gray-500 mb-1">Best Time</div>
        <div className="font-semibold">{data.best_times_to_visit}</div>
      </div>
      <div>
        <div className="text-sm text-gray-500 mb-1">Rating</div>
        <div className="font-semibold flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          {data.average_rating}
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, content }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm md:p-6">
      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="text-gray-600 space-y-1">{content}</div>
    </div>
  );
};

const RecommendedPlaces = ({ category }) => {
  const { data, error, loading } = useFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/places/?category=${category}`
  );

  if (loading || error) return <div>Loading.....</div>;
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <motion.section
        className="py-24 px-6 md:px-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-light text-black mb-16 text-center tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Similar Places
          </motion.h2>

          <div className="grid gap-12 md:grid-cols-3">
            {data.slice(0, 9).map((place, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={place.images || place.image_url}
                    alt={place.name}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="mt-6">
                  <h3 className="text-2xl font-light text-black mb-2 tracking-wider line-clamp-1">
                    {place.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {place.description}
                  </p>
                  <span className="text-xs uppercase tracking-wider text-gray-500">
                    {place.category}
                  </span>

                  <motion.button
                    className="mt-4 flex items-center space-x-2 text-black group/button"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-sm uppercase tracking-wider">
                      View More
                    </span>
                    <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-2" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

const MapOfPlace = ({ handleToggleVisibility, isVisible, map_location }) => {
  if (!isVisible) return null;

  function extractLatLong(mapLocation) {
    if (mapLocation) {
      const [lat, long] = mapLocation
        .replace(/[()]/g, "")
        .split(", ")
        .map(Number);
      return { latitude: lat, longitude: long };
    }
    return { latitude: null, longitude: null };
  }

  // Example usage
  const { latitude, longitude } = extractLatLong(map_location);
  console.log("Latitude:", latitude); // Output: -1.2641
  console.log("Longitude:", longitude); // Output: 36.8034
  console.log(map_location, "*******");

  return (
    <>
      {/* Overlay background */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={handleToggleVisibility}
      />

      {/* Centered map container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-green-400 w-4/5 max-w-4xl h-3/4 rounded-xl  relative">
          {/* Close button */}
          <button
            onClick={handleToggleVisibility}
            className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 z-40"
          >
            ✕
          </button>

          {/* Map content */}
          <div className="w-full h-full flex items-center justify-center">
            <PointsOfInterest longitude={longitude} latitude={latitude} />
          </div>
        </div>
      </div>
    </>
  );
};

const Reviews = ({ destination }) => {
  const [reviews, setReviews] = useState([]);

  const getReviews = async (destination) => {
    const apiUrl = `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/api/reviews?destination=${encodeURIComponent(destination)}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    if (destination) {
      getReviews(destination);
    }
  }, [destination]);

  return (
    <div className="space-y-3 md:space-y-4">
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={review.id} className="p-3 bg-gray-50 rounded-xl md:p-4">
            <div className="flex items-center gap-1 mb-2">
              {/* Rendering stars based on the review rating */}
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating ? "text-yellow-400" : "text-gray-300"
                  } fill-current`}
                />
              ))}
            </div>
            <p className="text-gray-600">{review.comment}</p>
            <div className="text-xs text-gray-500 mt-1">
              <span>
                - {review.full_name}, {new Date(review.date).toDateString()}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p>No reviews available for this destination.</p>
      )}
    </div>
  );
};
