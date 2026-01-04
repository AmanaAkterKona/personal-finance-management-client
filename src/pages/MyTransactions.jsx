import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { FaEdit, FaTrash, FaEye, FaPlus, FaSearch } from "react-icons/fa";

const MyTransactions = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  
  // Search & Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 8;

  // ডিফল্ট ক্যাটাগরি ইমেজ
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

  // Combined filter function
  useEffect(() => {
    let result = [...transactions];

    // Filter by type (income/expense/all)
    if (filterType !== "all") {
      result = result.filter((t) => t.type === filterType);
    }

    // Filter by category
    if (categoryFilter !== "all") {
      result = result.filter((t) => t.category === categoryFilter);
    }

    // Search filter
    if (searchTerm) {
      result = result.filter((t) =>
        t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sorting
    if (sortBy === "date-desc") {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "date-asc") {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "amount-desc") {
      result.sort((a, b) => b.amount - a.amount);
    } else if (sortBy === "amount-asc") {
      result.sort((a, b) => a.amount - b.amount);
    }

    setFiltered(result);
    setCurrentPage(1);
  }, [filterType, categoryFilter, searchTerm, sortBy, transactions]);

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
        Swal.fire("Deleted!", "Transaction removed.", "success");
      }
    });
  };

  // Pagination logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filtered.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(filtered.length / transactionsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get unique categories from transactions
  const categories = ["all", ...new Set(transactions.map(t => t.category))];

  if (loading) {
    return <div className="flex justify-center items-center min-h-[60vh] text-blue-500 font-semibold">Loading Transactions...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950 p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between mb-6 gap-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">My Transactions</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Keep track of your financial activity • {filtered.length} results</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white dark:bg-gray-900 p-1.5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          {["all", "income", "expense"].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
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

      {/* Search & Filter Section */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by category or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-5 py-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm font-semibold capitalize lg:w-52"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="capitalize">
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          {/* Sort Filter */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-5 py-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm font-semibold lg:w-52"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTransactions.map((t) => (
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

        {/* Add New Card - Show only on first page */}
        {currentPage === 1 && (
          <Link 
            to="/dashboard/add"
            className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[24px] flex flex-col items-center justify-center p-8 text-gray-400 hover:border-blue-400 hover:text-blue-400 transition-all group h-full min-h-[300px]"
          >
            <div className="p-4 rounded-full bg-gray-50 dark:bg-gray-900 group-hover:bg-blue-50 transition-all mb-4">
              <FaPlus size={24} />
            </div>
            <span className="font-semibold text-sm">Add New Transaction</span>
          </Link>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="max-w-6xl mx-auto flex justify-center items-center gap-2 mt-10">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-semibold ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                currentPage === index + 1
                  ? 'bg-gray-900 text-white dark:bg-blue-600'
                  : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-semibold ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Empty State */}
      {filtered.length === 0 && !loading && (
        <div className="text-center py-20">
          <p className="text-gray-400">No transactions found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
};

export default MyTransactions;