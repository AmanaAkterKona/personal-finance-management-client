import React, { useEffect, useState, use } from "react";
import axios from "axios";
import Banner from "./Banner";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
  const { user } = use(AuthContext); // logged-in user
  const [financialData, setFinancialData] = useState({
    totalBalance: 0,
    income: 0,
    expenses: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user?.email) return;

        const { data } = await axios.get(
          `http://localhost:3000/overview?email=${user.email}`
        );

        setFinancialData(data);
      } catch (err) {
        console.error("Overview load error:", err);
      }
    };

    fetchData();
  }, [user?.email]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">

      {/* Banner */}
      <Banner />

      {/* Overview Section */}
      <section className="py-20 bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 text-gray-800 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-10">
          Your Financial Overview
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-10">

          {/* Total Balance */}
          <div className="bg-white rounded-2xl shadow-xl p-8 w-72 hover:scale-105 transition">
            <h3 className="text-lg font-medium mb-2">Total Balance</h3>
            <p className="text-3xl font-bold">${financialData.totalBalance}</p>
          </div>

          {/* Income */}
          <div className="bg-white rounded-2xl shadow-xl p-8 w-72 hover:scale-105 transition">
            <h3 className="text-lg font-medium mb-2">Income</h3>
            <p className="text-3xl font-bold text-green-600">
              ${financialData.income}
            </p>
          </div>

          {/* Expenses */}
          <div className="bg-white rounded-2xl shadow-xl p-8 w-72 hover:scale-105 transition">
            <h3 className="text-lg font-medium mb-2">Expenses</h3>
            <p className="text-3xl font-bold text-red-600">
              ${financialData.expenses}
            </p>
          </div>

        </div>
      </section>

      {/* Budgeting Tips */}
      <section className="py-20 px-6 md:px-32 text-center bg-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          Budgeting Tips
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Create a realistic budget, track your expenses, save for emergencies,
          and avoid unnecessary debt. Small steps today lead to financial
          stability tomorrow.
        </p>
      </section>

      {/* Why Financial Planning */}
      <section className="py-20 px-6 md:px-32 text-center bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          Why Financial Planning Matters
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Planning your finances ensures that you are prepared for the future,
          can achieve your goals, and live stress-free without money worries.
        </p>
      </section>
    </div>
  );
};

export default Home;
