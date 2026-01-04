import React from 'react';

const TermsConditions = () => {
  const gradientText = "bg-gradient-to-r from-[#2563EB] via-[#9333EA] to-[#F472B6] bg-clip-text text-transparent";

  return (
    // ব্যাকগ্রাউন্ড কালার আপডেট করা হয়েছে (Light: slate-50, Dark: #0b1f33)
    <div className="min-h-screen transition-colors duration-500 bg-slate-50 dark:bg-[#0b1f33] font-sans pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section: Left Aligned with Bold "Our" */}
        <div className="border-l-2 border-blue-600 pl-6 md:pl-10 mb-20">
          <h1 className="text-4xl md:text-5xl tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            <span className="font-extrabold block mb-2 opacity-90">Our</span>
            <span className={`font-black ${gradientText}`}>Terms & Conditions.</span>
          </h1>
          <p className="mt-6 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
            Last Updated: January 2026
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-16 text-slate-700 dark:text-slate-300">
          
          {/* Section 01 */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6 group">
            <div className="md:col-span-1">
              <span className="text-blue-600 font-mono font-bold text-xl">01</span>
            </div>
            <div className="md:col-span-11 space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                Acceptance of Terms
              </h2>
              <p className="text-lg leading-relaxed opacity-90">
                By accessing and using <span className="font-bold text-blue-600">FinEase</span>, you agree to be bound by these terms. If you do not agree with any part of these conditions, please refrain from using our services.
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
                User Accounts & Security
              </h2>
              <p className="text-lg leading-relaxed opacity-90">
                You are responsible for maintaining the confidentiality of your account credentials. All financial activities conducted through your account are your sole responsibility.
              </p>
            </div>
          </section>

          {/* Special Focus Section (Prohibited Activities) */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-1">
              <span className="text-pink-600 font-mono font-bold text-xl">03</span>
            </div>
            {/* বক্সে একটু গাঢ় শেড দেওয়া হয়েছে যাতে টেক্সট ফুটে ওঠে */}
            <div className="md:col-span-11 bg-white dark:bg-[#0d253d] p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
                Prohibited Activities
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Malicious software uploads",
                  "Breaching data encryption",
                  "Exploiting system features",
                  "Unauthorized data scraping"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-slate-600 dark:text-slate-400">
                    <div className="w-5 h-5 flex items-center justify-center rounded-full bg-pink-50 dark:bg-pink-900/20 text-pink-600">
                       ✓
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 04 */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6 group">
            <div className="md:col-span-1">
              <span className="text-blue-600 font-mono font-bold text-xl">04</span>
            </div>
            <div className="md:col-span-11 space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                Limitation of Liability
              </h2>
              <p className="text-lg leading-relaxed opacity-90">
                FinEase provides financial tracking tools for personal management purposes only. We do not provide professional financial advice. All decisions are at your own discretion.
              </p>
            </div>
          </section>

        </div>

        {/* Footer Contact */}
        <div className="mt-24 pt-10 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-slate-500 font-medium">
            Questions regarding these terms? 
            <a href="mailto:legal@finease.com" className="ml-2 font-bold text-blue-600 hover:text-purple-600 transition-colors">
              legal@finease.com
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default TermsConditions;