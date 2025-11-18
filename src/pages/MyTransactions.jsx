import React, { use, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { Link } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const MyTransactions = () => {
  const { user } = use(AuthContext);  // FIXED
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/transactions?email=${user?.email}`
      );
      setTransactions(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchTransactions();
    }
  }, [user]);

  // Delete a transaction
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you cannot recover this transaction!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Delete from backend
          await axios.delete(`http://localhost:3000/transactions/${id}`);

          // Remove from UI instantly
          setTransactions((prev) => prev.filter((t) => t._id !== id));

          Swal.fire("Deleted!", "Transaction has been deleted.", "success");
        } catch (error) {
          console.log(error);
          Swal.fire("Error!", "Failed to delete.", "error");
        }
      }
    });
  };

  if (loading) {
    return <h2 className="text-center text-xl mt-10">Loading...</h2>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        My Transactions
      </h2>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No transactions found!
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transactions.map((t) => (
            <div
              key={t._id}
              className="p-5 border rounded-xl shadow-md bg-white hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold capitalize text-blue-600">
                {t.type}
              </h3>

              <p className="text-gray-700 mt-1">
                <span className="font-medium">Category:</span> {t.category}
              </p>

              <p className="text-gray-700">
                <span className="font-medium">Amount:</span> $ {t.amount}
              </p>

              <p className="text-gray-700">
                <span className="font-medium">Date:</span>{" "}
                {new Date(t.date).toLocaleDateString()}
              </p>

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                {/* View */}
                <Link
                  to={`/transaction/${t._id}`}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  View
                </Link>

                {/* Edit */}
                <Link
                  to={`/transaction/update/${t._id}`}
                  className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Edit
                </Link>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(t._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTransactions;
