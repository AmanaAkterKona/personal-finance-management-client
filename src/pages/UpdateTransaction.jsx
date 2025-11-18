import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";

const UpdateTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  // Handle input changes
  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  // Handle update submit
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
    return <h2 className="text-center mt-10 text-xl text-gray-700">Loading...</h2>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-100 p-6">
      <div className="w-full max-w-xl bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-500 mb-6">
          Update Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Type */}
          <div>
            <label className="font-semibold text-gray-700">Type</label>
            <select
              name="type"
              value={transaction.type}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-pink-300 focus:outline-none"
              required
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={transaction.description}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-pink-300 focus:outline-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="font-semibold text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={transaction.category}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-pink-300 focus:outline-none"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="font-semibold text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={transaction.amount}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-pink-300 focus:outline-none"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="font-semibold text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={transaction.date}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-pink-300 focus:outline-none"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-400 via-pink-300 to-yellow-300 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Update Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTransaction;
