import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import {
  FaArrowUp,
  FaArrowDown,
  FaTags,
  FaMoneyBillWave,
  FaShoppingCart,
  FaUtensils,
  FaCar,
} from "react-icons/fa";

const MyTransactions = () => {
  const { user } = useContext(AuthContext);

  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("");
  const [filterType, setFilterType] = useState("all");

  // ----------- Category Icons ----------- //
  const categoryIcons = {
    salary: <FaMoneyBillWave className="text-green-600 dark:text-green-400" />,
    food: <FaUtensils className="text-pink-500 dark:text-pink-400" />,
    shopping: <FaShoppingCart className="text-purple-600 dark:text-purple-400" />,
    transport: <FaCar className="text-blue-600 dark:text-blue-400" />,
  };

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/transactions?email=${user?.email}`
      );
      setTransactions(res.data);
      setFiltered(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.email) fetchTransactions();
  }, [user]);

  // ---------------- FILTER ----------------
  const handleFilter = (type) => {
    setFilterType(type);

    if (type === "all") {
      setFiltered(transactions);
    } else {
      setFiltered(transactions.filter((t) => t.type === type));
    }
  };

  // ---------------- SORT ------------------
  const handleSort = (type) => {
    setSortType(type);

    let sorted = [...filtered];

    if (type === "high") {
      sorted.sort((a, b) => b.amount - a.amount);
    }
    if (type === "low") {
      sorted.sort((a, b) => a.amount - b.amount);
    }
    if (type === "new") {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    if (type === "old") {
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    setFiltered(sorted);
  };

  // ---------------- Delete ----------------
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You cannot recover this transaction later!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3000/transactions/${id}`);

        setTransactions((prev) => prev.filter((t) => t._id !== id));
        setFiltered((prev) => prev.filter((t) => t._id !== id));

        Swal.fire("Deleted!", "The transaction is removed.", "success");
      }
    });
  };

  // ---------------- Skeleton Loader ----------------
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-40 rounded-2xl bg-gradient-to-r from-pink-100 via-pink-50 to-pink-100 animate-pulse dark:from-gray-700 dark:via-gray-800 dark:to-gray-700"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE4EC] via-[#FDF2F8] to-[#E3F2FD] dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-6">
      <h2
        className="text-4xl font-extrabold text-center bg-gradient-to-r from-pink-600 via-rose-500 to-blue-600 bg-clip-text text-transparent mb-10"
      >
        My Transactions
      </h2>

      {/* Filter & Sort Controls */}
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between mb-6 gap-4">

        {/* Filter */}
        <div className="flex gap-3">
          <button
            onClick={() => handleFilter("all")}
            className={`px-4 py-2 rounded-full shadow ${
              filterType === "all"
                ? "bg-pink-600 text-white"
                : "bg-white/80 backdrop-blur text-gray-700 dark:bg-gray-800 dark:text-gray-200"
            }`}
          >
            All
          </button>

          <button
            onClick={() => handleFilter("income")}
            className={`px-4 py-2 rounded-full shadow ${
              filterType === "income"
                ? "bg-green-600 text-white"
                : "bg-white/80 backdrop-blur dark:bg-gray-800 dark:text-gray-200"
            }`}
          >
            Income
          </button>

          <button
            onClick={() => handleFilter("expense")}
            className={`px-4 py-2 rounded-full shadow ${
              filterType === "expense"
                ? "bg-red-600 text-white"
                : "bg-white/80 backdrop-blur dark:bg-gray-800 dark:text-gray-200"
            }`}
          >
            Expense
          </button>
        </div>

        {/* Sort */}
        <div className="flex gap-3">
          <select
            onChange={(e) => handleSort(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white shadow dark:bg-gray-800 dark:text-gray-200"
          >
            <option value="">Sort By</option>
            <option value="high">Amount: High → Low</option>
            <option value="low">Amount: Low → High</option>
            <option value="new">Newest First</option>
            <option value="old">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center mt-20">
          <img
            src="https://i.ibb.co/4gM8mcW/empty.png"
            alt="empty"
            className="h-56 opacity-80"
          />
          <p className="text-gray-500 dark:text-gray-300 text-xl mt-4">No transactions found</p>
        </div>
      )}

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((t) => (
          <div
            key={t._id}
            className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow border border-pink-100 dark:border-gray-700 hover:shadow-xl hover:scale-[1.02] transition"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold capitalize bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
                {t.type}
              </h3>

              <div className="text-2xl">
                {categoryIcons[t.category] || <FaTags className="text-gray-500 dark:text-gray-400" />}
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-2">
              <span className="font-medium text-pink-600 dark:text-pink-400">Category:</span>{" "}
              {t.category}
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium text-pink-600 dark:text-pink-400">Amount:</span> ${t.amount}
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium text-pink-600 dark:text-pink-400">Date:</span>{" "}
              {new Date(t.date).toLocaleDateString()}
            </p>

            <div className="flex justify-between mt-5">
              <Link
                to={`/transaction/${t._id}`}
                className="px-4 py-2 rounded-full bg-blue-500 dark:bg-blue-600 text-white hover:shadow-lg hover:scale-105 transition"
              >
                View
              </Link>

              <Link
                to={`/transaction/update/${t._id}`}
                className="px-4 py-2 rounded-full bg-green-500 dark:bg-green-600 text-white hover:shadow-lg hover:scale-105 transition"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(t._id)}
                className="px-4 py-2 rounded-full bg-red-500 dark:bg-red-600 text-white hover:shadow-lg hover:scale-105 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTransactions;
