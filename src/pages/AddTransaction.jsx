import React, { useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";

const AddTransaction = () => {
  const { user } = useContext(AuthContext);

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

    try {
      const res = await axios.post("http://localhost:3000/transactions", formData);

      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Transaction added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });

        setFormData({
          type: "",
          category: "",
          amount: "",
          description: "",
          date: "",
          email: user?.email,
          name: user?.displayName,
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error!",
        text: "Failed to add transaction.",
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 rounded-2xl shadow-lg border
                    bg-gradient-to-br from-pink-50 via-yellow-50 to-blue-50
                    text-gray-800">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">
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
            className="w-full mt-1 p-2 border rounded"
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
            className="w-full mt-1 p-2 border rounded"
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
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
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
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        {/* User Email */}
        <div>
          <label className="font-medium">User Email</label>
          <input
            type="email"
            value={formData.email}
            readOnly
            className="w-full mt-1 p-2 border rounded bg-gray-100"
          />
        </div>

        {/* User Name */}
        <div>
          <label className="font-medium">User Name</label>
          <input
            type="text"
            value={formData.name}
            readOnly
            className="w-full mt-1 p-2 border rounded bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
