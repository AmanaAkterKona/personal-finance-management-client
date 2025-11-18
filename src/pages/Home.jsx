import React, { useEffect, useState } from "react";
import axios from "axios";
import Banner from "./Banner";

const Home = () => {
  const [financialData, setFinancialData] = useState({
    totalBalance: 0,
    income: 0,
    expenses: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = "user@example.com"; // লগইনকৃত ব্যবহারকারীর email
        const { data } = await axios.get(
          `http://localhost:3000/overview?email=${email}`
        );
        setFinancialData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

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
    <div className="bg-white rounded-2xl shadow-xl p-8 w-72 transform hover:scale-105 transition-transform duration-300">
      <h3 className="text-lg font-medium mb-2">Total Balance</h3>
      <p className="text-3xl font-bold">${financialData.totalBalance}</p>
    </div>
    <div className="bg-white rounded-2xl shadow-xl p-8 w-72 transform hover:scale-105 transition-transform duration-300">
      <h3 className="text-lg font-medium mb-2">Income</h3>
      <p className="text-3xl font-bold text-green-600">
        ${financialData.income}
      </p>
    </div>
    <div className="bg-white rounded-2xl shadow-xl p-8 w-72 transform hover:scale-105 transition-transform duration-300">
      <h3 className="text-lg font-medium mb-2">Expenses</h3>
      <p className="text-3xl font-bold text-red-600">
        ${financialData.expenses}
      </p>
    </div>
  </div>
</section>


      {/* Budgeting Tips Section */}
      <section className="py-20 px-6 md:px-32 text-center bg-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          Budgeting Tips
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Create a realistic budget, track your expenses, save for emergencies, and avoid unnecessary debt. Small steps today lead to financial stability tomorrow.
        </p>
      </section>

      {/* Why Financial Planning Matters Section */}
      <section className="py-20 px-6 md:px-32 text-center bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          Why Financial Planning Matters
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Planning your finances ensures that you are prepared for the future, can achieve your goals, and live stress-free without money worries. A plan today secures your tomorrow.
        </p>
      </section>
    </div>
  );
};

export default Home;
