import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const ImageViewer: React.FC<Props> = ({ images, currentIndex, isOpen, onClose, onIndexChange }) => {
  // Touch handling state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev(e);
      if (e.key === 'ArrowRight') handleNext(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, currentIndex]); // Add currentIndex dependency

  const handlePrev = (e?: React.MouseEvent | KeyboardEvent) => {
    e?.stopPropagation();
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    onIndexChange(newIndex);
  };

  const handleNext = (e?: React.MouseEvent | KeyboardEvent) => {
    e?.stopPropagation();
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    onIndexChange(newIndex);
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

  if (!isOpen || images.length === 0) return null;

  const currentSrc = images[currentIndex];

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 transition-opacity duration-300 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Close Button */}
      <button 
        className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/10"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Navigation Buttons (Only if more than 1 image) */}
      {images.length > 1 && (
        <>
          <button 
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/10"
            onClick={handlePrev}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          
          <button 
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/10"
            onClick={handleNext}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </>
      )}

      {/* Counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 font-mono text-sm tracking-widest bg-black/50 px-4 py-1 rounded-full border border-white/10">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Image Container */}
      <div 
        className="relative w-full h-full flex items-center justify-center p-4 md:p-20"
      >
        <img
          key={currentIndex} // Force re-render for animation if needed, or remove for smoother replacement
          src={currentSrc}
          alt={`Full view ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain shadow-2xl select-none"
          draggable={false}
          onClick={(e) => e.stopPropagation()} 
        />
      </div>
    </div>,
    document.body
  );
};

export default ImageViewer;