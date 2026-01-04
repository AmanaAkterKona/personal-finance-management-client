import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useTheme from "../pages/useTheme";

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const SuccessStories = () => {
  const { theme } = useTheme();

  const testimonials = [
    {
      id: 1,
      name: "Veda K.",
      role: "Freelance Designer",
      amount: "৳20,000",
      image: "https://i.pravatar.cc/150?u=1",
      review: "FinEase's centralized database saved me so much time, and I even signed up for the mailing list to receive reminders about my spending habits. It's truly amazing!"
    },
    {
      id: 2,
      name: "Cameron P.",
      role: "Software Engineer",
      amount: "৳40,000",
      image: "https://i.pravatar.cc/150?u=2",
      review: "FinEase is the absolute best place to start when managing personal finance. The budget tool helped me find realistic opportunities to save more every month."
    },
    {
      id: 3,
      name: "Gella H.",
      role: "Student",
      amount: "৳15,000",
      image: "https://i.pravatar.cc/150?u=3",
      review: "It made it significantly easier to handle my bills. The filtering feature is particularly handy when reviewing my past transaction history for scholarships."
    },
    {
      id: 4,
      name: "Alex J.",
      role: "Entrepreneur",
      amount: "৳55,000",
      image: "https://i.pravatar.cc/150?u=4",
      review: "The UI is so clean and professional. It feels like a premium banking app but it's much more flexible and easy to use for daily tracking."
    }
  ];

  return (
    <section className={`py-24 px-6 transition-colors duration-500 overflow-hidden ${
      theme === "dark" ? "bg-gray-950" : "bg-gradient-to-b from-white to-blue-50/50"
    }`}>
      <div className="max-w-7xl mx-auto relative">
        
        {/* Header - Matching your theme */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-500 px-4 py-2 rounded-full mb-6 border border-cyan-500/20">
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest">Real Success Stories</span>
          </div>
          <h2 className={`text-4xl font-bold font-black mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            User Testimonials
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Helping over <span className="text-cyan-500 font-bold underline decoration-2 underline-offset-4">26 million users</span> track their finances.
          </p>
        </div>

        {/* Swiper Slider */}
        <div className="relative group px-4">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: '.custom-pagination' }}
            navigation={{ nextEl: '.next-btn', prevEl: '.prev-btn' }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={`h-full p-8 rounded-[40px] border transition-all duration-300 flex flex-col justify-between ${
                  theme === "dark" 
                    ? "bg-gray-900 border-gray-800 shadow-2xl" 
                    : "bg-white border-gray-100 shadow-xl shadow-blue-100/30"
                }`}>
                  <div>
                    {/* Star Rating */}
                    <div className="flex gap-1 mb-6 text-amber-400">
                      {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                    </div>
                    
                    <p className={`text-lg leading-relaxed italic mb-8 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      "{item.review}"
                    </p>
                  </div>

                  {/* Profile Info */}
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-14 h-14 rounded-full border-2 border-cyan-500 p-0.5 object-cover"
                    />
                    <div>
                      <h4 className={`font-black text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.name}</h4>
                      <p className="text-xs text-cyan-500 font-bold uppercase tracking-wider">{item.role}</p>
                      <p className="text-sm font-bold text-pink-600">Saved {item.amount}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons - Visible on hover */}
          <button className="prev-btn absolute top-1/2 -left-4 md:-left-12 z-20 -translate-y-1/2 p-4 rounded-full bg-white dark:bg-gray-800 shadow-xl text-cyan-600 opacity-0 group-hover:opacity-100 transition-all border border-gray-100 dark:border-gray-700">
            <FaChevronLeft size={20} />
          </button>
          <button className="next-btn absolute top-1/2 -right-4 md:-right-12 z-20 -translate-y-1/2 p-4 rounded-full bg-white dark:bg-gray-800 shadow-xl text-cyan-600 opacity-0 group-hover:opacity-100 transition-all border border-gray-100 dark:border-gray-700">
            <FaChevronRight size={20} />
          </button>
        </div>

        {/* Custom Pagination Dots */}
        <div className="custom-pagination flex justify-center gap-2 mt-4"></div>
      </div>
    </section>
  );
};

export default SuccessStories;