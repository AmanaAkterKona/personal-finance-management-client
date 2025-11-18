import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaUtensils,
  FaCar,
  FaTags,
} from "react-icons/fa";

const TransactionDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [transaction, setTransaction] = useState(null);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const categoryIcons = {
    salary: <FaMoneyBillWave className="text-green-600 text-3xl" />,
    food: <FaUtensils className="text-pink-500 text-3xl" />,
    shopping: <FaShoppingCart className="text-purple-600 text-3xl" />,
    transport: <FaCar className="text-blue-600 text-3xl" />,
  };

  // Load Data
  const loadData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/transactions/${id}`);
      setTransaction(res.data);

      const totalRes = await axios.get(
        `http://localhost:3000/transactions/category-total/${res.data.category}?email=${user.email}`
      );

      setCategoryTotal(totalRes.data.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <div className="h-16 w-16 rounded-full border-4 border-pink-300 border-t-pink-600 animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE4EC] via-[#FDF2F8] to-[#E3F2FD] p-6 flex items-center justify-center">

      <div className="w-full max-w-xl bg-white/40 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/60 relative overflow-hidden">

        {/* Floating Gradient Lights */}
        <div className="absolute -top-10 -left-10 h-32 w-32 bg-pink-400/40 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-blue-400/40 blur-3xl rounded-full"></div>

        {/* Header */}
        <h2 className="text-4xl font-bold text-center mb-6
          bg-gradient-to-r from-pink-600 via-rose-500 to-blue-600 bg-clip-text text-transparent">
          Transaction Details
        </h2>

        {/* Category Icon */}
        <div className="flex justify-end mb-4">
          {categoryIcons[transaction.category] || (
            <FaTags className="text-gray-600 text-3xl" />
          )}
        </div>

        {/* Info Box */}
        <div className="space-y-4 text-lg">

          <p className="flex justify-between">
            <span className="font-semibold text-gray-700">Type:</span>
            <span className="capitalize text-blue-600 font-semibold">
              {transaction.type}
            </span>
          </p>

          <p className="flex justify-between">
            <span className="font-semibold text-gray-700">Category:</span>
            <span className="capitalize text-pink-600 font-bold">
              {transaction.category}
            </span>
          </p>

          <p className="flex justify-between">
            <span className="font-semibold text-gray-700">Amount:</span>
            <span className="text-green-600 font-bold">৳{transaction.amount}</span>
          </p>

          <p className="flex justify-between">
            <span className="font-semibold text-gray-700">Date:</span>
            <span className="text-gray-900">
              {new Date(transaction.date).toLocaleDateString("en-GB")}
            </span>
          </p>

          {/* Category Summary */}
          <div className="mt-6 p-4 rounded-xl border border-pink-200 bg-white/60 backdrop-blur">
            <p className="text-center text-pink-600 font-bold text-lg">
              Total spent on <span className="underline">{transaction.category}</span> :
              <span className="text-blue-700 font-extrabold"> ৳{categoryTotal}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
