import React, { useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // ⬅ Import useNavigate
import { AuthContext } from "../contexts/AuthContext";
import useTheme from "../pages/useTheme";

const image_hosting_key = import.meta.env.VITE_IMGBB_KEY; 
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddTransaction = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ⬅ Initialize navigate

  const [formData, setFormData] = useState({
    type: "",
    category: "",
    amount: "",
    description: "",
    date: "",
    email: user?.email,
    name: user?.displayName,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const imageFile = form.image.files[0];

    try {
      let imageUrl = "";

      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("image", imageFile);

        const res = await axios.post(image_hosting_api, imageFormData, {
          headers: { "content-type": "multipart/form-data" },
        });

        if (res.data.success) {
          imageUrl = res.data.data.display_url;
        }
      }

      const finalData = { 
        ...formData, 
        amount: Number(formData.amount), 
        image: imageUrl 
      };

      const response = await axios.post(
        "https://personal-project-k.vercel.app/transactions",
        finalData
      );

      if (response.data.insertedId) {
        await Swal.fire({
          title: "Success!",
          text: "Transaction added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });

        // ফর্ম রিসেট
        form.reset();
        setFormData({
          type: "",
          category: "",
          amount: "",
          description: "",
          date: "",
          email: user?.email,
          name: user?.displayName,
        });

        // ⬅ Success এর পরে MyTransactions page এ redirect
        navigate("/dashboard/transactions");
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error!",
        text: "Failed to add transaction.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`max-w-xl mx-auto mt-10 p-8 rounded-2xl shadow-lg border
        transition-colors duration-500
        ${
          theme === "dark"
            ? "bg-gray-900 text-gray-200 border-gray-700"
            : "bg-gradient-to-br from-pink-50 via-yellow-50 to-blue-50 text-gray-800 border-pink-100"
        }
      `}
    >
      <h2
        className={`text-3xl font-semibold mb-6 text-center ${
          theme === "dark" ? "text-blue-400" : "text-blue-700"
        }`}
      >
        Add New Transaction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type */}
        <div>
          <label className="font-medium">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className={`w-full mt-1 p-2 rounded border transition-colors duration-300
              ${
                theme === "dark"
                  ? "bg-gray-800 text-gray-200 border-gray-600"
                  : "bg-white text-gray-800 border-gray-300"
              }
            `}
          >
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className={`w-full mt-1 p-2 rounded border transition-colors duration-300
              ${
                theme === "dark"
                  ? "bg-gray-800 text-gray-200 border-gray-600"
                  : "bg-white text-gray-800 border-gray-300"
              }
            `}
          >
            <option value="">Select Category</option>
            <option value="home">Home</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="shopping">Shopping</option>
            <option value="salary">Salary</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className={`w-full mt-1 p-2 rounded border transition-colors duration-300
              ${
                theme === "dark"
                  ? "bg-gray-800 text-gray-200 border-gray-600"
                  : "bg-white text-gray-800 border-gray-300"
              }
            `}
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full mt-1 p-2 rounded border transition-colors duration-300
              ${
                theme === "dark"
                  ? "bg-gray-800 text-gray-200 border-gray-600"
                  : "bg-white text-gray-800 border-gray-300"
              }
            `}
          ></textarea>
        </div>

        {/* Date */}
        <div>
          <label className="font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className={`w-full mt-1 p-2 rounded border transition-colors duration-300
              ${
                theme === "dark"
                  ? "bg-gray-800 text-gray-200 border-gray-600"
                  : "bg-white text-gray-800 border-gray-300"
              }
            `}
          />
        </div>

        {/* Image Input */}
        <div>
          <label className="font-medium">Transaction Receipt / Image (Optional)</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className={`w-full mt-1 p-2 rounded border transition-colors duration-300
              file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 
              file:text-sm file:font-semibold
              ${
                theme === "dark"
                  ? "bg-gray-800 text-gray-200 border-gray-600 file:bg-gray-700 file:text-blue-400"
                  : "bg-white text-gray-800 border-gray-300 file:bg-blue-50 file:text-blue-700"
              }
            `}
          />
        </div>

        {/* User Email */}
        <div>
          <label className="font-medium">User Email</label>
          <input
            type="email"
            value={formData.email}
            readOnly
            className={`w-full mt-1 p-2 rounded border transition-colors duration-300
              ${
                theme === "dark"
                  ? "bg-gray-700 text-gray-300 border-gray-600"
                  : "bg-gray-100 text-gray-800 border-gray-300"
              }
            `}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full font-semibold py-2 rounded-lg transition-colors duration-300
            ${
              loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }
          `}
        >
          {loading ? "Processing..." : "Add Transaction"}
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
