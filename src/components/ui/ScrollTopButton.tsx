import React, { memo } from 'react';
import { ChevronUp } from 'lucide-react';

interface ScrollTopButtonProps {
  show: boolean;
  onClick: () => void;
}

export const ScrollTopButton = memo(({ show, onClick }: ScrollTopButtonProps) => {
  return (
    <button 
      onClick={onClick} 
      className={`fixed bottom-24 md:bottom-10 right-6 z-40 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-dark hover:bg-brand-500 hover:text-white transition-all duration-300 will-change-transform ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      aria-label="Scroll to top"
    >
      <ChevronUp size={24} />
    </button>
  );
});

ScrollTopButton.displayName = 'ScrollTopButton';
