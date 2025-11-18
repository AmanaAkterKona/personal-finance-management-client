import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { SiX } from "react-icons/si";
import logo from '../assets/logo 2.png';
import { Link } from "react-router";

const Footer = () => {
  const [darkMode, setDarkMode] = useState(false);

  // On component mount, check localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-12 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
          {/* Logo */}
          <div className="flex flex-col gap-4">
            <div className="navbar-start flex items-center gap-2">
              <img className="h-16 w-auto rounded-full" src={logo} alt="logo" />
              <Link to="/" className="text-3xl font-extrabold select-none">
                <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  FinEase
                </span>
              </Link>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm">
              Manage your finances easily, track expenses, and achieve your
              financial goals with FinEase.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <h3 className="text-gray-900 dark:text-white font-semibold text-lg">Contact Us</h3>
            <p>Email: support@finease.com</p>
            <p>Phone: +880 1234 567890</p>
            <p>Address: 123 Finance Street, Dhaka, Bangladesh</p>
          </div>

          {/* Links + Social */}
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-gray-900 dark:text-white font-semibold text-lg">Quick Links</h3>
              <ul className="flex flex-col gap-2 mt-2">
                <li><a href="/terms" className="hover:text-blue-500 dark:hover:text-blue-400 transition">Terms & Conditions</a></li>
                <li><a href="/privacy" className="hover:text-blue-500 dark:hover:text-blue-400 transition">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Social Icons */}
            <div>
              <h3 className="text-gray-900 dark:text-white font-semibold text-lg">Follow Us</h3>
              <div className="flex gap-4 mt-2">
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition"><FaFacebookF /></a>
                <a href="#" className="hover:text-black dark:hover:text-gray-300 transition text-xl "><SiX /></a>
                <a href="#" className="hover:text-pink-500 dark:hover:text-pink-400 transition"><FaInstagram /></a>
                <a href="#" className="hover:text-blue-700 dark:hover:text-blue-500 transition"><FaLinkedinIn /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="flex justify-center mt-8">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-300 dark:border-gray-700 mt-10 pt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} FinEase. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
