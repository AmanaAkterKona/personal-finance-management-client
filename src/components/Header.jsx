import React, { use } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo 2.png";
import { AuthContext } from "../contexts/AuthContext";
import useTheme from "../pages/useTheme"; 
import { 
  HiOutlineHome, 
  HiOutlineUserCircle,
  HiOutlineLogout,
  HiMenuAlt1,
  HiOutlineInformationCircle,
  HiOutlineMail,
  HiOutlineViewGrid // ড্যাশবোর্ড আইকন
} from "react-icons/hi";

const Header = () => {
  const { user, logOut } = use(AuthContext);
  const { theme } = useTheme();

  // Active NavLink Styling
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-2 py-2 font-semibold transition-all duration-300 relative group ${
      isActive
        ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
        : theme === "dark"
        ? "text-gray-400 hover:text-white"
        : "text-gray-500 hover:text-blue-600"
    }`;

  // রিকোয়ারমেন্ট ২: লগ-আউট অবস্থায় অন্তত ৩টি রুট
  const publicLinks = (
    <>
      <li>
        <NavLink to="/" className={navLinkClasses}>
          <HiOutlineHome className="text-xl" />
          <span>Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={navLinkClasses}>
          <HiOutlineInformationCircle className="text-xl" />
          <span>About</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className={navLinkClasses}>
          <HiOutlineMail className="text-xl" />
          <span>Contact</span>
        </NavLink>
      </li>
    </>
  );

  // রিকোয়ারমেন্ট ২ ও ৭: লগ-ইন অবস্থায় Dashboard সহ রুট
  const privateLinks = (
    <>
      {publicLinks}
      <li>
        <NavLink to="/dashboard" className={navLinkClasses}>
          <HiOutlineViewGrid className="text-xl" />
          <span>Dashboard</span>
        </NavLink>
      </li>
    </>
  );

  return (
    <div
      className={`navbar sticky top-0 z-50 transition-all duration-500
        px-4 md:px-10 lg:px-16 py-2
        ${
          theme === "dark"
            ? "bg-gray-900/95 text-gray-200 border-b border-gray-800 shadow-xl"
            : "bg-gradient-to-r from-blue-50/90 via-white/95 to-rose-50/90 backdrop-blur-xl text-gray-800 border-b border-blue-100/50 shadow-sm"
        }`}
    >
      {/* LEFT: Mobile Menu & Logo */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <HiMenuAlt1 className="text-2xl" />
          </div>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl rounded-2xl w-56 border ${
              theme === "dark" 
                ? "bg-gray-800 border-gray-700 text-gray-200" 
                : "bg-white border-gray-100 text-gray-800"
            }`}
          >
            {user ? privateLinks : publicLinks}
          </ul>
        </div>
        
        <div className="flex items-center gap-3">
          <img className="h-10 md:h-12 w-auto object-contain rounded-lg hidden sm:block" src={logo} alt="FinEase Logo" />
          <Link to="/" className="text-xl md:text-2xl font-black tracking-tighter select-none">
            <span className="bg-gradient-to-r from-[#2563EB] via-[#9333EA] to-[#F472B6] bg-clip-text text-transparent">
              FinEase
            </span>
          </Link>
        </div>
      </div>

      {/* CENTER: Desktop Navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0 gap-4 xl:gap-8">
          {user ? privateLinks : publicLinks}
        </ul>
      </div>

      {/* RIGHT: Auth Actions & Profile Dropdown */}
      <div className="navbar-end flex items-center gap-4">
        {!user ? (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className={`hidden sm:block px-5 py-2.5 rounded-full font-bold transition-all ${
                theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2.5 rounded-full font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg transition-all active:scale-95 shadow-md shadow-blue-200 dark:shadow-none"
            >
              Get Started
            </Link>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="group p-0.5 rounded-full border-2 border-transparent hover:border-blue-500 transition-all duration-300 shadow-sm"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 dark:border-gray-700">
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* রিকোয়ারমেন্ট ৭ অনুযায়ী প্রোফাইল ড্রপডাউন */}
            <ul
              tabIndex={0}
              className={`menu dropdown-content mt-4 z-[1] p-4 shadow-2xl rounded-2xl w-64 border ${
                theme === "dark" 
                  ? "bg-gray-800 border-gray-700 text-gray-200" 
                  : "bg-white border-blue-50 text-gray-800"
              }`}
            >
              <div className="px-2 pb-3 mb-3 border-b border-gray-100 dark:border-gray-700">
                <p className="font-bold text-lg truncate leading-tight">{user.displayName || "FinEase User"}</p>
                <p className="text-xs opacity-60 truncate mt-1">{user.email}</p>
              </div>
              
              <li>
                <Link to="/profile" className="flex items-center gap-2 py-3 hover:text-blue-600 transition-all">
                  <HiOutlineUserCircle className="text-xl" />
                  View Profile
                </Link>
              </li>

              {/* রিকোয়ারমেন্ট ৭: প্রোফাইল ড্রপডাউনে Dashboard Home লিঙ্ক */}
              <li>
                <Link to="/dashboard" className="flex items-center gap-2 py-3 hover:text-blue-600 transition-all">
                  <HiOutlineViewGrid className="text-xl" />
                  Dashboard Home
                </Link>
              </li>
              
              <li className="mt-2">
                <button
                  onClick={logOut}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-bold bg-rose-50 dark:bg-rose-900/20 text-rose-600 hover:bg-rose-600 hover:text-white transition-all group"
                >
                  <HiOutlineLogout className="text-xl group-hover:translate-x-1 transition-transform" />
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;