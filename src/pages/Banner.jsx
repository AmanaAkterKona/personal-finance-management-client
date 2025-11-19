import React from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";
import useTheme from "../pages/useTheme";

const Banner = () => {
  const navigate = useNavigate();
  const { theme } = useTheme(); // ⬅ dark/light mode

  return (
    <div
      className={`w-full min-h-[70vh] flex flex-col justify-center items-center text-center px-6 
        relative overflow-hidden transition-colors duration-500
        ${theme === "dark" 
          ? "bg-gray-900 text-gray-200" 
          : "bg-gradient-to-br from-[#FFE6F3] via-[#F5F7FF] to-[#E9FFF7] text-gray-800"}
      `}
    >
      {/* Soft curve shapes */}
      <div className="absolute left-0 top-0 w-[300px] h-[300px] opacity-40 pointer-events-none">
        <svg viewBox="0 0 200 200" className={`w-full h-full ${theme === "dark" ? "text-gray-700" : "text-pink-200"}`}>
          <path
            fill="currentColor"
            d="M43.6,-75.1C56.3,-68.3,65.7,-55.8,71.6,-42.6C77.4,-29.3,79.7,-14.7,78.6,-0.8C77.4,13,73,26,66.5,38.2C60,50.5,51.3,62.1,40,69.3C28.7,76.4,14.3,79.2,0.5,78.4C-13.2,77.6,-26.3,73.3,-38.3,66.2C-50.3,59,-61.2,49.1,-68.4,36.5C-75.6,24,-79.1,8.8,-78.5,-6.5C-78,-21.8,-73.4,-36.9,-64.7,-48.5C-56,-60,-43.2,-68,-29.5,-74.2C-15.7,-80.4,-0.9,-84.7,12.6,-83.3C26,-82,37.3,-75.1,43.6,-75.1Z"
          />
        </svg>
      </div>

      <div className="absolute right-0 bottom-0 w-[300px] h-[300px] opacity-30 pointer-events-none">
        <svg viewBox="0 0 200 200" className={`w-full h-full ${theme === "dark" ? "text-gray-800" : "text-purple-200"}`}>
          <path
            fill="currentColor"
            d="M43.6,-75.1C56.3,-68.3,65.7,-55.8,71.6,-42.6C77.4,-29.3,79.7,-14.7,78.6,-0.8C77.4,13,73,26,66.5,38.2C60,50.5,51.3,62.1,40,69.3C28.7,76.4,14.3,79.2,0.5,78.4C-13.2,77.6,-26.3,73.3,-38.3,66.2C-50.3,59,-61.2,49.1,-68.4,36.5C-75.6,24,-79.1,8.8,-78.5,-6.5C-78,-21.8,-73.4,-36.9,-64.7,-48.5C-56,-60,-43.2,-68,-29.5,-74.2C-15.7,-80.4,-0.9,-84.7,12.6,-83.3C26,-82,37.3,-75.1,43.6,-75.1Z"
          />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-3xl">
        <h1 className={`text-4xl md:text-6xl font-extrabold leading-tight
          ${theme === "dark" ? "text-gray-200" : "text-gray-900"}
        `}>
          <span>Manage Your</span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
            Finances
          </span>{" "}
          <span>Smarter!</span>
        </h1>

        <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} mt-4 text-lg md:text-xl`}>
          Track your expenses, control your spending, and build a financially
          stable future — all in one place.
        </p>

        {/* Search bar */}
        <div className="mt-7 flex justify-center">
          <div className={`flex items-center shadow-lg rounded-full px-5 py-3 w-full max-w-xl transition-colors duration-300
            ${theme === "dark" ? "bg-gray-800" : "bg-white"}
          `}>
            <input
              type="text"
              placeholder="Search expenses, savings goals…"
              className={`flex-1 outline-none transition-colors duration-300 ${theme === "dark" ? "text-gray-200 bg-gray-800" : "text-gray-700 bg-white"}`}
            />
            <button className="text-white bg-gradient-to-r from-purple-600 to-pink-500 p-2 rounded-full">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/transactions")}
            className="px-7 py-3 text-white font-semibold rounded-lg
              bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg hover:scale-105 transition"
          >
            View All Transactions
          </button>

          <button
            onClick={() => navigate("/add")}
            className={`px-7 py-3 font-semibold rounded-lg hover:scale-105 transition border
              ${theme === "dark" 
                ? "bg-gray-700 text-gray-200 border-gray-500 hover:border-gray-400" 
                : "bg-white text-purple-700 border-purple-400 hover:border-purple-600"
              }
            `}
          >
            Add New Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
