import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-10 px-6 lg:px-20 absolute ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Brand & Mission */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">ExploreLocal</h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Your guide to discovering local spots, hidden gems, and popular
            attractions.
          </p>
          <div className="flex space-x-4">
            {/* Social Icons */}
            <a href="#" className="text-gray-400 hover:text-white">
              {/* Twitter Icon */}
              <svg
                className="w-6 h-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M22.46 6c-.77.34-1.6.58-2.46.69A4.3 4.3 0 0021.85 4.6a8.67 8.67 0 01-2.75 1.05A4.29 4.29 0 0016.43 4c-2.37 0-4.3 1.94-4.3 4.34 0 .34.04.66.1.98a12.19 12.19 0 01-8.83-4.47 4.35 4.35 0 00-.58 2.18c0 1.5.76 2.82 1.91 3.6a4.25 4.25 0 01-1.95-.54v.05c0 2.1 1.49 3.85 3.46 4.25-.36.1-.73.15-1.12.15-.27 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.98A8.68 8.68 0 013 18.76a12.24 12.24 0 006.63 1.96c7.94 0 12.29-6.6 12.29-12.33v-.57a8.73 8.73 0 002.13-2.24z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              {/* GitHub Icon */}
              <svg
                className="w-6 h-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12.04 1C6.2 1 1 6.2 1 12.04 1 17.5 5.03 22 10.35 23c.76.1 1.05-.33 1.05-.73v-2.6c-2.6.56-3.14-1.29-3.14-1.29-.47-1.2-1.1-1.5-1.1-1.5-.9-.6.07-.6.07-.6 1 .08 1.48 1 1.48 1s1.14 1.84 2.88 1.3c0-.1.3-1.8.92-2.3-1.92-.2-3.88-1-3.88-4.35 0-.98.35-1.78.9-2.4-.1-.2-.43-1.1.1-2.28 0 0 .73-.2 2.4 1 .66-.2 1.35-.3 2.06-.3.7 0 1.4.1 2.05.3 1.7-1.2 2.4-1 2.4-1 .55 1.17.2 2.08.1 2.28.55.6.9 1.4.9 2.4 0 3.4-2 4.1-3.9 4.3.5.4.9 1.2.9 2.4v3.6c0 .42.3.82 1.06.73C18.97 22 23 17.5 23 12.04 23 6.2 17.84 1 12.04 1z" />
              </svg>
            </a>
            {/* Additional icons here */}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Explore</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                Historical Sites
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Cultural Centers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Nature & Outdoors
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Food & Drink
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Legal */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Contact & Info
          </h3>
          <ul className="space-y-2 text-gray-400">
            <li>Email: support@explorelocal.com</li>
            <li>Phone: (123) 456-7890</li>
          </ul>
          <div className="mt-6 space-x-4 text-sm text-gray-500">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        &copy; 2024 ExploreLocal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
