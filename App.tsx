import React, { useState, useEffect, createContext, useContext } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CompanyIntro from './components/CompanyIntro';
import ComplianceSection from './components/ComplianceSection';
import ProductsSection from './components/ProductsSection';
import Footer from './components/Footer';
import { useTranslation } from 'react-i18next';

// Theme Context
export const ThemeContext = React.createContext({
  isDark: false,
  toggleTheme: () => { }
});

export const useTheme = () => React.useContext(ThemeContext);

function App() {
  const [isDark, setIsDark] = useState(false);
  const { t } = useTranslation();

  // Load theme from local storage or system preference on mount
  useEffect(() => {
    // Check local storage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }
  }, []);

  // Update document title and description based on language
  useEffect(() => {
    document.title = t('app.title');

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('app.description'));
    }
  }, [t]);

  // Update DOM when theme changes
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={`min-h-screen bg-white dark:bg-[#050507] transition-colors duration-700 ${isDark ? 'dark' : ''}`}>
        <Header />
        <main>
          <Hero />
          <CompanyIntro />
          <ComplianceSection />
          <ProductsSection />
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;