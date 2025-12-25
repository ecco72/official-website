import React, { useEffect, useState } from 'react';
import FadeIn from './IntersectionObserver';
import { useTheme } from '../App';

const Hero: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bgImage = encodeURI("/images/大橫幅-11.png");
  const mobileBgImage = encodeURI("/images/小橫幅-12.png");

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white dark:bg-[#050507] flex items-center justify-center transition-colors duration-700">
      
      {/* Background with Mode Support - Hidden in Light Mode as requested */}
      <div 
        className={`absolute inset-0 z-0 select-none pointer-events-none transition-opacity duration-700 ${isDark ? 'opacity-80' : 'opacity-0'}`}
        style={{ transform: `translateY(${offset * 0.4}px) scale(1.1)` }}
      >
        <picture>
          <source media="(max-width: 768px)" srcSet={mobileBgImage} />
          <img 
            src={bgImage}
            alt="Hero Banner" 
            className="w-full h-full object-cover dark:opacity-50 dark:filter dark:saturate-120 dark:contrast-125"
          />
        </picture>
        
        {/* Gradients adapt to theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:from-black/80 dark:via-transparent dark:to-[#050507]"></div>
        <div className="absolute inset-0 dark:bg-[radial-gradient(circle_at_50%_50%,_transparent_0%,_#050507_90%)]"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-30 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-6 text-center text-gray-900 dark:text-white flex flex-col items-center justify-center h-full pt-16">
        
        <FadeIn delay={0.4}>
          <h1 className="text-6xl sm:text-7xl md:text-9xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-white dark:to-gray-500 drop-shadow-2xl">
            誠雲科技
          </h1>
        </FadeIn>
        
        <FadeIn delay={0.6}>
          <p className="text-xl sm:text-2xl md:text-3xl font-light tracking-[0.3em] text-gray-600 dark:text-gray-400 mb-12 mix-blend-multiply dark:mix-blend-plus-lighter">
            CT-Cloud Technology
          </p>
        </FadeIn>

      </div>

      {/* Scroll Indicator - Simplified to one single line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center pb-12 opacity-60 z-20">
        <span className="text-[10px] font-mono tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-4 uppercase animate-pulse">Scroll</span>
        {/* Single continuous line */}
        <div className="w-[1px] h-16 bg-gradient-to-b from-gray-400 to-transparent dark:from-gray-400 dark:to-transparent"></div>
      </div>
    </div>
  );
};

export default Hero;