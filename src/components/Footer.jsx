import React from "react";
import { FaSun, FaMoon, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { SiX } from "react-icons/si";
import logo from "../assets/logo 2.png";
import { Link } from "react-router";
import useTheme from "../pages/useTheme";

const Footer = () => {
  const { theme, toggleTheme } = useTheme(); 

  // Determine main text color
  const mainTextColor = theme === "dark" ? "text-gray-400" : "text-gray-700";

  return (
    <footer className={`bg-gray-100 dark:bg-gray-900 py-12 transition-colors duration-500`}>
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
            <p className={`${mainTextColor} max-w-sm`}>
              Manage your finances easily, track expenses, and achieve your
              financial goals with FinEase.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <h3 className={`font-semibold text-lg ${mainTextColor}`}>Contact Us</h3>
            <p className={mainTextColor}>Email: proff.kona@gmail.com</p>
            <p className={mainTextColor}>Phone: +8801796589899</p>
            <p className={mainTextColor}>Address: 123 Finance Street, Dhaka, Bangladesh</p>
          </div>

          {/* Links + Social */}
          <div className="flex flex-col gap-4">
            <div>
              <h3 className={`font-semibold text-lg ${mainTextColor}`}>Quick Links</h3>
              <ul className="flex flex-col gap-2 mt-2">
                <li>
                  <a href="/terms" className="hover:text-blue-500 dark:hover:text-blue-400 transition">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-blue-500 dark:hover:text-blue-400 transition">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Icons */}
            <div>
              <h3 className={`font-semibold text-lg ${mainTextColor}`}>Follow Us</h3>
              <div className="flex gap-4 mt-2">
                <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition"><FaFacebookF /></a>
                <a href="#" className="hover:text-black dark:hover:text-gray-300 transition text-xl"><SiX /></a>
                <a href="#" className="hover:text-pink-500 dark:hover:text-pink-400 transition"><FaInstagram /></a>
                <a href="#" className="hover:text-blue-700 dark:hover:text-blue-500 transition"><FaLinkedinIn /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => toggleTheme(theme === "dark" ? false : true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              theme === "dark"
                ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Bottom */}
        <div className={`border-t mt-10 pt-6 text-center text-sm ${theme === "dark" ? "text-gray-400 border-gray-700" : "text-gray-700 border-gray-300"}`}>
          &copy; {new Date().getFullYear()} FinEase. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
