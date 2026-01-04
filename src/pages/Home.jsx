import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Banner from "./Banner";
import { AuthContext } from "../contexts/AuthContext";
import useTheme from "../pages/useTheme";
import SuccessStories from "./SuccessStories";
import FeaturedSection from "./FeaturedSection";
import FAQSection from "./FAQSection";
import BlogSection from "./BlogSection";

import ActivityInsights from "./ActivityInsights";

const Home = () => {
  const { user } = useContext(AuthContext); // logged-in user
  const { theme } = useTheme(); // ⬅ dark/light mode

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
          `https://personal-project-k.vercel.app/overview?email=${user.email}`
        );

        setFinancialData(data);
      } catch (err) {
        console.error("Overview load error:", err);
      }
    };

    fetchData();
  }, [user?.email]);

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-500
      ${
        theme === "dark"
          ? "bg-gray-900 text-gray-200"
          : "bg-gray-50 text-gray-800"
      }
    `}
    >
      {/* Banner */}
      <Banner financialData={financialData} />
      <SuccessStories></SuccessStories>
      {/* Overview Section */}
      <section
        className={`py-24 text-center transition-all duration-500 overflow-hidden relative
  ${
    theme === "dark"
      ? "bg-gray-950 text-white"
      : "bg-gradient-to-br from-cyan-50 via-white to-pink-50 text-gray-800"
  }`}
      >
        {/* Decorative Background Elements (Optional) */}
        {!theme === "dark" && (
          <>
            <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </>
        )}

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-4xl font-bold font-black mb-4 tracking-tight">
            Your Financial Overview
          </h2>
          <p
            className={`mb-16 text-lg ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Real-time insights into your wallet's performance
          </p>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {/* Total Balance Card */}
            <div
              className={`group rounded-[32px] p-10 w-full sm:w-80 transition-all duration-300 hover:-translate-y-2 border
        ${
          theme === "dark"
            ? "bg-gray-900 border-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            : "bg-white border-white shadow-[0_20px_50px_rgba(0,191,255,0.1)]"
        }`}
            >
              <div className="mb-4 inline-flex p-3 rounded-2xl bg-cyan-500/10 text-cyan-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">
                Total Balance
              </h3>
              <p className="text-4xl font-black tracking-tighter tabular-nums">
                ${financialData.totalBalance.toLocaleString()}
              </p>
            </div>

            {/* Income Card */}
            <div
              className={`group rounded-[32px] p-10 w-full sm:w-80 transition-all duration-300 hover:-translate-y-2 border
        ${
          theme === "dark"
            ? "bg-gray-900 border-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            : "bg-white border-white shadow-[0_20px_50px_rgba(34,197,94,0.1)]"
        }`}
            >
              <div className="mb-4 inline-flex p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">
                Total Income
              </h3>
              <p className="text-4xl font-black text-emerald-500 tracking-tighter tabular-nums">
                ${financialData.income.toLocaleString()}
              </p>
            </div>

            {/* Expenses Card */}
            <div
              className={`group rounded-[32px] p-10 w-full sm:w-80 transition-all duration-300 hover:-translate-y-2 border
        ${
          theme === "dark"
            ? "bg-gray-900 border-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            : "bg-white border-white shadow-[0_20px_50px_rgba(244,63,94,0.1)]"
        }`}
            >
              <div className="mb-4 inline-flex p-3 rounded-2xl bg-rose-500/10 text-rose-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">
                Total Expenses
              </h3>
              <p className="text-4xl font-black text-rose-500 tracking-tighter tabular-nums">
                ${financialData.expenses.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </section>
      <BlogSection></BlogSection>
      <FeaturedSection></FeaturedSection>
      <ActivityInsights></ActivityInsights>
      <FAQSection></FAQSection>
{/* Budgeting Tips */}
<section
  className={`py-20 px-6 md:px-32 text-center transition-colors duration-500
    ${
      theme === "dark"
        ? "bg-slate-900 text-gray-200"
        : "bg-slate-50 text-gray-800"
    }
  `}
>
  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
      Budgeting Tips
    </span>
  </h2>

  <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-slate-700 dark:text-slate-300">
    Create a realistic budget, track your expenses, save for{" "}
    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
      emergencies
    </span>
    , and avoid unnecessary debt. Small steps today lead to{" "}
    <span className="font-semibold text-purple-600 dark:text-purple-400">
      financial stability
    </span>{" "}
    tomorrow.
  </p>
</section>

{/* Why Financial Planning */}
<section
  className={`py-20 px-6 md:px-32 text-center transition-colors duration-500
    ${
      theme === "dark"
        ? "bg-slate-950 text-gray-200"
        : "bg-white text-gray-800"
    }
  `}
>
  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
    Why{" "}
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">
      Financial Planning
    </span>{" "}
    Matters
  </h2>

  <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-slate-700 dark:text-slate-300">
    Planning your finances ensures that you are prepared for the future,
    can achieve your{" "}
    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
      goals
    </span>
    , and live{" "}
    <span className="font-semibold text-cyan-600 dark:text-cyan-400">
      stress-free
    </span>{" "}
    without money worries.
  </p>
</section>

    </div>
  );
};

export default Home;
