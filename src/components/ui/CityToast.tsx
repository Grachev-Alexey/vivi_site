import React, { memo } from 'react';
import { MapPin } from 'lucide-react';
import { City } from '../../types';

interface CityToastProps {
  show: boolean;
  selectedCity: City;
  onConfirm: () => void;
  onRequestChange: () => void;
}

export const CityToast = memo(({ show, selectedCity, onConfirm, onRequestChange }: CityToastProps) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-20 md:bottom-10 left-4 md:left-10 z-[100] animate-slide-up">
      <div className="glass border border-white/50 shadow-glow p-5 rounded-3xl max-w-sm flex flex-col gap-3 backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
            <MapPin size={20} />
          </div>
          <div>
            <h4 className="font-bold text-dark leading-tight">Ваш город — {selectedCity.name}?</h4>
            <p className="text-xs text-gray-500 mt-1">Мы определили ваше местоположение.</p>
          </div>
        </div>
        <div className="flex gap-2 pl-12">
          <button onClick={onConfirm} className="px-4 py-2 bg-brand-500 text-white rounded-xl text-xs font-bold hover:bg-brand-600 transition-colors duration-200 shadow-button">Да, верно</button>
          <button onClick={onRequestChange} className="px-4 py-2 bg-white text-dark border border-gray-100 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors duration-200">Изменить</button>
        </div>
      </div>
    </div>
  );
});

CityToast.displayName = 'CityToast';
