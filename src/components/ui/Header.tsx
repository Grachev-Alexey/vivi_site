import React, { memo } from 'react';
import { Menu, MapPin, X } from 'lucide-react';
import { CITIES } from '../../constants';
import { City } from '../../types';
import logoImg from '../../assets/logo.jpg';

interface HeaderProps {
  scrolled: boolean;
  selectedCity: City;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  handleCityChange: (city: City) => void;
  toggleBooking: () => void;
}

export const Header = memo(({ 
  scrolled, 
  selectedCity, 
  isMenuOpen, 
  setIsMenuOpen, 
  handleCityChange,
  toggleBooking 
}: HeaderProps) => {
  return (
    <header className={`fixed top-12 left-0 right-0 z-40 transition-all duration-300 px-0 md:px-6 flex justify-center will-change-transform`}>
      <nav className={`flex items-center justify-between gap-6 w-full max-w-7xl mx-auto transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg rounded-none md:rounded-full py-3 px-6 border border-white/50' : 'py-4 px-6'}`}>
        <a href="#" className="flex items-center gap-2">
          <img src={logoImg} alt="ViVi Logo" className="w-10 h-10 rounded-xl object-cover shadow-glow-sm" />
          <span className="font-extrabold text-2xl tracking-tight text-brand-500 font-serif">ViVi</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-dark font-bold hover:text-brand-500 transition-colors duration-200">О технологии</a>
          <a href="#services" className="text-dark font-bold hover:text-brand-500 transition-colors duration-200">Прайс</a>
          <a href="#reviews" className="text-dark font-bold hover:text-brand-500 transition-colors duration-200">Отзывы</a>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setIsMenuOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-xs font-bold text-dark hover:bg-brand-50 hover:text-brand-600 transition-colors duration-200">
            <MapPin size={14} className="text-brand-500" />
            <span className="hidden sm:inline">{selectedCity.name}</span>
          </button>
          <button onClick={toggleBooking} className="hidden md:flex btn-primary px-6 py-3 rounded-full text-sm font-bold items-center justify-center">
            Записаться
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-dark">
            <Menu size={20} />
          </button>
        </div>
      </nav>

      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      />
      
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl p-8 pt-24 flex flex-col transition-transform duration-300 ease-out will-change-transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-dark hover:bg-brand-50 transition-colors duration-200">
          <X size={20}/>
        </button>
        
        <div className="mb-10">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-4">Выберите город</p>
          <div className="flex flex-wrap gap-2">
            {CITIES.map(city => (
              <button 
                key={city.id} 
                onClick={() => handleCityChange(city)} 
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors duration-200 ${city.id === selectedCity.id ? 'bg-brand-500 text-white' : 'bg-gray-50 text-dark hover:bg-brand-50'}`}
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>

        <nav className="flex flex-col gap-4 border-t border-gray-100 pt-8">
          <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-dark hover:text-brand-500 transition-colors duration-200 py-2">О технологии</a>
          <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-dark hover:text-brand-500 transition-colors duration-200 py-2">Прайс лист</a>
          <a href="#reviews" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-dark hover:text-brand-500 transition-colors duration-200 py-2">Отзывы</a>
          <a href="#locations" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-dark hover:text-brand-500 transition-colors duration-200 py-2">Контакты</a>
        </nav>

        <div className="mt-auto">
          <button onClick={() => { setIsMenuOpen(false); toggleBooking(); }} className="w-full btn-primary py-4 rounded-2xl text-lg font-bold">
            Записаться онлайн
          </button>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
