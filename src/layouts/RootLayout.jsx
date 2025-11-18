import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const RootLayout = () => {
    return (
       <>
        <Header></Header>
        <main className="min-h-[80vh]">
            <Outlet></Outlet>
        </main>
        <Footer></Footer>


       </>
    );
};

export default RootLayout;