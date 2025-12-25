import React, { useState, useEffect, createContext, useContext } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CompanyIntro from './components/CompanyIntro';
import ProductsSection from './components/ProductsSection';
import Footer from './components/Footer';

// Theme Context
export const ThemeContext = createContext({
  isDark: true,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const App: React.FC = () => {
  // Default to dark mode as requested for "high-end tech feel"
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={`min-h-screen transition-colors duration-700 ease-in-out ${isDark ? 'bg-[#050507] text-white' : 'bg-[#f0f0f2] text-gray-900'}`}>
        <Header />
        <main>
          <Hero />
          <CompanyIntro />
          <ProductsSection />
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;