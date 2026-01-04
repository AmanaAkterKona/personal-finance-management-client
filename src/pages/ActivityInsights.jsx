import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import {
  FaArrowRight,
  FaCheckCircle,
  FaUtensils,
  FaHome,
  FaWallet,
} from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import useTheme from "../pages/useTheme";
import img from "../assets/banner3.webp";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const ActivityInsights = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    axios
      .get(
        `https://personal-project-k.vercel.app/transactions?email=${user.email}`
      )
      .then((res) => {
        setTransactions(res.data);
        setLoading(false);
      });
  }, [user]);

  if (loading) return null;

  const totalSpending = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const chartData = {
    labels: ["W1", "W2", "W3", "W4", "W5", "W6"],
    datasets: [
      {
        fill: true,
        data: transactions.slice(0, 6).map((t) => t.amount).reverse(),
        borderColor: "#10b981",
        backgroundColor:
          theme === "dark"
            ? "rgba(16,185,129,0.18)"
            : "rgba(16,185,129,0.1)",
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { display: false }, y: { display: false } },
  };

  const getIcon = (category) => {
    if (category === "food") return <FaUtensils />;
    if (category === "home") return <FaHome />;
    return <FaWallet />;
  };

  return (
    <section
      className="relative py-20 px-6 lg:px-24 overflow-hidden"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 ${
          theme === "dark"
            ? "bg-gradient-to-br from-black/80 via-slate-900/80 to-emerald-900/70"
            : "bg-gradient-to-br from-white/90 via-slate-100/90 to-emerald-50/80"
        }`}
      />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* LEFT CARD */}
        <div
          className={`p-6 rounded-[2rem] shadow-2xl border ${
            theme === "dark"
              ? "bg-white/10 backdrop-blur-xl border-white/20"
              : "bg-white/80 backdrop-blur-lg border-slate-200"
          }`}
        >
          {/* Chart */}
          <div
            className={`p-6 rounded-[1.5rem] mb-6 border ${
              theme === "dark"
                ? "bg-black/30 border-white/10"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <h4
              className={`text-3xl font-black ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              ${totalSpending.toLocaleString()}
            </h4>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
              This Month
            </p>
            <div className="h-24 mt-4">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Transactions */}
          <div className="space-y-3">
            {transactions.slice(0, 3).map((t) => (
              <div
                key={t._id}
                className={`flex items-center justify-between p-4 rounded-xl border ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10"
                    : "bg-white border-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      theme === "dark"
                        ? "bg-black/40 text-emerald-400"
                        : "bg-emerald-100 text-emerald-600"
                    }`}
                  >
                    {getIcon(t.category)}
                  </div>
                  <span
                    className={`text-sm font-semibold capitalize ${
                      theme === "dark"
                        ? "text-slate-200"
                        : "text-slate-800"
                    }`}
                  >
                    {t.category}
                  </span>
                </div>
                <span
                  className={`font-bold text-sm ${
                    theme === "dark"
                      ? "text-white"
                      : "text-slate-900"
                  }`}
                >
                  ${Number(t.amount).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-8">
          <div>
            <h2
              className={`text-4xl lg:text-5xl font-black leading-tight ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              Get insights from <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">
                personalized reports
              </span>
            </h2>
            <p
              className={`text-sm max-w-md mt-4 ${
                theme === "dark"
                  ? "text-slate-300"
                  : "text-slate-700"
              }`}
            >
              Visualize your spending, track growth, and make smarter financial
              decisions with clarity.
            </p>
          </div>

          <div className="space-y-6">
            {[
              "Smart cash tracking",
              "Real-time synced reports",
            ].map((text, i) => (
              <div key={i} className="flex gap-4">
                <FaCheckCircle className="text-emerald-500 text-xl mt-1" />
                <p
                  className={`text-sm font-medium ${
                    theme === "dark"
                      ? "text-slate-200"
                      : "text-slate-800"
                  }`}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* BUTTON → Reports */}
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-3 px-6 py-4 rounded-[17px] bg-emerald-500 text-white font-bold  hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/30 text-sm"
          >
            View Reports <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ActivityInsights;
