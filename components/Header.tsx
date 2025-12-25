import React, { useState, useEffect } from 'react';
import { useTheme } from '../App';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-white/90 dark:bg-[#050507]/90 backdrop-blur-xl border-gray-200 dark:border-white/5 py-3' 
          : 'bg-transparent border-transparent py-4 md:py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 group relative z-10">
          <img 
            src="/images/CTC_logo_2.png" 
            alt="CT-Cloud" 
            className="h-8 md:h-10 w-auto object-contain transition-all duration-300" 
          />
        </a>
        
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-1 items-center bg-gray-100/50 dark:bg-white/5 backdrop-blur-md px-2 py-1.5 rounded-full border border-gray-200 dark:border-white/10">
            {[
              { label: '会社概要', href: '#company' },
              { label: '製品紹介', href: '#products' },
              { label: 'お問い合わせ', href: '#contact' }
            ].map((item) => (
              <a 
                key={item.href}
                href={item.href} 
                className="px-5 py-2 rounded-full text-xs font-medium tracking-wide text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-white/10 transition-all duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all text-gray-600 dark:text-yellow-400"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            ) : (
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
            )}
          </button>

          {/* Mobile Menu Button Removed as requested */}
        </div>
      </div>
    </header>
  );
};

export default Header;