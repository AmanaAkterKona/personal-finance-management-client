import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// Assets
import bannerImg from "../assets/financeImg.avif";
import bannerLight from "../assets/banner3.webp";
import bannerImg1 from "../assets/finance b1.avif";
import bannerImg2 from "../assets/finance3.jpg";
import bannerImg3 from "../assets/bluefinance.jpg";

import { FaArrowRight, FaPlusCircle, FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa";

const Banner = ({ financialData }) => {
  const navigate = useNavigate();

  // Background images for slider
  const bgImages = [bannerImg, bannerLight, bannerImg1, bannerImg2, bannerImg3];

  return (
    <section className="relative w-full min-h-screen overflow-hidden font-sans flex items-center transition-colors duration-500 bg-[#fdfcfb] dark:bg-[#0b1f33]">
      
      {/* ===== BACKGROUND SLIDER ===== */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          speed={1500}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="h-full w-full"
        >
          {bgImages.map((img, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-full bg-cover bg-center transition-opacity duration-500"
                style={{ backgroundImage: `url(${img})` }}
              >
                {/* Light Mode: Strong overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/85 to-white/75 dark:hidden" />
                {/* Dark Mode: Gradient */}
                <div className="hidden dark:block absolute inset-0 bg-gradient-to-r from-[#0b1f33]/98 via-[#0b1f33]/85 to-[#0b1f33]/40" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="relative z-10 w-full px-6 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-6 space-y-10 py-12">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-100 dark:bg-cyan-500/20 border border-cyan-200 dark:border-cyan-400/30 text-xs font-bold tracking-[0.2em] uppercase text-cyan-700 dark:text-cyan-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-600"></span>
                </span>
                Smart Finance Tracker
              </span>

              <h1 className="relative text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900 dark:text-white transition-colors">
                {/* Dark mode shadow reduced */}
                <span className="absolute -inset-4 blur-2xl bg-white/70 dark:bg-white/10 rounded-3xl"></span>
                <span className="absolute -inset-2 blur-xl bg-white/60 dark:bg-white/5 rounded-2xl"></span>
                
                <span className="relative drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] dark:drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]">
                  Master Your <span className="text-cyan-700 dark:text-cyan-400 font-black relative">
                    <span className="absolute -inset-1 blur-lg bg-cyan-300/50 dark:bg-cyan-400/15"></span>
                    <span className="relative">Financial Future</span>
                  </span> with Precise Analytics.
                </span>
              </h1>
            </div>

            <p className="text-xl leading-relaxed text-slate-800 dark:text-slate-200 max-w-xl font-semibold border-l-4 border-cyan-600/70 pl-6 italic">
              Empowering you with real-time data to make smarter investment decisions and secure your family's prosperity.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <button
                onClick={() => navigate("/dashboard/transactions")}
                className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 dark:bg-cyan-800 dark:hover:bg-cyan-900 text-white font-bold transition-all duration-300 shadow-xl shadow-cyan-200/50 dark:shadow-none overflow-hidden"
              >
                <span className="relative z-10">Get Full Insights</span>
                <FaArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" />
              </button>

              <button
                onClick={() => navigate("/dashboard/add")}
                className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full border-2 border-slate-300 text-slate-800 hover:text-cyan-800 hover:border-cyan-500 hover:text-cyan-700 dark:border-white/20 dark:text-white dark:hover:bg-cyan-700 dark:hover:text-white font-bold transition-all duration-300 backdrop-blur-md shadow-lg"
              >
                <FaPlusCircle className="text-cyan-600 dark:text-white text-xl transition-colors group-hover:text-cyan-700 dark:group-hover:text-white" />
                Add Record
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
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

              {/* Financial Card */}
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
