"use client";
import React, { useState } from "react";
import {
  MapPin,
  Star,
  Heart,
  Share2,
  Building,
  Shield,
  Globe,
  ChevronRight,
  Book,
} from "lucide-react";
import AttractionsFilter from "../../../components/Filter";
import Overview from "../../../components/content/Overview";
import Attractions from "../../../components/content/Attractions";
import Tips from "../../../components/content/Tips";
import { useSearchParams } from "next/navigation";
import useFetch from "../../..//app/hooks/UseFetchData";
import Neighborhoods from "../../../components/content/Neighborhoods";

const CityDetail = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [expandedSections, setExpandedSections] = useState({});
  const search = useSearchParams();
  const { data, loading, error } = useFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/counties/?name=${search.get(
      "city"
    )}`
  );

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAllEmergencyContacts, setShowAllEmergencyContacts] =
    useState(false);

  const renderContent = () => {
    switch (selectedTab) {
      case "overview":
        return <Overview data={data} />;

      case "attraction":
        return <Attractions region={search.get("city")} />;

      case "dining":
        return <Neighborhoods region={search.get("city")} />;

      case "activities":
        return <Attractions region={search.get("city")} />;

      case "tips":
        return <Tips />;

      default:
        return null;
    }
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderSidebarSection = (title, content, icon) => {
    const isExpanded = expandedSections[title] ?? false;

    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <button
          onClick={() => toggleSection(title)}
          className="w-full flex items-center justify-between mb-4"
        >
          <div className="flex items-center gap-2">
            {icon}
            <h3 className="font-semibold">{title}</h3>
          </div>
          <ChevronRight
            className={`w-5 h-5 transition-transform ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
        </button>

        {isExpanded && (
          <div className="space-y-4 animate-fadeIn">{content}</div>
        )}
      </div>
    );
  };

  const renderSidebar = () => {
    if (!data || data.length === 0) return null;

    const cityInfo = data[0];

    return (
      <div className="space-y-6">
        {/* Demographics and Economy */}
        {renderSidebarSection(
          "Demographics & Economy",
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Average Income</h4>
              <p className="text-gray-600 text-sm">{cityInfo.average_income}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">Major Industries</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {cityInfo.major_industries.split(", ").map((industry) => (
                  <li key={industry}>{industry}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">Cost of Living</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Rent</span>
                  <span>{cityInfo.cost_of_living_rent}</span>
                </div>
                <div className="flex justify-between">
                  <span>Utilities</span>
                  <span>{cityInfo.cost_of_living_utilities}</span>
                </div>
                <div className="flex justify-between">
                  <span>Meal</span>
                  <span>{cityInfo.meal_cost}</span>
                </div>
                <div className="flex justify-between">
                  <span>Transport</span>
                  <span>{cityInfo.transport_cost}</span>
                </div>
              </div>
            </div>
          </div>,
          <Building className="w-5 h-5 text-gray-400" />
        )}

        {/* Healthcare */}
        {renderSidebarSection(
          "Healthcare",
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Major Hospitals</h4>
              <div className="mb-3">
                <p className="font-medium text-sm">{cityInfo.hospital_name}</p>
                <p className="text-sm text-gray-600">
                  Type: {cityInfo.hospital_type}
                </p>
                <p className="text-sm text-gray-600">
                  Specialties: {cityInfo.specialties}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">Health Insurance</h4>
              <p className="text-sm text-gray-600">
                {cityInfo.health_insurance_recommendation
                  ? "Health insurance is recommended for visitors and residents."
                  : "Health insurance is optional but beneficial."}
              </p>
            </div>
          </div>,
          <Heart className="w-5 h-5 text-gray-400" />
        )}

        {/* Education */}
        {renderSidebarSection(
          "Education",
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Universities</h4>
              {cityInfo.universities ? (
                cityInfo.universities.split(", ").map((uni) => (
                  <div key={uni} className="mb-3">
                    <p className="font-medium text-sm">{uni}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600">
                  No major universities in this region.
                </p>
              )}
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">Literacy Rate</h4>
              <p className="text-sm text-gray-600">{cityInfo.literacy_rate}%</p>
            </div>
          </div>,
          <Book className="w-5 h-5 text-gray-400" />
        )}

        {/* Infrastructure */}
        {renderSidebarSection(
          "Infrastructure",
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Transportation</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {cityInfo.transportation_options.split(", ").map((transit) => (
                  <li key={transit}>{transit}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">Utilities</h4>
              {cityInfo.utilities.split(", ").map((utility) => {
                const [key, value] = utility.split(": ");
                return (
                  <p key={key} className="text-sm text-gray-600 capitalize">
                    <span className="font-medium">{key}:</span> {value}
                  </p>
                );
              })}
            </div>
          </div>,
          <Globe className="w-5 h-5 text-gray-400" />
        )}

        {/* Safety */}
        {renderSidebarSection(
          "Safety & Emergency",
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Safety Index</h4>
              <p className="text-sm text-gray-600">{cityInfo.safety_index}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">Safe Areas</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {cityInfo.safe_areas.split(", ").map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">Emergency Numbers</h4>
              <div className="flex justify-between text-sm">
                <span className="capitalize">Police</span>
                <span className="font-medium">{cityInfo.police_contact}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="capitalize">Ambulance</span>
                <span className="font-medium">
                  {cityInfo.ambulance_contact}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="capitalize">County Emergency</span>
                <span className="font-medium">
                  {cityInfo.county_emergency_contact}
                </span>
              </div>
            </div>
          </div>,
          <Shield className="w-5 h-5 text-gray-400" />
        )}
      </div>
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data || data.length === 0) return <p>No data available</p>;

  const cityInfo = data[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative h-[55vh] min-h-[500px] ">
        <img
          src={cityInfo.image}
          alt={cityInfo.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        <div className="absolute inset-x-0 bottom-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl md:text-6xl text-white font-bold mb-2">
                  {cityInfo.name}
                </h1>
                <div className="flex items-center gap-4 text-white/90 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{cityInfo.region}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{cityInfo.rating}</span>
                    <span className="text-sm">
                      ({cityInfo.review_count} reviews)
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors">
                  <Heart className="w-6 h-6 text-white" />
                </button>
                <button className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors">
                  <Share2 className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="sticky top-[65px] bg-white border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {["overview", "activities", "dining", , "tips"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  selectedTab === tab
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">{renderContent()}</div>
          <div className="lg:block">
            {selectedTab === "overview" ? (
              renderSidebar()
            ) : (
              <AttractionsFilter />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CityDetail;
