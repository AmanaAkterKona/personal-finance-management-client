import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import useTheme from "../pages/useTheme";
import { FaUserEdit, FaEnvelope, FaCamera, FaIdBadge, FaShieldAlt } from "react-icons/fa";

const Profile = () => {
  const { theme } = useTheme();
  const { user, updateUser, setUser } = useContext(AuthContext); // useContext ব্যবহার করা হয়েছে

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [isEditing, setIsEditing] = useState(false);

  // User ডাটা আপডেট হলে স্টেট আপডেট রাখা
  useEffect(() => {
    setName(user?.displayName || "");
    setPhoto(user?.photoURL || "");
  }, [user]);

  const handleUpdate = async () => {
    if (!name.trim()) return Swal.fire("Error", "Name cannot be empty!", "error");

    try {
      await updateUser({ displayName: name, photoURL: photo });
      setUser({ ...user, displayName: name, photoURL: photo });
      setIsEditing(false);

      Swal.fire({
        title: "Success!",
        text: "Profile updated successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: theme === 'dark' ? '#1f2937' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000'
      });
    } catch (err) {
      Swal.fire("Error", "Failed to update profile.", "error");
    }
  };

  return (
    <div className={`min-h-screen py-10 px-4 transition-all duration-300 ${
      theme === "dark" ? "bg-gray-950" : "bg-gray-50"
    }`}>
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className={`text-4xl font-black ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Profile Settings
          </h1>
          <p className="text-gray-500 mt-2">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Side: Profile Card */}
          <div className={`lg:col-span-1 p-8 rounded-[32px] border h-fit text-center ${
            theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100 shadow-sm"
          }`}>
            <div className="relative inline-block mb-6">
              <img
                src={photo || "https://i.ibb.co/FzJdv7b/user.png"}
                alt="profile"
                className="w-32 h-32 rounded-full border-4 border-purple-500 p-1 object-cover mx-auto"
              />
              <div className="absolute bottom-1 right-1 bg-purple-600 p-2 rounded-full text-white border-4 border-white dark:border-gray-900">
                <FaCamera size={14} />
              </div>
            </div>
            <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              {user?.displayName || "User Name"}
            </h2>
            <p className="text-gray-500 text-sm mb-6">{user?.email}</p>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
              theme === 'dark' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-emerald-100 text-emerald-700'
            }`}>
              <FaShieldAlt /> Verified Account
            </div>
          </div>

          {/* Right Side: Information Form */}
          <div className={`lg:col-span-2 p-8 md:p-10 rounded-[32px] border ${
            theme === "dark" ? "bg-gray-900 border-gray-800 shadow-2xl" : "bg-white border-gray-100 shadow-sm"
          }`}>
            <div className="flex justify-between items-center mb-8">
              <h3 className={`text-xl font-bold ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>
                Personal Information
              </h3>
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 text-purple-600 font-bold hover:underline"
                >
                  <FaUserEdit /> Edit Profile
                </button>
              )}
            </div>

            <div className="space-y-6">
              {/* Name Field */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 uppercase flex items-center gap-2">
                    <FaIdBadge /> Full Name
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    className={`w-full p-4 rounded-2xl border transition-all ${
                      theme === "dark" 
                        ? "bg-gray-800 border-gray-700 text-white focus:border-purple-500" 
                        : "bg-gray-50 border-gray-200 text-gray-800 focus:border-purple-400"
                    } disabled:opacity-50`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 uppercase flex items-center gap-2">
                    <FaEnvelope /> Email Address
                  </label>
                  <input
                    type="email"
                    readOnly
                    className={`w-full p-4 rounded-2xl border cursor-not-allowed ${
                      theme === "dark" ? "bg-gray-800/30 border-gray-700 text-gray-500" : "bg-gray-100 border-gray-200 text-gray-500"
                    }`}
                    value={user?.email}
                  />
                </div>
              </div>

              {/* Photo URL Field */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 uppercase">Profile Picture URL</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  className={`w-full p-4 rounded-2xl border transition-all ${
                    theme === "dark" 
                      ? "bg-gray-800 border-gray-700 text-white focus:border-purple-500" 
                      : "bg-gray-50 border-gray-200 text-gray-800 focus:border-purple-400"
                  } disabled:opacity-50`}
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex gap-4 pt-6">
                  <button
                    onClick={handleUpdate}
                    className="flex-1 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold shadow-lg shadow-purple-200 dark:shadow-none transition-all"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className={`flex-1 py-4 rounded-2xl font-bold transition-all ${
                      theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;