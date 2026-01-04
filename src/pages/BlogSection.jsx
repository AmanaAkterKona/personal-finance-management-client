import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaCalendarAlt } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const BlogSection = () => {
  const navigate = useNavigate();

  // ৫টি আলাদা আলাদা ইমেজসহ ব্লগ ডেটা
  const blogs = [
    {
      id: 1,
      title: "5 Tips to Save Money Daily",
      desc: "Small changes in your daily routine can lead to massive financial freedom over time.",
      date: "JAN 04, 2026",
      img: "https://picsum.photos/seed/save/600/600"
    },
    {
      id: 2,
      title: "Investing for Beginners",
      desc: "Learn how to make your money work for you with simple investment strategies.",
      date: "JAN 02, 2026",
      img: "https://picsum.photos/seed/invest/600/600"
    },
    {
      id: 3,
      title: "Mastering Your Budget",
      desc: "A comprehensive guide to managing your expenses and increasing your savings effectively.",
      date: "JAN 01, 2026",
      img: "https://picsum.photos/seed/budget/600/600"
    },
    {
      id: 4,
      title: "Understanding Crypto Assets",
      desc: "Navigate the world of digital currencies and learn the basics of blockchain technology.",
      date: "DEC 28, 2025",
      img: "https://picsum.photos/seed/crypto/600/600"
    },
    {
      id: 5,
      title: "Retirement Planning 101",
      desc: "It is never too early to start planning for your golden years with smart savings.",
      date: "DEC 20, 2025",
      img: "https://picsum.photos/seed/retirement/600/600"
    }
  ];

  return (
    <section className="py-24 px-6 bg-white dark:bg-gray-950 transition-all duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-black mb-6 text-slate-900 dark:text-white">
            Our <span className="text-cyan-500">FinEase</span> <span className="text-pink-500">Journal</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg font-medium">
            Keep sliding to discover more financial insights.
          </p>
        </div>

        {/* Custom Bullet Color Style */}
        <style>
          {`
            .swiper-pagination-bullet { background: #94a3b8; }
            .swiper-pagination-bullet-active { background: #06b6d4 !important; width: 24px; border-radius: 4px; }
          `}
        </style>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true} // স্লাইডারটি শেষ হওয়ার পর আবার প্রথম থেকে শুরু হবে
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            1024: { slidesPerView: 2 }, // ডেক্সটপে ২টি কার্ড দেখাবে
          }}
          className="pb-16"
        >
          {blogs.map((blog) => (
            <SwiperSlide key={blog.id}>
              <div className="group flex flex-col md:flex-row items-center gap-6 p-6 rounded-[48px] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 transition-all duration-500 min-h-[280px] hover:shadow-2xl hover:shadow-cyan-500/10">
                
                {/* ইমেজ সেকশন */}
                <div className="w-full md:w-52 h-52 flex-shrink-0 overflow-hidden rounded-[36px] bg-slate-200 dark:bg-slate-800">
                  <img 
                    src={blog.img} 
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* টেক্সট সেকশন */}
                <div className="flex-1 text-left">
                  <span className="text-xs font-black tracking-widest text-cyan-500 dark:text-cyan-400 uppercase flex items-center gap-2 mb-3">
                    <FaCalendarAlt size={12} /> {blog.date}
                  </span>
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 line-clamp-2 leading-relaxed">
                    {blog.desc}
                  </p>
                  <button 
                    onClick={() => navigate('/dashboard/transactions')} 
                    className="flex items-center gap-2 text-cyan-500 font-black text-[10px] uppercase tracking-widest hover:gap-4 transition-all"
                  >
                    READ POST <FaArrowRight />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Explore Button */}
        <div className="text-center mt-8">
          <button 
            onClick={() => navigate('/dashboard/transactions')}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-10 py-4 rounded-2xl font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
          >
            Explore All Insights
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;