import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // নেভিগেশনের জন্য
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';
import useTheme from '../pages/useTheme';

const FAQSection = () => {
  const { theme } = useTheme();
  const navigate = useNavigate(); // নেভিগেট হুক
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I track my daily expenses?",
      answer: "Just log in to your dashboard and go to the 'New Entry' section. Enter the amount and category to instantly update your financial logs."
    },
    {
      question: "Is my financial data secure with FinEase?",
      answer: "Absolutely. We use industry-standard encryption to protect your transaction history and personal profile data."
    },
    {
      question: "Can I visualize my spending patterns?",
      answer: "Yes, our dashboard provides 'Category Distribution' pie charts and 'Monthly Performance' bar graphs for clear insights."
    },
    {
      question: "How can I contact support for issues?",
      answer: "You can reach us via the 'Contact' page or directly email us at proff.kona@gmail.com for any assistance."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={`py-24 px-6 transition-all duration-500 ${
      theme === "dark" ? "bg-gray-950" : "bg-white"
    }`}>
      <div className="max-w-4xl mx-auto">
        
        {/* লোগো এবং হেডিং থিম */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/10 text-cyan-500 mb-6">
            <FaQuestionCircle size={32} />
          </div>
          <h2 className={`text-4xl md:text-5xl font-black mb-4 tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Frequently <span className="text-cyan-500">Asked</span> <span className="text-pink-500">Questions</span>
          </h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Everything you need to know about managing your wallet with FinEase.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`rounded-2xl border transition-all duration-300 ${
                theme === "dark" 
                  ? "bg-slate-900 border-slate-800 hover:border-cyan-500/30" 
                  : "bg-white border-slate-100 shadow-sm hover:shadow-cyan-100/50"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`font-bold text-lg ${
                  theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                }`}>
                  {faq.question}
                </span>
                <div className={`p-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-cyan-500 text-white rotate-180' : 'bg-cyan-500/10 text-cyan-500'
                }`}>
                  <FaChevronDown size={14} />
                </div>
              </button>

              <div className={`overflow-hidden transition-all duration-500 ${
                activeIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className={`p-6 pt-0 leading-relaxed ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* কন্টাক্ট সাপোর্ট বাটন - আপনার দেওয়া পাথ 'contact' এ নিয়ে যাবে */}
        <div className="mt-16 text-center">
          <p className={`mb-6 text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
            Still have questions?
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-md shadow-cyan-500/20 active:scale-95"
          >
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;