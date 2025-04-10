"use client";
import useFetch from "./hooks/UseFetchData";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CoolPlaces from "../components/Places";
import Safari from "../components/features/Safari";
import Restaurants from "../components/features/Restaurants";
import Curated from "../components/features/Curated";

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const { data, error, loading } = useFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/destinations/?category=safari`
  );

  const {
    data: history,
    error: err,
    loading: load,
  } = useFetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/destinations/?category=Historical%20Sites`
  );

  if (loading || error || load || err) return <div>loading....</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 ">
      <Navbar />
      <HeroSection />
      <CoolPlaces />
      <Safari
        title=" Curated Safari Experiences"
        tours={data}
        fadeInUp={fadeInUp}
        category={"Safari Destinations"}
      />
      <Safari
        title=" Historical Sites & Monuments"
        tours={history}
        fadeInUp={fadeInUp}
        category={"Historical Sites"}
      />
      <Restaurants />
      <Curated />
    </div>
  );
}
