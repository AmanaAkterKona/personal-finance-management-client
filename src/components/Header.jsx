import React, { use } from 'react';
import { NavLink, Link } from 'react-router';
import logo from "../assets/logo 2.png";
import { AuthContext } from '../contexts/AuthContext';

const Header = () => {
    const { user, logOut } = use(AuthContext);

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `px-3 py-2 font-medium text-gray-700 hover:underline hover:underline-offset-4 transition-all ${
                            isActive ? "text-blue-500 font-bold" : ""
                        }`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/add"
                    className={({ isActive }) =>
                        `px-3 py-2 font-medium text-gray-700 hover:underline hover:underline-offset-4 transition-all ${
                            isActive ? "text-blue-500 font-bold" : ""
                        }`
                    }
                >
                    Add Transaction
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/transactions"
                    className={({ isActive }) =>
                        `px-3 py-2 font-medium text-gray-700 hover:underline hover:underline-offset-4 transition-all ${
                            isActive ? "text-blue-500 font-bold" : ""
                        }`
                    }
                >
                    My Transactions
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/reports"
                    className={({ isActive }) =>
                        `px-3 py-2 font-medium text-gray-700 hover:underline hover:underline-offset-4 transition-all ${
                            isActive ? "text-blue-500 font-bold" : ""
                        }`
                    }
                >
                    Reports
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        `px-3 py-2 font-medium text-gray-700 hover:underline hover:underline-offset-4 transition-all ${
                            isActive ? "text-blue-500 font-bold" : ""
                        }`
                    }
                >
                    Profile
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar sticky top-0 z-50 
            bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50
            shadow-md transition-colors duration-500">

            {/* LEFT */}
            <div className="navbar-start flex items-center gap-2">
                <img className="h-16 w-auto rounded-full" src={logo} alt="logo" />
                <Link to="/" className="text-3xl font-extrabold select-none">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        FinEase
                    </span>
                </Link>
            </div>

            {/* CENTER */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
            </div>

            {/* RIGHT */}
            <div className="navbar-end flex items-center gap-3">
                {!user ? (
                    <>
                        <Link
                            to="/login"
                            className="px-4 py-2 border-2 border-transparent rounded-lg font-medium text-gray-700 hover:bg-gradient-to-r hover:from-purple-100 hover:via-pink-100 hover:to-blue-100 transition-all"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="px-4 py-2 bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 rounded-lg font-medium text-white hover:scale-105 transform transition-all"
                        >
                            Signup
                        </Link>
                    </>
                ) : (
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <img src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} />
                            </div>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu dropdown-content bg-gradient-to-b from-white via-gray-50 to-gray-100 rounded-lg w-56 p-2 shadow-lg"
                        >
                            <li className="text-center font-semibold">{user.displayName}</li>
                            <li className="text-center text-sm opacity-70 mb-2">{user.email}</li>
                            <li>
                                <button
                                    onClick={logOut}
                                    className="w-full px-4 py-2 bg-gradient-to-r from-red-300 via-pink-300 to-purple-300 text-white rounded-lg font-semibold hover:scale-105 transition-all"
                                >
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
