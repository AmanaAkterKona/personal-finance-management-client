import React, { useEffect, useState, use } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";


const TransactionDetails = () => {
  const { user } = use(AuthContext);   // <-- FIX
  const { id } = useParams();

  const [transaction, setTransaction] = useState(null);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load Details
  const loadData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/transactions/${id}`);
      setTransaction(res.data);

      // Load total amount from same category
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

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 shadow-xl bg-white rounded-xl">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Transaction Details
      </h2>

      <div className="space-y-3 text-lg">
        <p><strong>Type:</strong> {transaction.type}</p>
        <p><strong>Description:</strong> {transaction.description}</p>
        <p><strong>Category:</strong> {transaction.category}</p>
        <p><strong>Amount:</strong> ৳{transaction.amount}</p>

        <p>
          <strong>Date:</strong>{" "}
          {new Date(transaction.date).toLocaleDateString("en-GB")}
        </p>

        <p className="bg-gray-100 p-3 rounded-xl mt-4 text-blue-700 font-semibold">
          Total Spent on <u>{transaction.category}</u>: 
          <span className="font-bold"> ৳{categoryTotal}</span>
        </p>
      </div>
    </div>
  );
};

export default TransactionDetails;
