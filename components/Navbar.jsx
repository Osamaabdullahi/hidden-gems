"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Globe,
  Map,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Compass,
  Camera,
  BookMarked,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useStore from "../store"; // Import the Zustand store

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showExplore, setShowExplore] = useState(false);
  const currentPath = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const isAuthenticated = useStore((state) => state.isAuthenticated); // Access isAuthenticated from the store

  const menuItems = [
    { icon: Compass, label: "Explore", hasSubmenu: true },
    { icon: Map, label: "destinations" },
    { icon: Camera, label: "counties" },
    { icon: BookMarked, label: "safari" },
  ];

  const handleroute = () => {
    router.push("/destinations");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/destinations?query=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="relative">
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Left section - Logo and main nav */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center mr-8">
                <Globe className="h-8 w-8 text-black" />
                <Link href={"/"}>
                  <span className="ml-2 text-xl font-bold cursor-pointer">
                    Hidden Gems
                  </span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-1">
                {menuItems.map((item) =>
                  item.label === "Explore" ? (
                    <button
                      key={item.label}
                      className={`${
                        currentPath.slice(1) === item.label
                          ? "bg-gray-300"
                          : "text-black"
                      } flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors relative`}
                      onClick={() =>
                        item.hasSubmenu && setShowExplore(!showExplore)
                      }
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                      {item.hasSubmenu && (
                        <ChevronDown
                          className={`ml-1 w-4 h-4 transition-transform ${
                            showExplore ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>
                  ) : (
                    <Link key={item.label} href={`/${item.label}`}>
                      <button
                        className={`${
                          currentPath.slice(1) === item.label
                            ? "bg-gray-300"
                            : "text-black"
                        } flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors relative`}
                        onClick={() =>
                          item.hasSubmenu && setShowExplore(!showExplore)
                        }
                      >
                        <item.icon className="w-4 h-4 mr-2" />
                        {item.label}
                        {item.hasSubmenu && (
                          <ChevronDown
                            className={`ml-1 w-4 h-4 transition-transform ${
                              showExplore ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </button>
                    </Link>
                  )
                )}
              </div>
            </div>

            {/* Right section - Search and actions */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleSearch}
                    className="w-64 h-10 pl-10 pr-4 rounded-lg bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Heart className="w-5 h-5" />
              </button>

              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  {/* <div
                    className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center cursor-pointer"
                    onClick={() => router.push("/profile")} 
                  >
                    <User className="w-4 h-4" />
                  </div> */}

                  <Link
                    href={"/profile"}
                    className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center cursor-pointer"
                  >
                    <User className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <Link href="/sighup">
                  <button className="text-white bg-black px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-900">
                    Sign Up
                  </button>
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Explore Dropdown */}
          <AnimatePresence>
            {showExplore && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 right-0 top-full bg-white shadow-lg border-t border-gray-100 py-6 px-4"
              >
                <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      Popular Regions
                    </h3>
                    <ul className="space-y-2">
                      <li
                        onClick={handleroute}
                        className="text-gray-600 hover:text-black cursor-pointer text-sm"
                      >
                        Coast
                      </li>

                      <li
                        onClick={handleroute}
                        className="text-gray-600 hover:text-black cursor-pointer text-sm"
                      >
                        Rift Valley
                      </li>

                      <li
                        onClick={handleroute}
                        className="text-gray-600 hover:text-black cursor-pointer text-sm"
                      >
                        Western
                      </li>

                      <li
                        onClick={handleroute}
                        className="text-gray-600 hover:text-black cursor-pointer text-sm"
                      >
                        Central
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      Categories
                    </h3>
                    <ul className="space-y-2">
                      <li
                        onClick={handleroute}
                        className="text-gray-600 hover:text-black cursor-pointer text-sm"
                      >
                        Coastal Cities
                      </li>
                      <li
                        onClick={handleroute}
                        className="text-gray-600 hover:text-black cursor-pointer text-sm"
                      >
                        Historical Sites
                      </li>
                      <li
                        onClick={handleroute}
                        className="text-gray-600 hover:text-black cursor-pointer text-sm"
                      >
                        Safari Destinations
                      </li>
                      <li
                        onClick={handleroute}
                        className="text-gray-600 hover:text-black cursor-pointer text-sm"
                      >
                        Mountain Regions
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      Trending
                    </h3>
                    <ul className="space-y-2">
                      <li
                        onClick={handleroute}
                        className="text-gray-600 hover:text-black cursor-pointer text-sm"
                      >
                        Lamu, coast
                      </li>
                      <li
                        onClick={handleroute}
                        className="text-gray-600 hover:text-black cursor-pointer text-sm"
                      >
                        Nairobi Central
                      </li>
                      <li
                        onClick={handleroute}
                        className="text-gray-600 hover:text-black cursor-pointer text-sm"
                      >
                        mombase, Coast
                      </li>
                      <li
                        onClick={handleroute}
                        className="text-gray-600 hover:text-black cursor-pointer text-sm"
                      >
                        Nakuru, Rift Valley
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200"
            >
              <div className="px-4 py-6 space-y-4">
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleSearch}
                    className="w-full h-10 pl-10 pr-4 rounded-lg bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>

                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium"
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                    {item.hasSubmenu && (
                      <ChevronDown className="ml-auto w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;
