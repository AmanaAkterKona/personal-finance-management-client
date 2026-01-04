import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { Link } from "react-router-dom"; // 'react-router' এর বদলে 'react-router-dom' ব্যবহার করুন
import { AuthContext } from "../contexts/AuthContext";
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";

const MyTransactions = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");

  // ডিফল্ট ক্যাটাগরি ইমেজ (ইমেজ আপলোড না করলে এগুলো দেখাবে)
  const categoryImages = {
    salary: "https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=400",
    food: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400",
    shopping: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400",
    travel: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=400",
    home: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=400",
    others: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=400"
  };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`https://personal-project-k.vercel.app/transactions?email=${user?.email}`);
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

  const handleFilter = (type) => {
    setFilterType(type);
    if (type === "all") setFiltered(transactions);
    else setFiltered(transactions.filter((t) => t.type === type));
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Confirm Delete?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`https://personal-project-k.vercel.app/transactions/${id}`);
        setTransactions((prev) => prev.filter((t) => t._id !== id));
        setFiltered((prev) => prev.filter((t) => t._id !== id));
        Swal.fire("Deleted!", "Transaction removed.", "success");
      }
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-[60vh] text-blue-500 font-semibold">Loading Transactions...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950 p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">My Transactions</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Keep track of your financial activity</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white dark:bg-gray-900 p-1.5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          {["all", "income", "expense"].map((t) => (
            <button
              key={t}
              onClick={() => handleFilter(t)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${
                filterType === t 
                ? "bg-gray-900 text-white dark:bg-blue-600 shadow-md" 
                : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((t) => (
          <div
            key={t._id}
            className="group bg-white dark:bg-gray-900 rounded-[24px] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            {/* Image Box */}
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={t.image || categoryImages[t.category] || categoryImages.others}
                alt={t.category}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-sm ${t.type === 'income' ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                {t.type}
              </div>
            </div>

            {/* Content Box */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 capitalize">{t.category}</h3>
                  <p className="text-xs text-gray-400">{new Date(t.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <div className={`text-xl font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {t.type === 'income' ? '+' : '-'}${Number(t.amount).toLocaleString()}
                </div>
              </div>

              {t.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-6 h-10">
                  {t.description}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
                <div className="flex gap-2">
                   <Link to={`/dashboard/details/${t._id}`} className="p-2.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <FaEye size={16} />
                  </Link>
                  <Link to={`/dashboard/update/${t._id}`} className="p-2.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-green-50 hover:text-green-600 transition-colors">
                    <FaEdit size={16} />
                  </Link>
                </div>
                <button 
                  onClick={() => handleDelete(t._id)}
                  className="px-4 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Card (Minimalistic) */}
        <Link 
          to="/dashboard/add"
          className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[24px] flex flex-col items-center justify-center p-8 text-gray-400 hover:border-blue-400 hover:text-blue-400 transition-all group h-full min-h-[300px]"
        >
          <div className="p-4 rounded-full bg-gray-50 dark:bg-gray-900 group-hover:bg-blue-50 transition-all mb-4">
            <FaPlus size={24} />
          </div>
          <span className="font-semibold text-sm">Add New Transaction</span>
        </Link>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && !loading && (
        <div className="text-center py-20">
          <p className="text-gray-400">No transactions found for this category.</p>
        </div>
      )}
    </div>
  );
};

export default MyTransactions;