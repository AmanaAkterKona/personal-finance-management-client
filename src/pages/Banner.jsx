import React from "react";
import { useNavigate } from "react-router-dom";
import bannerImg from "../assets/financeImg.avif";
import bannerLight from "../assets/banner3.webp";
import bannerImg1 from "../assets/finance b1.avif"
import bannerImg2 from "../assets/finance3.jpg"
import bannerImg3 from "../assets/bluefinance.jpg"
import bannerImg4 from "../assets/financesky.webp"
import { FaArrowRight, FaPlusCircle, FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa";

const Banner = ({ financialData }) => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-screen overflow-hidden font-sans flex items-center transition-colors duration-500 bg-[#fdfcfb] dark:bg-[#0b1f33]">
      
      {/* ===== BACKGROUND OVERLAYS (লাইট মোডে প্রিমিয়াম প্যাস্টেল কালার) ===== */}
      <div className="absolute inset-0 z-0">
        {/* Light Mode: Pastel Gradient like your uploaded image */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f3e8ff] via-[#fff7ed] to-[#fefce8] dark:hidden opacity-90" />
        
        {/* Dark Mode: Your Original Background */}
        <div className="hidden dark:block absolute inset-0 bg-[#0b1f33]" />

        {/* Background Image Wrapper */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 dark:opacity-40 transition-opacity duration-500"
          style={{ backgroundImage: `url(${bannerLight})` }}
        >
          {/* Light Mode Overlay (লেখা পরিষ্কার রাখার জন্য) */}
          <div className="absolute inset-0 bg-white/40 dark:hidden" />
          
          {/* Dark Mode: Original Style Gradient */}
          <div className="hidden dark:block absolute inset-0 bg-gradient-to-r from-[#0b1f33]/98 via-[#0b1f33]/85 to-[#0b1f33]/40" />
        </div>
      </div>

      <div className="relative z-10 w-full px-6 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* ===== LEFT CONTENT (সব টেক্সট ও স্টাইল আপনার কোড অনুযায়ী রাখা হয়েছে) ===== */}
          <div className="lg:col-span-6 space-y-10 py-12">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-100 dark:bg-cyan-500/20 border border-cyan-200 dark:border-cyan-400/30 text-xs font-bold tracking-[0.2em] uppercase text-cyan-700 dark:text-cyan-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-600"></span>
                </span>
                Smart Finance Tracker
              </span>

              <h1 className="text-5xl md:text-6xl xl:text-7xl font-semibold leading-[1.1] tracking-tight text-slate-900 dark:text-white transition-colors">
                Master Your <span className="text-cyan-600 dark:text-cyan-400 font-bold">Financial Future</span> with Precise Analytics.
              </h1>
            </div>

            <p className="text-xl leading-relaxed text-slate-700 dark:text-slate-300 max-w-xl font-medium border-l-4 border-cyan-500/50 pl-6 italic">
              Empowering you with real-time data to make smarter investment decisions and secure your family's prosperity.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
  {/* Primary Button: Get Full Insights */}
  <button
    onClick={() => navigate("/transactions")}
    className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 rounded-full 
               /* Light Mode: Deep Blue Gradient */
               bg-gradient-to-r from-slate-900 to-indigo-950 hover:from-indigo-600 hover:to-blue-700 
               /* Dark Mode */
               dark:bg-cyan-500 dark:hover:bg-cyan-400 
               text-white dark:text-slate-950 font-bold transition-all duration-300 
               shadow-xl shadow-indigo-200 dark:shadow-none overflow-hidden"
  >
    <span className="relative z-10">Get Full Insights</span>
    <FaArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" />
  </button>

  {/* Secondary Button: Add Record */}
  <button
    onClick={() => navigate("/add")}
    className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full border-2 
               /* Light Mode: Soft Border and Subtle Shadow */
               border-slate-200 bg-white/50 text-slate-700 hover:bg-white hover:border-indigo-400 hover:text-indigo-700
               /* Dark Mode */
               dark:border-white/20 dark:text-white dark:hover:bg-white/10 
               font-bold transition-all duration-300 backdrop-blur-md shadow-sm"
  >
    <FaPlusCircle className="text-indigo-600 dark:text-cyan-400 text-xl transition-colors group-hover:text-indigo-700" />
    Add Record
  </button>
</div>


          </div>

          {/* ===== RIGHT IMAGE SECTION (সব বর্ডার ও শ্যাডো আপনার কোড অনুযায়ী রাখা হয়েছে) ===== */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end py-12">
            <div className="relative w-full max-w-[600px]">
              
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-cyan-400/20 dark:bg-cyan-500/30 blur-[100px] rounded-full"></div>

              <div className="relative h-[550px] md:h-[680px] w-full rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] dark:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] border-4 border-white group">
                <img
                  src={bannerImg}
                  alt="Finance Success"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>

              {/* === Financial Card (আপনার অরিজিনাল ডিজাইন) === */}
              <div className="absolute -bottom-8 -left-6 md:-left-12 bg-white p-8 rounded-[2.5rem] shadow-2xl w-full max-w-[340px] z-30 border border-slate-100 transition-all duration-500 hover:-translate-y-3">
                <div className="flex items-center justify-between mb-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Net Balance</p>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter">
                      ${financialData?.totalBalance?.toLocaleString() || 0}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white">
                    <FaWallet size={20} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
                  <div>
                    <div className="flex items-center gap-1.5 text-emerald-600">
                      <FaArrowUp size={10} />
                      <span className="text-[10px] font-black uppercase">Income</span>
                    </div>
                    <p className="text-lg font-bold text-slate-800">${financialData?.income?.toLocaleString() || 0}</p>
                  </div>
                  <div className="text-right border-l border-slate-100 pl-4">
                    <div className="flex items-center justify-end gap-1.5 text-red-600">
                      <span className="text-[10px] font-black uppercase">Exp.</span>
                      <FaArrowDown size={10} />
                    </div>
                    <p className="text-lg font-bold text-slate-800">${financialData?.expenses?.toLocaleString() || 0}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;