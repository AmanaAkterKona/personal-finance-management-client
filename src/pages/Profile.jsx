import React, { use, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";

const Profile = () => {
  const { user, updateUser, setUser } = use(AuthContext);

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const handleUpdate = () => {
    updateUser({
      displayName: name,
      photoURL: photo,
    })
      .then(() => {
        // UI Update
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
    <div className="min-h-screen flex items-center justify-center 
        bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">

      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl 
        max-w-md w-full border border-white/50">

        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
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
          <label className="font-semibold text-gray-700">Name</label>
          <input
            type="text"
            className="w-full mt-1 p-3 border rounded-xl bg-white shadow-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Photo URL */}
        <div className="mb-4">
          <label className="font-semibold text-gray-700">Photo URL</label>
          <input
            type="text"
            className="w-full mt-1 p-3 border rounded-xl bg-white shadow-sm"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
        </div>

        {/* Email (Read Only) */}
        <div className="mb-4">
          <label className="font-semibold text-gray-700">Email</label>
          <input
            type="email"
            className="w-full mt-1 p-3 border rounded-xl bg-gray-100"
            value={user?.email}
            readOnly
          />
        </div>

        {/* Update Button */}
        <button
          onClick={handleUpdate}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white 
          py-3 rounded-xl font-semibold shadow-md mt-4"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
