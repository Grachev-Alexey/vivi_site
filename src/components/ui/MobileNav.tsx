import React, { memo } from 'react';
import { Home, Sparkles, Star, Phone } from 'lucide-react';

export const MobileNav = memo(() => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/90 backdrop-blur-xl border-t border-gray-100 py-3 px-6">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <a href="#" className="flex flex-col items-center gap-1 text-brand-500">
          <Home size={22} />
          <span className="text-[10px] font-bold">Главная</span>
        </a>
        <a href="#services" className="flex flex-col items-center gap-1 text-gray-400 hover:text-brand-500 transition-colors duration-200">
          <Sparkles size={22} />
          <span className="text-[10px] font-bold">Услуги</span>
        </a>
        <a href="#reviews" className="flex flex-col items-center gap-1 text-gray-400 hover:text-brand-500 transition-colors duration-200">
          <Star size={22} />
          <span className="text-[10px] font-bold">Отзывы</span>
        </a>
        <a href="#locations" className="flex flex-col items-center gap-1 text-gray-400 hover:text-brand-500 transition-colors duration-200">
          <Phone size={22} />
          <span className="text-[10px] font-bold">Контакты</span>
        </a>
      </div>
    </nav>
  );
});

MobileNav.displayName = 'MobileNav';
