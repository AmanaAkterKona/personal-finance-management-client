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
        date: new Date(res.data.date).toISOString().split("T")[0], // input date fix
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
    await axios.patch(
      `http://localhost:3000/transactions/${id}`,
      {
        ...transaction,
        amount: Number(transaction.amount),
        date: transaction.date, // backend will convert to Date
      }
    );

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


  if (loading) return <h2 className="text-center mt-10 text-xl">Loading...</h2>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
        Update Transaction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type */}
        <div>
          <label className="font-medium">Type</label>
          <select
            name="type"
            value={transaction.type}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">Description</label>
          <input
            type="text"
            name="description"
            value={transaction.description}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={transaction.category}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label className="font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            value={transaction.amount}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={transaction.date}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Update Transaction
        </button>
      </form>
    </div>
  );
};

export default UpdateTransaction;
