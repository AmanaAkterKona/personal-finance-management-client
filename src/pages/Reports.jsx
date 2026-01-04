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
import useTheme from "../pages/useTheme";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Reports = () => {
  const { theme } = useTheme(); 
  const [transactions, setTransactions] = useState([]);
  const [monthFilter, setMonthFilter] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://personal-project-k.vercel.app/transactions"
      );
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = monthFilter
    ? transactions.filter(
        (t) => new Date(t.date).getMonth() + 1 === Number(monthFilter)
      )
    : transactions;

  const categoryTotals = {};
  filteredData.forEach((t) => {
    if (!categoryTotals[t.category]) categoryTotals[t.category] = 0;
    categoryTotals[t.category] += Number(t.amount);
  });

  // চার্টের জন্য মডার্ন কালার প্যালেট
  const chartColors = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6"];

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: chartColors,
        borderColor: theme === "dark" ? "#1e293b" : "#ffffff", 
        borderWidth: 3,
      },
    ],
  };

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
        label: "Transactions",
        data: Object.values(monthlyTotals),
        backgroundColor: "#6366f1",
        borderRadius: 10,
        hoverBackgroundColor: "#4f46e5",
      },
    ],
  };

  // মডার্ন কার্ড স্টাইল
  const commonCardClass = `p-6 rounded-3xl border transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
    theme === "dark" 
      ? "bg-slate-800/50 border-slate-700/50 backdrop-blur-md text-white shadow-2xl" 
      : "bg-white border-slate-100 text-slate-800 shadow-lg shadow-slate-100"
  }`;

  return (
    <div className="w-full space-y-10 pb-10">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className={`text-3xl font-extrabold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            Financial <span className="text-indigo-500">Analytics</span>
          </h1>
          <p className={`text-sm mt-1 font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
            Deep dive into your transaction history and trends.
          </p>
        </div>
        
        <select
          onChange={(e) => setMonthFilter(e.target.value)}
          className={`px-5 py-2.5 rounded-2xl border-2 outline-none text-sm font-semibold transition-all cursor-pointer
            ${theme === "dark" ? "bg-slate-800 border-slate-700 text-slate-200 focus:border-indigo-500" : "bg-white border-slate-100 text-slate-600 shadow-sm focus:border-indigo-300"}`}
        >
          <option value="">Yearly Overview</option>
          {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m, i) => (
            <option key={m} value={i + 1}>{m}</option>
          ))}
        </select>
      </div>

      {/* STATS AREA - Gradient Border Style */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "Total Volume", value: `$${Object.values(categoryTotals).reduce((a, b) => a + b, 0).toLocaleString()}`, color: "from-indigo-500 to-blue-500" },
          { label: "Total Records", value: filteredData.length, color: "from-fuchsia-500 to-pink-500" },
          { label: "Avg. Amount", value: `$${filteredData.length > 0 ? (Object.values(categoryTotals).reduce((a, b) => a + b, 0) / filteredData.length).toFixed(0) : 0}`, color: "from-emerald-500 to-teal-500" }
        ].map((stat, i) => (
          <div key={i} className={commonCardClass}>
            <div className={`w-12 h-1.5 rounded-full bg-gradient-to-r ${stat.color} mb-4`}></div>
            <p className="text-xs uppercase tracking-[0.15em] text-slate-500 font-bold mb-1">{stat.label}</p>
            <p className="text-4xl font-black tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* CHARTS AREA */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* PIE CHART CARD */}
        <div className={commonCardClass}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold tracking-tight">Category Distribution</h2>
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
            </div>
          </div>
          <div className="h-[350px]">
            <Pie data={pieData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 25, color: theme === 'dark' ? '#94a3b8' : '#64748b' } } } }} />
          </div>
        </div>

        {/* BAR CHART CARD */}
        <div className={commonCardClass}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold tracking-tight">Monthly Performance</h2>
            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
          </div>
          <div className="h-[350px]">
            <Bar data={barData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { display: false }, ticks: { color: '#94a3b8' } }, x: { grid: { display: false }, ticks: { color: '#94a3b8' } } } }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;