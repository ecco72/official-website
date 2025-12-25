import React from 'react';
import { ProductData } from '../types';
import Carousel from './Carousel';
import FadeIn from './IntersectionObserver';

interface Props {
  product: ProductData;
  index: number;
}

const ProductCard: React.FC<Props> = ({ product, index }) => {
  const isEven = index % 2 === 0;

  return (
    // Reduced padding on mobile (py-12) for tighter, more app-like feel
    <div className={`relative w-full py-16 md:py-48 overflow-hidden transition-colors duration-700 ${
      isEven 
        ? 'bg-white dark:bg-[#08080a]' 
        : 'bg-[#f8f8fa] dark:bg-[#050507]'
    }`}>
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30 dark:opacity-20">
         <div className={`absolute w-[60vw] h-[60vw] rounded-full blur-[150px] mix-blend-multiply dark:mix-blend-screen transition-all duration-1000 ${
           isEven 
             ? '-top-1/4 -right-1/4 bg-blue-100 dark:bg-blue-900/20' 
             : '-bottom-1/4 -left-1/4 bg-purple-100 dark:bg-purple-900/20'
         }`}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-32 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Visual Area - Adjusted margin for mobile */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <FadeIn delay={0.2} direction={isEven ? 'right' : 'left'}>
              <div className="relative z-10">
                {/* Subtle backlight instead of heavy container */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10"></div>
                <Carousel images={product.images} alt={product.title} />
              </div>
            </FadeIn>
          </div>

          {/* Text Area */}
          <div className="w-full lg:w-1/2">
            <FadeIn>
              {/* Product Numbering */}
              <div className="flex items-center gap-4 mb-4 lg:mb-6 opacity-60">
                <span className="text-5xl md:text-8xl font-bold font-mono text-gray-100 dark:text-white/5 leading-none absolute -translate-y-4 -translate-x-4 lg:-translate-y-6 lg:-translate-x-6 select-none pointer-events-none">
                  0{index + 1}
                </span>
                <span className="relative z-10 text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#014bb8] uppercase">
                  製品 0{index + 1}
                </span>
              </div>

              {/* Tighter typography on mobile */}
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6 leading-tight tracking-tight whitespace-pre-line">
                {product.title}
              </h3>

              {product.subtitle && (
                <p className="text-lg md:text-2xl text-gray-500 dark:text-gray-400 font-light mb-6 lg:mb-8">
                  {product.subtitle}
                </p>
              )}

              {/* Primary Feature Description */}
              {product.features.length > 0 && (
                <div className="mb-8 lg:mb-12">
                   <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify lg:text-left">
                     {product.features[0].description}
                   </p>
                </div>
              )}
            </FadeIn>
          </div>
        </div>

        {/* Feature Grid */}
        {product.features.length > 1 && (
          <div className="mt-16 md:mt-32">
             <FadeIn>
               <h4 className="text-xs md:text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-8 md:mb-12 border-b border-gray-200 dark:border-white/10 pb-4">
                 主な機能
               </h4>
             </FadeIn>
             
             {/* Tighter grid on mobile */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 md:gap-y-16">
              {product.features.slice(1).map((feature, idx) => (
                <FadeIn key={idx} delay={0.1 * idx} className="group">
                   <div className="flex flex-col h-full">
                     <div className="mb-3 md:mb-4 flex items-center gap-3">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-gray-200 dark:border-white/20 flex items-center justify-center text-[10px] md:text-xs font-mono text-gray-400 group-hover:bg-[#014bb8] group-hover:border-[#014bb8] group-hover:text-white transition-all shrink-0">
                          {idx + 1}
                        </div>
                        <h4 className="text-base md:text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#014bb8] transition-colors">
                          {feature.title}
                        </h4>
                     </div>
                     <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed pl-9 text-justify">
                       {feature.description}
                     </p>
                   </div>
                </FadeIn>
              ))}
            </div>
          </div>
        )}

        {/* Tech Specs */}
        {product.specs && (
          <FadeIn delay={0.3} className="mt-20 md:mt-32">
            <div className="rounded-xl md:rounded-2xl bg-gray-50 dark:bg-[#0f0f11] overflow-hidden border border-gray-200 dark:border-white/5 relative shadow-sm">
              
              {/* Top Bar HUD */}
              <div className="bg-gray-100 dark:bg-white/5 px-4 md:px-6 py-3 md:py-4 flex justify-between items-center border-b border-gray-200 dark:border-white/5">
                <div className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse"></div>
                   <span className="text-[10px] md:text-xs font-mono font-bold uppercase text-gray-600 dark:text-gray-300 tracking-widest">システム仕様</span>
                </div>
                <div className="hidden md:flex gap-1">
                   {[1,2,3].map(i => <div key={i} className="w-1 h-3 bg-gray-400/30 skew-x-12"></div>)}
                </div>
              </div>

              <div className="p-4 md:p-10">
                {/* GPU Specs Section */}
                {product.specs.gpu && (
                  <div>
                    {/* Desktop Table View (Hidden on Mobile) */}
                    <div className="hidden md:block overflow-x-auto pb-4 custom-scrollbar">
                      <table className="w-full text-left font-mono text-xs md:text-sm min-w-[600px] whitespace-normal">
                        <thead>
                          <tr>
                            {product.specs.gpu.headers.map((header, i) => (
                              <th key={i} className="pb-3 md:pb-4 text-gray-400 dark:text-gray-500 text-[10px] md:text-xs uppercase tracking-wider">{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                          {product.specs.gpu.rows.map((row, i) => (
                            <tr key={i} className="group hover:bg-white dark:hover:bg-white/5 transition-colors">
                              <td className="py-3 md:py-4 pr-4 font-bold text-blue-600 dark:text-blue-400">{row.label}</td>
                              <td className="py-3 md:py-4 pr-4 text-gray-800 dark:text-gray-300">{row.value1}</td>
                              <td className="py-3 md:py-4 text-gray-800 dark:text-gray-300">{row.value2}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Card/List View (Shown on Mobile) */}
                    <div className="md:hidden space-y-6">
                      {product.specs.gpu.rows.map((row, i) => (
                        <div key={i} className="border-b border-gray-200 dark:border-white/5 pb-6 last:border-0 last:pb-0">
                           {/* Row Header */}
                           <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-3 block">
                             {row.label}
                           </div>
                           
                           {/* Value Grid */}
                           <div className="grid grid-cols-2 gap-4">
                             {/* Value 1 */}
                             <div className="bg-white dark:bg-white/5 p-3 rounded-lg border border-gray-100 dark:border-white/5">
                               <div className="text-[10px] text-gray-400 mb-1 uppercase tracking-wider">{product.specs!.gpu!.headers[1]}</div>
                               <div className="text-xs font-mono text-gray-800 dark:text-gray-200">{row.value1}</div>
                             </div>

                             {/* Value 2 */}
                             <div className="bg-white dark:bg-white/5 p-3 rounded-lg border border-gray-100 dark:border-white/5">
                               <div className="text-[10px] text-gray-400 mb-1 uppercase tracking-wider">{product.specs!.gpu!.headers[2]}</div>
                               <div className="text-xs font-mono text-gray-800 dark:text-gray-200">{row.value2}</div>
                             </div>
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Server Specs */}
                {product.specs.server && (
                  <div className="mt-8 md:mt-8 pt-8 md:pt-0 border-t md:border-t-0 border-gray-200 dark:border-white/5">
                     <div className="mb-4 md:mb-6 inline-block px-2 py-1 bg-gray-200 dark:bg-white/10 rounded text-[10px] md:text-xs font-mono text-gray-700 dark:text-gray-300">
                       {product.specs.server.title}
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 md:gap-y-4 font-mono text-xs md:text-sm">
                        {product.specs.server.rows.map((row, i) => (
                          <div key={i} className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200 dark:border-white/5 pb-2 md:pb-3">
                             <span className="text-gray-500 dark:text-gray-500 mb-1 sm:mb-0 text-[10px] md:text-xs uppercase">{row.label}</span>
                             <span className="text-gray-900 dark:text-white sm:text-right font-medium">{row.value1}</span>
                          </div>
                        ))}
                     </div>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
};

export default ProductCard;