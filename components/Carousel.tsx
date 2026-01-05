import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ImageViewer from './ImageViewer';

interface Props {
  images: string[];
  alt: string;
}

const Carousel: React.FC<Props> = ({ images, alt }) => {
  const { t, i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasError, setHasError] = useState<boolean[]>([]);

  // Sync state when images change (e.g., language switch)
  useEffect(() => {
    // If the current index is suddenly out of bounds, reset to 0
    if (currentIndex >= images.length) {
      setCurrentIndex(0);
    }
    // Re-initialize error states for the new set of images
    setHasError(new Array(images.length).fill(false));
  }, [images, i18n.language]);

  const [viewerOpen, setViewerOpen] = useState(false);

  // Touch handling state for inline carousel
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  if (images.length === 0) return null;

  const getSafeUrl = (path: string) => {
    try {
      const decoded = decodeURI(path);
      return encodeURI(decoded);
    } catch (e) {
      return path;
    }
  };

  const handleImageError = (index: number) => {
    const newErrors = [...hasError];
    newErrors[index] = true;
    setHasError(newErrors);
  };

  // Navigation Logic
  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Swipe Logic
  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const safeImages = images.map(getSafeUrl);

  return (
    <>
      {/* Clean container without borders/backgrounds/shadows */}
      <div
        className="relative group w-full h-full min-h-[300px] md:min-h-[400px] flex items-center justify-center aspect-[4/3] md:aspect-auto touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >

        {/* Main Image View */}
        <div className="absolute inset-0 flex items-center justify-center">
          {images.map((src, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-all duration-700 ease-out flex items-center justify-center ${currentIndex === idx
                ? 'opacity-100 scale-100 z-10 blur-0'
                : 'opacity-0 scale-95 z-0 blur-sm'
                }`}
            >
              {!hasError[idx] ? (
                <div className="relative w-full h-full group/image cursor-zoom-in" onClick={() => setViewerOpen(true)}>
                  <img
                    src={getSafeUrl(src)}
                    alt={`${alt} ${idx + 1}`}
                    className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover/image:scale-[1.02]"
                    onError={() => handleImageError(idx)}
                  />

                  {/* Hover Hint Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-black/40 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2 transform translate-y-4 group-hover/image:translate-y-0 transition-transform duration-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                      <span className="text-xs font-medium tracking-wider">{t('products.card.zoomLabel')}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-300 dark:text-gray-700">
                  <span className="text-6xl mb-4 grayscale opacity-20">🖼️</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-0 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all opacity-100 md:opacity-0 group-hover:opacity-100 z-20 shadow-lg border border-white/10"
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all opacity-100 md:opacity-0 group-hover:opacity-100 z-20 shadow-lg border border-white/10"
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
            </button>

            <div className="absolute bottom-0 md:bottom-6 left-0 right-0 flex justify-center gap-2 z-20 pointer-events-none">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                  className={`transition-all duration-500 rounded-full h-1.5 shadow-sm pointer-events-auto ${currentIndex === idx
                    ? 'bg-blue-600 dark:bg-white w-6 md:w-8'
                    : 'bg-gray-400/50 dark:bg-white/20 w-1.5 hover:bg-gray-400 dark:hover:bg-white/40'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Image Viewer Portal */}
      <ImageViewer
        images={safeImages}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
      />
    </>
  );
};

export default Carousel;