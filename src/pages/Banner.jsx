import React from "react";
import { FaSearch, FaArrowRight } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="
      w-full min-h-[70vh] flex flex-col justify-center items-center text-center px-6 
      bg-gradient-to-br from-[#FFE6F3] via-[#F5F7FF] to-[#E9FFF7]
      relative overflow-hidden
    ">

      {/* Soft curve shape left */}
      <div className="absolute left-0 top-0 w-[300px] h-[300px] opacity-40">
        <svg viewBox="0 0 200 200" className="w-full h-full text-pink-200">
          <path 
            fill="currentColor"
            d="M43.6,-75.1C56.3,-68.3,65.7,-55.8,71.6,-42.6C77.4,-29.3,79.7,-14.7,78.6,-0.8C77.4,13,73,26,66.5,38.2C60,50.5,51.3,62.1,40,69.3C28.7,76.4,14.3,79.2,0.5,78.4C-13.2,77.6,-26.3,73.3,-38.3,66.2C-50.3,59,-61.2,49.1,-68.4,36.5C-75.6,24,-79.1,8.8,-78.5,-6.5C-78,-21.8,-73.4,-36.9,-64.7,-48.5C-56,-60,-43.2,-68,-29.5,-74.2C-15.7,-80.4,-0.9,-84.7,12.6,-83.3C26,-82,37.3,-75.1,43.6,-75.1Z"
          />
        </svg>
      </div>

      {/* Soft curve shape right */}
      <div className="absolute right-0 bottom-0 w-[300px] h-[300px] opacity-30">
        <svg viewBox="0 0 200 200" className="w-full h-full text-purple-200">
          <path 
            fill="currentColor"
            d="M43.6,-75.1C56.3,-68.3,65.7,-55.8,71.6,-42.6C77.4,-29.3,79.7,-14.7,78.6,-0.8C77.4,13,73,26,66.5,38.2C60,50.5,51.3,62.1,40,69.3C28.7,76.4,14.3,79.2,0.5,78.4C-13.2,77.6,-26.3,73.3,-38.3,66.2C-50.3,59,-61.2,49.1,-68.4,36.5C-75.6,24,-79.1,8.8,-78.5,-6.5C-78,-21.8,-73.4,-36.9,-64.7,-48.5C-56,-60,-43.2,-68,-29.5,-74.2C-15.7,-80.4,-0.9,-84.7,12.6,-83.3C26,-82,37.3,-75.1,43.6,-75.1Z"
          />
        </svg>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-3xl">

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          <span className="text-[#2b2931]">Manage Your</span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
            Finances
          </span>{" "}
          <span className="text-[#2b2931]">Smarter!</span>
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-600">
          Track your expenses, control your spending, and build a financially stable future — all in one place.
        </p>

        {/* Search bar style (finance version) */}
        <div className="mt-7 flex justify-center">
          <div className="flex items-center bg-white shadow-lg rounded-full px-5 py-3 w-full max-w-xl">
            <input
              type="text"
              placeholder="Search expenses, savings goals…"
              className="flex-1 outline-none text-gray-700"
            />
            <button className="text-white bg-gradient-to-r from-purple-600 to-pink-500 p-2 rounded-full">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* CTA BUTTONS */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

          <button className="px-7 py-3 text-white font-semibold rounded-lg
            bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg hover:scale-105 transition">
            View All Transactions
          </button>

          <button className="px-7 py-3 text-purple-700 border border-purple-400 bg-white font-semibold rounded-lg hover:border-purple-600 hover:scale-105 transition">
            Add New Expense
          </button>
        </div>

      </div>
    </div>
  );
};

export default Banner;
