import React, { use } from "react";
import { NavLink } from "react-router-dom";
import { 
  HiOutlineChartBar, 
  HiOutlineUsers, 
  HiOutlineClipboardList, 
  HiOutlinePlusCircle, 
  HiOutlineUserCircle 
} from "react-icons/hi";
import { AuthContext } from "../contexts/AuthContext";
import useAdmin from '../hooks/useAdmin';

const Sidebar = () => {
  const { user } = use(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();

  // Active এবং Inactive স্টাইল হ্যান্ডেল করার ফাংশন
  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
      isActive
        ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none"
        : "text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-800"
    }`;

  if (isAdminLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <span className="loading loading-spinner loading-md text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-2 sticky top-24">
      <p className="text-[10px] uppercase font-black text-slate-400 px-4 tracking-[0.2em] mb-4">
        Main Menu
      </p>

      {/* COMMON LINK: সবাই দেখবে */}
      <NavLink to="/dashboard" end className={linkStyle}>
        <HiOutlineChartBar className="text-xl" /> Overview
      </NavLink>

      {/* ADMIN SPECIFIC: শুধু অ্যাডমিন হলে দেখাবে */}
      {isAdmin && (
        <>
          <NavLink to="/dashboard/manageUsers" className={linkStyle}>
            <HiOutlineUsers className="text-xl" /> Manage Users
          </NavLink>
        </>
      )}

      {/* USER SPECIFIC: অ্যাডমিন এবং ইউজার উভয়ই দেখবে */}
      <NavLink to="/dashboard/add" className={linkStyle}>
        <HiOutlinePlusCircle className="text-xl" /> New Entry
      </NavLink>

      <NavLink to="/dashboard/transactions" className={linkStyle}>
        <HiOutlineClipboardList className="text-xl" /> My History
      </NavLink>

      {/* ACCOUNT SECTION */}
      <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
        <NavLink to="/profile" className={linkStyle}>
          <HiOutlineUserCircle className="text-xl" /> Account Profile
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;