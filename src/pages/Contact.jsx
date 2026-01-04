import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { 
  HiOutlineMail, 
  HiOutlineLocationMarker, 
  HiOutlinePhone 
} from 'react-icons/hi';
import { 
  RiTwitterLine, 
  RiLinkedinLine, 
  RiInstagramLine, 
  RiFacebookLine 
} from 'react-icons/ri';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const gradientText = "bg-gradient-to-r from-[#2563EB] via-[#9333EA] to-[#F472B6] bg-clip-text text-transparent";

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const contactData = {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value,
    };

    try {
      // আপনার ব্যাকএন্ড ইউআরএল এখানে দিন
      const response = await axios.post('http://localhost:3000/contacts', contactData);
      
      if (response.data.insertedId) {
        toast.success("Message sent successfully!");
        form.reset(); 
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-500 bg-white dark:bg-[#0b1f33] font-sans pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="border-l-2 border-blue-600 pl-6 md:pl-10 mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-slate-900 dark:text-white leading-tight">
            Let’s start a <br />
            <span className={`font-bold ${gradientText}`}>Conversation.</span>
          </h1>
          <p className="max-w-xl text-lg text-slate-500 dark:text-slate-400 font-medium">
            Have questions or feedback? We're here to help you navigate your financial journey with FinEase.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* 1. Contact Info List */}
          <div className="space-y-12">
            <div className="space-y-8">
              {/* Email */}
              <div className="flex items-start gap-6 group">
                <div className="mt-1 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <HiOutlineMail className="text-2xl" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">Email us</h4>
                  <p className="text-xl font-semibold text-slate-800 dark:text-slate-200">hello@finease.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-6 group">
                <div className="mt-1 p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                  <HiOutlinePhone className="text-2xl" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">Call us</h4>
                  <p className="text-xl font-semibold text-slate-800 dark:text-slate-200">+1 (555) 000-FINA</p>
                </div>
              </div>

              {/* Office */}
              <div className="flex items-start gap-6 group">
                <div className="mt-1 p-3 rounded-xl bg-pink-50 dark:bg-pink-900/20 text-pink-600 transition-colors group-hover:bg-pink-600 group-hover:text-white">
                  <HiOutlineLocationMarker className="text-2xl" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">Office</h4>
                  <p className="text-xl font-semibold text-slate-800 dark:text-slate-200">Financial District, NY 10005</p>
                </div>
              </div>
            </div>

            {/* Social Links Section with Icon + Name Side by Side */}
            <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 ml-1">Social Connect</h4>
              <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                <a href="#" className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-all font-medium group">
                  <RiTwitterLine className="text-xl group-hover:scale-110 transition-transform" />
                  <span>Twitter</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-blue-700 transition-all font-medium group">
                  <RiLinkedinLine className="text-xl group-hover:scale-110 transition-transform" />
                  <span>LinkedIn</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-pink-600 transition-all font-medium group">
                  <RiInstagramLine className="text-xl group-hover:scale-110 transition-transform" />
                  <span>Instagram</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-blue-800 transition-all font-medium group">
                  <RiFacebookLine className="text-xl group-hover:scale-110 transition-transform" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* 2. Contact Form */}
          <div className="bg-slate-50 dark:bg-[#0d253d] p-8 md:p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <form onSubmit={handleSendMessage} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Full Name</label>
                  <input 
                    name="name"
                    required
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-[#0b1f33] border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Email Address</label>
                  <input 
                    name="email"
                    required
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-[#0b1f33] border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Subject</label>
                <input 
                  name="subject"
                  required
                  type="text" 
                  placeholder="How can we help?"
                  className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-[#0b1f33] border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Message</label>
                <textarea 
                  name="message"
                  required
                  rows="4"
                  placeholder="Share your thoughts with us..."
                  className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-[#0b1f33] border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-slate-400 border-t-white dark:border-t-slate-900 rounded-full animate-spin"></span>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;