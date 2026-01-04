import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import {
  FaMoneyBillWave, FaShoppingCart, FaUtensils, FaCar, FaTags,
  FaCalendarAlt, FaFileAlt, FaArrowLeft, FaEdit
} from "react-icons/fa";
import useTheme from "../pages/useTheme";

const TransactionDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [transaction, setTransaction] = useState(null);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const categoryIcons = {
    salary: <FaMoneyBillWave />,
    food: <FaUtensils />,
    shopping: <FaShoppingCart />,
    transport: <FaCar />,
  };

  const loadData = async () => {
    try {
      const res = await axios.get(`https://personal-project-k.vercel.app/transactions/${id}`);
      setTransaction(res.data);
      const totalRes = await axios.get(
        `https://personal-project-k.vercel.app/transactions/category-total/${res.data.category}?email=${user.email}`
      );
      setCategoryTotal(totalRes.data.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.email) loadData();
  }, [id, user]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="h-12 w-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className={`min-h-screen p-4 md:p-10 transition-colors duration-500 ${
      theme === "dark" ? "bg-gray-950 text-white" : "bg-[#F8FAFC] text-gray-800"
    }`}>
      
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-6 hover:text-pink-500 transition">
          <FaArrowLeft /> Back to Transactions
        </button>

        <div className={`rounded-[32px] overflow-hidden shadow-2xl border ${
          theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"
        }`}>
          
          <div className="grid md:grid-cols-2">
            
            {/* Left Side: Image/Visual */}
            <div className="bg-gray-100 dark:bg-gray-800 h-64 md:h-auto relative">
              <img 
                src={transaction.image || "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800"} 
                alt="Receipt" 
                className="w-full h-full object-cover"
              />
              <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white ${
                transaction.type === 'income' ? 'bg-emerald-500' : 'bg-rose-500'
              }`}>
                {transaction.type}
              </div>
            </div>

            {/* Right Side: Details */}
            <div className="p-8 md:p-12">
              <div className="flex items-center justify-between mb-8">
                <div className={`p-4 rounded-2xl text-2xl ${
                  theme === 'dark' ? 'bg-gray-800 text-pink-400' : 'bg-pink-50 text-pink-500'
                }`}>
                  {categoryIcons[transaction.category] || <FaTags />}
                </div>
                <button 
                  onClick={() => navigate(`/dashboard/update/${transaction._id}`)}
                  className="p-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                >
                  <FaEdit size={20} />
                </button>
              </div>

              <h2 className="text-3xl font-black mb-2 capitalize">{transaction.category}</h2>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-6">
                <FaCalendarAlt />
                <span>{new Date(transaction.date).toLocaleDateString("en-GB", { dateStyle: 'full' })}</span>
              </div>

              <div className="text-5xl font-black mb-8">
                <span className={transaction.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}>
                  {transaction.type === 'income' ? '+' : '-'} ৳{transaction.amount}
                </span>
              </div>

              {/* Description Section */}
              <div className="mb-8">
                <h4 className="text-sm font-bold uppercase text-gray-400 mb-2 flex items-center gap-2">
                  <FaFileAlt /> Note / Description
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic">
                  {transaction.description || "No description provided for this transaction."}
                </p>
              </div>

              {/* Stats Card */}
              <div className={`p-6 rounded-2xl border-2 border-dashed ${
                theme === 'dark' ? 'border-gray-700 bg-gray-800/50' : 'border-pink-100 bg-pink-50/30'
              }`}>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total {transaction.type} in this category</p>
                <p className="text-2xl font-black text-blue-600">৳{categoryTotal.toLocaleString()}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;