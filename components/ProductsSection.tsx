import React from 'react';
import { useTranslation } from 'react-i18next';
import { products } from '../data/content';
import ProductCard from './ProductCard';
import FadeIn from './IntersectionObserver';

const ProductsSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="products" className="bg-[#f5f5f7] dark:bg-[#050507] relative transition-colors duration-700">

      {/* Introduction */}
      <div className="py-32 container mx-auto px-6 text-center relative z-10">
        <FadeIn>
          <span className="inline-block py-1 px-3 rounded-full bg-black/5 dark:bg-white/10 text-xs font-bold tracking-widest uppercase mb-6 text-gray-600 dark:text-gray-300">
            {t('products.sectionLabel')}
          </span>
          <h2 className="text-4xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tighter">
            {t('products.sectionTitle')}
          </h2>
          <div className="w-24 h-1 bg-[#014bb8] mx-auto rounded-full"></div>
        </FadeIn>
      </div>

      <div className="flex flex-col">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;