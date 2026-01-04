import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../pages/Sidebar';
import Header from '../components/Header';

const DashboardLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0b1f33]">
            {/* Header: sticky দিলে স্ক্রল করলেও উপরে থাকবে */}
            <div className="sticky top-0 z-50">
                <Header />
            </div>
            
            <div className="flex flex-1">
                {/* Left Side: Sidebar - border এবং background ফিক্স করা হয়েছে */}
                <aside className="w-64 hidden lg:block border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1f33]">
                    <Sidebar />
                </aside>

                {/* Right Side: Main Content area */}
                {/* p-10 কমিয়ে p-4/p-6 করা হয়েছে যাতে চারপাশের গ্যাপ কমে যায় */}
                <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                    <div className="max-w-[1600px] mx-auto"> 
                        {/* mx-auto এবং max-w দিলে খুব বড় স্ক্রিনেও কন্টেন্ট দেখতে সুন্দর লাগে */}
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;