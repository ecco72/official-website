import React from 'react';
import { companyIntro } from '../data/content';
import FadeIn from './IntersectionObserver';

const CompanyIntro: React.FC = () => {
  return (
    // Compact padding
    <section id="company" className="py-16 md:py-24 bg-gray-50 dark:bg-[#050507] text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-700">
      
      {/* Decorative Glows */}
      <div className="absolute top-1/4 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-400/10 dark:bg-[#014bb8]/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-400/10 dark:bg-purple-900/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Header Area (Sticky on Desktop) 
              FIX: Added w-full to ensure it takes full width on mobile instead of shrinking to content width due to items-start
          */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-24">
            <FadeIn fullWidth>
              <div>
                 <div className="flex items-center gap-4 mb-4 md:mb-6">
                    <span className="h-[1px] w-8 md:w-12 bg-black dark:bg-white"></span>
                    <span className="text-xs font-mono uppercase tracking-widest text-gray-500">会社概要</span>
                 </div>
                 
                 {/* Title with forced line break on all screens */}
                 <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight mb-6 md:mb-8">
                   セキュリティの<br />
                   <span className="text-[#014bb8]">その先へ。</span>
                 </h2>
                 <p className="text-sm md:text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-8 md:mb-12">
                   企業のITインフラを、<br/>
                   もっと強く、もっと自由に。
                 </p>
                 
                 {/* Stats Grid - STRICT ALIGNMENT FIX */}
                 <div className="grid grid-cols-2 gap-y-8 md:gap-4 w-full">
                    {[
                      { l: "設立", v: "2011" },
                      { l: "認証", v: "ISO 27001" },
                      { l: "導入企業数", v: "50+" },
                      { l: "管理端末数", v: "100万+" }
                    ].map((s, i) => (
                      <div 
                        key={i} 
                        className={`
                          flex flex-col
                          ${/* Mobile Strict Rules: Right side (Odd) forces to col 2 and right edge */ 
                            i % 2 !== 0 
                            ? 'col-start-2 justify-self-end items-end text-right' 
                            : 'col-start-1 justify-self-start items-start text-left'
                          }
                          
                          /* Desktop Reset: Default grid flow, left align, reset margin */
                          md:col-start-auto md:justify-self-start md:items-start md:text-left 
                          md:border-l-2 md:border-[#014bb8] md:pl-4 md:border-t-0 md:pt-0
                        `}
                      >
                        <div className="text-[10px] text-gray-500 dark:text-gray-400 font-bold mb-1 tracking-wider uppercase">{s.l}</div>
                        <div className="text-xl md:text-xl font-bold text-gray-900 dark:text-white">{s.v}</div>
                      </div>
                    ))}
                 </div>
              </div>
            </FadeIn>
          </div>
          
          {/* Content Flow Area */}
          <div className="lg:w-7/12 space-y-12 lg:space-y-16 lg:pt-8">
            {companyIntro.description.map((para, index) => (
              <FadeIn key={index} delay={0.2 + (index * 0.1)} direction="up" className="group">
                <div className={`relative pl-6 md:pl-0 lg:pl-16`}>
                  
                  {/* Desktop Only: Timeline Elements */}
                  <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[1px] bg-gray-200 dark:bg-white/10 group-last:bottom-auto group-last:h-full"></div>
                  <div className="hidden lg:flex absolute left-0 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#014bb8] shadow-[0_0_15px_rgba(1,75,184,0.5)] z-10"></div>
                  
                  {/* Mobile Only: Simple left border accent */}
                  <div className="lg:hidden absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-[#014bb8] to-transparent opacity-50"></div>
                  
                  <p className="text-base md:text-lg leading-loose md:leading-8 font-light text-gray-800 dark:text-gray-300 text-justify">
                    {para}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyIntro;