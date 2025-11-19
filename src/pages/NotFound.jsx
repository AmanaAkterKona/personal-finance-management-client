import React from "react";
import { Link } from "react-router";
import error404 from "../assets/App-Error.png";
import useTheme from "../pages/useTheme";

const NotFound = () => {
  const { theme } = useTheme(); // ⬅ dark/light mode

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500
      ${theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800"}`}
    >
      <img 
        src={error404} 
        alt="404 Not Found" 
        className="w-80 mb-6 drop-shadow-lg"
      />

      <h1 className={`text-4xl font-bold mb-3 ${theme === "dark" ? "text-blue-400" : "text-blue-700"}`}>
        Page Not Found
      </h1>

      <p className={`text-lg max-w-md text-center mb-8 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className={`px-6 py-3 rounded-xl shadow-md transition 
          ${theme === "dark" ? "bg-blue-700 text-white hover:bg-blue-600" : "bg-blue-600 text-white hover:bg-blue-700"}`}
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
