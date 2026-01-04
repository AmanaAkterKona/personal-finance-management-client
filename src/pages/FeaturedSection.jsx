import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaWallet, FaChartPie, FaShieldAlt } from 'react-icons/fa';
import useTheme from '../pages/useTheme';

const FeaturedSection = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      title: "Smart Tracking",
      desc: "Automatically categorize your daily spendings with AI precision.",
      icon: <FaChartPie />,
      color: "text-cyan-500",
      bg: theme === "dark" ? "bg-cyan-500/10" : "bg-[#ecfeff]"
    },
    {
      title: "Secure Wallet",
      desc: "Bank-grade encryption ensures your financial data stays private.",
      icon: <FaShieldAlt />,
      color: "text-pink-500",
      bg: theme === "dark" ? "bg-pink-500/10" : "bg-[#fdf2f8]"
    },
    {
      title: "Budget Planning",
      desc: "Set monthly goals and get alerts before you overspend.",
      icon: <FaWallet />,
      color: "text-indigo-500",
      bg: theme === "dark" ? "bg-indigo-500/10" : "bg-[#eef2ff]"
    }
  ];

  return (
    <section
      className={`py-24 px-6 transition-all duration-500 ${
        theme === "dark" ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-cyan-500/20 px-6 py-2 rounded-full mb-10 shadow-sm">
          <span className="text-xs font-black uppercase tracking-widest bg-gradient-to-r from-cyan-500 to-pink-500 bg-clip-text text-transparent">
            ✨ Your Ultimate Financial Hub
          </span>
        </div>

        {/* Heading */}
        <h2 className={`text-4xl md:text-4xl font-bold font-black mb-6 tracking-tight ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Explore Our <span className="text-cyan-500">Premium</span> <span className="text-pink-500">Tools</span>
        </h2>
        
        <p className={`max-w-2xl mx-auto text-lg mb-20 leading-relaxed ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Manage your finances easily, track expenses, and achieve your financial goals with our advanced feature set.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`p-10 rounded-[40px] border transition-all duration-500 hover:-translate-y-3 group ${
                theme === "dark" 
                  ? "bg-gray-900 border-gray-800 hover:border-cyan-500/30 shadow-2xl shadow-black/50" 
                  : "bg-white border-gray-100 shadow-[0_20px_50px_rgba(0,191,255,0.06)] hover:shadow-cyan-100/50"
              }`}
            >
              {/* Icon */}
              <div className={`w-20 h-20 mx-auto ${feature.bg} ${feature.color} rounded-3xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-500`}>
                {feature.icon}
              </div>
              
              <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {feature.title}
              </h3>
              <p className={`leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Button */}
        <button 
          onClick={() => navigate('/dashboard/transactions')}
          className="inline-flex items-center gap-4 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-4 rounded-[17px] font-black text-[15px] transition-all shadow-[0_15px_35px_rgba(6,182,212,0.3)] hover:shadow-pink-500/30 hover:scale-105 active:scale-95 group"
        >
          See All Transactions 
          <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
        </button>
      </div>
    </section>
  );
};

export default FeaturedSection;
