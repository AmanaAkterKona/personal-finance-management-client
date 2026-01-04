import React from 'react';

const PrivacyPolicy = () => {
  const gradientText = "bg-gradient-to-r from-[#2563EB] via-[#9333EA] to-[#F472B6] bg-clip-text text-transparent";

  return (
    <div className="min-h-screen transition-colors duration-500 bg-slate-50 dark:bg-[#0b1f33] font-sans pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section: Bold "Our" and Gradient Title */}
        <div className="border-l-2 border-blue-600 pl-6 md:pl-10 mb-20">
          <h1 className="text-4xl md:text-6xl tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            <span className="font-extrabold block mb-2 opacity-90">Our</span>
            <span className={`font-black ${gradientText}`}>Privacy Policy.</span>
          </h1>
          <p className="mt-6 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
            Your privacy is our priority at FinEase.
          </p>
        </div>

        {/* Content Section: Grid Based Layout */}
        <div className="space-y-16 text-slate-700 dark:text-slate-300">
          
          {/* Section 01 */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6 group">
            <div className="md:col-span-1">
              <span className="text-blue-600 font-mono font-bold text-xl">01</span>
            </div>
            <div className="md:col-span-11 space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                Information Collection
              </h2>
              <p className="text-lg leading-relaxed opacity-90">
                We only collect information that is necessary for tracking your financial activities, such as transaction amounts, categories, and dates. We do not access your bank accounts or external financial institutions.
              </p>
            </div>
          </section>

          {/* Section 02 */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6 group">
            <div className="md:col-span-1">
              <span className="text-purple-600 font-mono font-bold text-xl">02</span>
            </div>
            <div className="md:col-span-11 space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                Data Usage
              </h2>
              <p className="text-lg leading-relaxed opacity-90">
                The data you provide is used strictly to generate visual reports and insights. Your data is <span className="text-slate-900 dark:text-white font-bold underline decoration-purple-500/30">never shared with third-party organizations</span> for advertising purposes.
              </p>
            </div>
          </section>

          {/* Data Security Box: Matching the Style of Terms page */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-1">
              <span className="text-pink-600 font-mono font-bold text-xl">03</span>
            </div>
            <div className="md:col-span-11 bg-white dark:bg-[#0d253d] p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
                Data Security
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                FinEase uses industry-standard encryption to protect your financial logs. We ensure that your personal profile and transaction history remain private and secure behind multiple layers of protection.
              </p>
            </div>
          </section>

          {/* Section 04 */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6 group">
            <div className="md:col-span-1">
              <span className="text-blue-600 font-mono font-bold text-xl">04</span>
            </div>
            <div className="md:col-span-11 space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                Cookies & Local Storage
              </h2>
              <p className="text-lg leading-relaxed opacity-90">
                We use local storage and cookies to maintain your login session and theme preferences to provide a seamless user experience across different devices.
              </p>
            </div>
          </section>
        </div>

        {/* Footer Contact */}
        <div className="mt-24 pt-10 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-slate-500 font-medium">
            Concerns about your data? 
            <a href="mailto:support@finease.com" className="ml-2 font-bold text-blue-600 hover:text-purple-600 transition-colors">
              support@finease.com
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;