import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useFontLoading } from '../hooks/useFontLoading';
import { useResponsive } from '../hooks/useResponsive';
import { ResponsiveContainer } from '../components/ui/ResponsiveContainer';

const RootLayout = () => {
  const { isLoading, getFontLoadingClass } = useFontLoading({
    onFontsLoaded: (loadedFonts) => {
      console.log('Fonts loaded successfully:', loadedFonts);
    },
    onFontsError: (error) => {
      console.warn('Font loading failed:', error);
    }
  });

  const { isMobile, isTouchDevice, safeAreaInsets } = useResponsive();

  return (
    <div 
      className={`bg-slate-900 text-slate-200 min-h-screen flex flex-col ${getFontLoadingClass()}`}
      style={{
        paddingTop: isMobile ? `${safeAreaInsets.top}px` : 0,
        paddingBottom: isMobile ? `${safeAreaInsets.bottom}px` : 0,
      }}
    >
      <Header />
      <main 
        id="main-content" 
        className={`flex-grow ${isMobile ? 'pb-safe-bottom' : ''}`}
      >
        <ResponsiveContainer
          size="7xl"
          padding="responsive"
          className={`${isMobile ? 'py-4' : 'py-8'}`}
        >
          <Outlet />
        </ResponsiveContainer>
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
