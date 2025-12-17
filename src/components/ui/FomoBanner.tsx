import React, { memo } from 'react';
import { Gift } from 'lucide-react';
import { City } from '../../types';

interface FomoBannerProps {
  selectedCity: City;
  toggleBooking: () => void;
}

export const FomoBanner = memo(({ selectedCity, toggleBooking }: FomoBannerProps) => {
  return (
    <div className="bg-gradient-to-r from-brand-600 via-brand-500 to-brand-600 text-white text-xs md:text-sm font-bold py-3 text-center px-4 shadow-lg relative z-50">
      <div className="container mx-auto flex justify-center items-center gap-2 flex-wrap">
        <div className="flex items-center gap-2 animate-pulse-fast">
          <Gift size={16} />
          <span className="uppercase tracking-wide">Скидка 50% + ЗОНА В ПОДАРОК</span>
        </div>
        <span className="opacity-80 hidden md:inline">— только для новых клиентов в г. {selectedCity.name}</span>
        <button 
          onClick={toggleBooking} 
          className="bg-white text-brand-600 px-4 py-1 rounded-full text-xs font-extrabold hover:bg-brand-50 transition-colors duration-200 shadow-sm ml-2 active:scale-95"
        >
          ЗАБРАТЬ
        </button>
      </div>
    </div>
  );
});

FomoBanner.displayName = 'FomoBanner';
