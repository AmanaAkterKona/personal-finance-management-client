import React, { use, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import useTheme from "../pages/useTheme";

const Profile = () => {
  const { theme } = useTheme(); // ⬅ dark/light mode
  const { user, updateUser, setUser } = use(AuthContext);

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const handleUpdate = () => {
    updateUser({
      displayName: name,
      photoURL: photo,
    })
      .then(() => {
        setUser({ ...user, displayName: name, photoURL: photo });

        Swal.fire({
          title: "Updated!",
          text: "Profile updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error",
          text: "Failed to update profile.",
          icon: "error",
        });
      });
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-500
        ${theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800"}`}
    >
      <div
        className={`p-8 rounded-3xl shadow-xl max-w-md w-full border transition-colors duration-500
          ${theme === "dark" ? "bg-gray-800/80 border-gray-700" : "bg-white/80 border-white/50 backdrop-blur-xl"}`}
      >
        <h1 className={`text-3xl font-bold text-center mb-6 ${theme === "dark" ? "text-purple-400" : "text-purple-700"}`}>
          My Profile
        </h1>

        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            src={user?.photoURL || "https://i.ibb.co/FzJdv7b/user.png"}
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-purple-300 shadow-lg object-cover"
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className={`font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Name</label>
          <input
            type="text"
            className={`w-full mt-1 p-3 rounded-xl shadow-sm border transition-colors duration-500
              ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-800 border-gray-300"}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Photo URL */}
        <div className="mb-4">
          <label className={`font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Photo URL</label>
          <input
            type="text"
            className={`w-full mt-1 p-3 rounded-xl shadow-sm border transition-colors duration-500
              ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-gray-800 border-gray-300"}`}
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
        </div>

        {/* Email (Read Only) */}
        <div className="mb-4">
          <label className={`font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className={`w-full mt-1 p-3 rounded-xl border transition-colors duration-500
              ${theme === "dark" ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-gray-100 text-gray-800 border-gray-300"}`}
          />
        </div>

        {/* Update Button */}
        <button
          onClick={handleUpdate}
          className={`w-full py-3 rounded-xl font-semibold shadow-md mt-4 transition-colors duration-500
            ${theme === "dark" ? "bg-purple-600 hover:bg-purple-500 text-white" : "bg-purple-600 hover:bg-purple-700 text-white"}`}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
