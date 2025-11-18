import React from "react";

import error404 from "../assets/App-Error.png";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      
      <img 
        src={error404} 
        alt="404 Not Found" 
        className="w-80 mb-6 drop-shadow-lg"
      />

      <h1 className="text-4xl font-bold text-blue-700 mb-3">
        Page Not Found
      </h1>

      <p className="text-gray-600 text-lg max-w-md text-center mb-8">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
