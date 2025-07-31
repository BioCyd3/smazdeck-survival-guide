import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const RootLayout = () => {
  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
