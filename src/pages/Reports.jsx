import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Reports = () => {
  const [transactions, setTransactions] = useState([]);
  const [monthFilter, setMonthFilter] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter by month
  const filteredData = monthFilter
    ? transactions.filter(
        (t) => new Date(t.date).getMonth() + 1 === Number(monthFilter)
      )
    : transactions;

  // Category totals for pie chart
  const categoryTotals = {};
  filteredData.forEach((t) => {
    if (!categoryTotals[t.category]) categoryTotals[t.category] = 0;
    categoryTotals[t.category] += Number(t.amount);
  });

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#fbbf24", // yellow
          "#60a5fa", // blue
          "#34d399", // green
          "#f472b6", // pink
          "#a78bfa", // purple
          "#fb7185", // rose
        ],
        borderColor: "#ffffff",
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#374151",
          font: { size: 14 },
        },
      },
      tooltip: {
        titleColor: "#000000",
        bodyColor: "#000000",
        backgroundColor: "#f9fafb",
      },
    },
  };

  // Monthly totals for bar chart
  const monthlyTotals = {};
  transactions.forEach((t) => {
    const month = new Date(t.date).getMonth() + 1;
    if (!monthlyTotals[month]) monthlyTotals[month] = 0;
    monthlyTotals[month] += Number(t.amount);
  });

  const barData = {
    labels: Object.keys(monthlyTotals).map((m) => `Month ${m}`),
    datasets: [
      {
        label: "Total Amount",
        data: Object.values(monthlyTotals),
        backgroundColor: "#60a5fa",
      },
    ],
  };

  const barOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#374151",
          font: { size: 14 },
        },
      },
      tooltip: {
        titleColor: "#000000",
        bodyColor: "#000000",
        backgroundColor: "#f9fafb",
      },
    },
    scales: {
      x: {
        ticks: { color: "#374151" },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      y: {
        ticks: { color: "#374151" },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
    },
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-50 via-yellow-50 to-blue-50 p-8 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Financial Reports
        </h1>

        {/* FILTER SECTION */}
        <div className="flex justify-center mb-8">
          <select
            onChange={(e) => setMonthFilter(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white border border-gray-300 text-gray-800 shadow-sm focus:outline-none"
          >
            <option value="">Filter by Month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        {/* CHARTS */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* PIE CHART CARD */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 transition hover:scale-[1.02] hover:shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Category Breakdown
            </h2>
            <Pie data={pieData} options={pieOptions} />
          </div>

          {/* BAR CHART CARD */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 transition hover:scale-[1.02] hover:shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Monthly Totals
            </h2>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
