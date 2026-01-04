import React from 'react';
import { HiArrowRight } from 'react-icons/hi';

const About = () => {
  const gradientText = "bg-gradient-to-r from-[#2563EB] via-[#9333EA] to-[#F472B6] bg-clip-text text-transparent";

  return (
    <div className="min-h-screen transition-colors duration-500 bg-white dark:bg-[#0b1f33] font-sans">
      {/* 1. Hero Section: Minimalist focus */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="border-l-2 border-blue-600 pl-6 md:pl-10 space-y-6">
          <h1 className="text-4xl md:text-7xl font-light tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            We build tools for <br />
            <span className={`font-bold ${gradientText}`}>Financial Clarity.</span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            FinEase is a simplified platform designed to help you track spending, 
            set goals, and visualize your financial journey without the complexity.
          </p>
        </div>
      </section>

      {/* 2. Values Section: Clean Typography */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-100 dark:border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-blue-600">Simplicity</h3>
            <p className="text-slate-700 dark:text-slate-300">
              No cluttered dashboards. Only the data you need to make better decisions.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-purple-600">Privacy</h3>
            <p className="text-slate-700 dark:text-slate-300">
              Your data is yours. We prioritize security and encryption in every step.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-pink-600">Growth</h3>
            <p className="text-slate-700 dark:text-slate-300">
              Visualize your progress and watch your net balance grow over time.
            </p>
          </div>
        </div>
      </section>

      {/* 3. The Vision Section: Refined & Card-less */}
      <section className="bg-slate-50 dark:bg-[#0d253d] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 dark:text-white leading-tight">
                Crafting the future of <br /> personal finance.
              </h2>
              <div className="space-y-6 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                <p>
                  FinEase was born out of a simple frustration: financial tools are often too intimidating or too shallow.
                </p>
                <p>
                  We stripped away the noise to focus on what truly matters—understanding your flow of money and making informed decisions for your future.
                </p>
              </div>
              <button className="inline-flex items-center gap-2 font-bold text-blue-600 hover:gap-4 transition-all">
                Explore our story <HiArrowRight />
              </button>
            </div>
            
            {/* Minimalist List instead of Card */}
            <div className="lg:w-1/3 w-full space-y-12">
              <div className="relative pl-8 border-l border-slate-200 dark:border-slate-700">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">Our Vision</h4>
                <p className="text-slate-500 mt-2">To be the most trusted companion for your daily financial life.</p>
              </div>
              <div className="relative pl-8 border-l border-slate-200 dark:border-slate-700">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-purple-600"></div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">Our Approach</h4>
                <p className="text-slate-500 mt-2">Combining elegant design with powerful real-time analytics.</p>
              </div>
              <div className="relative pl-8 border-l border-slate-200 dark:border-slate-700">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-pink-600"></div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">Our Promise</h4>
                <p className="text-slate-500 mt-2">Zero hidden trackers, zero complex jargon. Just clarity.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Contact Teaser: Clean CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Have questions?</h2>
          <p className="text-slate-500 dark:text-slate-400">We are always open to feedback and collaboration to make FinEase better.</p>
          <div className="flex justify-center gap-4">
            <button className="px-10 py-3.5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-full font-bold hover:shadow-xl hover:-translate-y-1 transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;