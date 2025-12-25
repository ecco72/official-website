import React, { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  fullWidth?: boolean;
}

const FadeIn: React.FC<Props> = ({ 
  children, 
  className = "", 
  threshold = 0.1, 
  delay = 0,
  direction = 'up',
  duration = 0.8,
  fullWidth = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) observer.unobserve(domRef.current);
        }
      });
    }, { threshold });

    if (domRef.current) observer.observe(domRef.current);

    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, [threshold]);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return 'translateY(40px)';
        case 'down': return 'translateY(-40px)';
        case 'left': return 'translateX(40px)';
        case 'right': return 'translateX(-40px)';
        default: return 'none';
      }
    }
    return 'translate(0)';
  };

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transition: `opacity ${duration}s cubic-bezier(0.2, 0.8, 0.2, 1), transform ${duration}s cubic-bezier(0.2, 0.8, 0.2, 1)`,
    transitionDelay: `${delay}s`,
    willChange: 'opacity, transform',
  };

  return (
    <div
      ref={domRef}
      className={`${className} ${fullWidth ? 'w-full' : ''}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default FadeIn;