import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import useTheme from "../pages/useTheme"; // Dark/light mode hook

const UpdateTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme(); // Dark/Light Mode

  const [transaction, setTransaction] = useState({
    type: "income",
    description: "",
    category: "",
    amount: "",
    date: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch transaction data
  const fetchTransaction = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/transactions/${id}`);
      setTransaction({
        type: res.data.type,
        description: res.data.description,
        category: res.data.category,
        amount: res.data.amount,
        date: new Date(res.data.date).toISOString().split("T")[0],
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to fetch transaction", "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, [id]);

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/transactions/${id}`, {
        ...transaction,
        amount: Number(transaction.amount),
        date: transaction.date,
      });

      Swal.fire({
        icon: "success",
        title: "Transaction Updated!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(`/transaction/${id}`);
    } catch (error) {
      console.log(error.response?.data || error.message);
      Swal.fire("Error", "Failed to update transaction", "error");
    }
  };

  if (loading)
    return (
      <h2
        className={`text-center mt-10 text-xl ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}
      >
        Loading...
      </h2>
    );

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-500 ${
        theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-100 text-gray-800"
      }`}
    >
      <div
        className={`w-full max-w-xl p-8 rounded-2xl shadow-2xl transition-colors duration-500 ${
          theme === "dark" ? "bg-gray-800/70 border-gray-700" : "bg-white/90 backdrop-blur-md border-white/50"
        }`}
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-500">
          Update Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Type */}
          <div>
            <label className="font-semibold">Type</label>
            <select
              name="type"
              value={transaction.type}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-purple-500"
                  : "bg-white border-gray-300 text-gray-800 focus:ring-pink-300"
              }`}
              required
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold">Description</label>
            <input
              type="text"
              name="description"
              value={transaction.description}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-purple-500"
                  : "bg-white border-gray-300 text-gray-800 focus:ring-pink-300"
              }`}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="font-semibold">Category</label>
            <input
              type="text"
              name="category"
              value={transaction.category}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-purple-500"
                  : "bg-white border-gray-300 text-gray-800 focus:ring-pink-300"
              }`}
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="font-semibold">Amount</label>
            <input
              type="number"
              name="amount"
              value={transaction.amount}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-purple-500"
                  : "bg-white border-gray-300 text-gray-800 focus:ring-pink-300"
              }`}
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="font-semibold">Date</label>
            <input
              type="date"
              name="date"
              value={transaction.date}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-purple-500"
                  : "bg-white border-gray-300 text-gray-800 focus:ring-pink-300"
              }`}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 font-bold rounded-xl shadow-lg bg-gradient-to-r from-purple-400 via-pink-300 to-yellow-300 text-white hover:scale-105 transition-transform duration-300"
          >
            Update Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTransaction;
