import React, { memo } from 'react';
import { Menu, X } from 'lucide-react';
import logoImg from '../../assets/logo.jpg';

interface HeaderProps {
  scrolled: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  toggleBooking: () => void;
}

export const Header = memo(({ 
  scrolled, 
  isMenuOpen, 
  setIsMenuOpen, 
  toggleBooking 
}: HeaderProps) => {
  return (
    <>
      <header className={`fixed top-12 left-0 right-0 z-40 transition-all duration-300 px-0 md:px-6 flex justify-center will-change-transform`}>
        <nav className={`flex items-center justify-between gap-6 w-full max-w-7xl mx-auto transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg rounded-none md:rounded-full py-3 px-6 border border-white/50' : 'py-4 px-6'}`}>
          <a href="#" className="flex items-center gap-2">
            <img src={logoImg} alt="The Cashmere Logo" className="w-10 h-10 rounded-xl object-cover shadow-glow-sm" />
            <span className="font-extrabold text-2xl tracking-tight text-brand-500 font-serif">The Cashmere</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-dark font-bold hover:text-brand-500 transition-colors duration-200">О технологии</a>
            <a href="#services" className="text-dark font-bold hover:text-brand-500 transition-colors duration-200">Прайс</a>
            <a href="#reviews" className="text-dark font-bold hover:text-brand-500 transition-colors duration-200">Отзывы</a>
            <a href="#locations" className="text-dark font-bold hover:text-brand-500 transition-colors duration-200">Контакты</a>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleBooking} className="hidden md:flex btn-primary px-8 py-3 rounded-full text-sm font-bold items-center justify-center">
              Записаться
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-dark">
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      
      <div className={`fixed top-0 right-0 h-screen w-full max-w-md bg-white z-[101] shadow-2xl p-8 pt-20 flex flex-col transition-transform duration-300 ease-out overflow-y-auto ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-dark hover:bg-brand-50 transition-colors duration-200">
          <X size={20}/>
        </button>
        
        <nav className="flex flex-col gap-3 pt-6">
          <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-dark hover:text-brand-500 transition-colors duration-200 py-2">О технологии</a>
          <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-dark hover:text-brand-500 transition-colors duration-200 py-2">Прайс лист</a>
          <a href="#reviews" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-dark hover:text-brand-500 transition-colors duration-200 py-2">Отзывы</a>
          <a href="#locations" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-dark hover:text-brand-500 transition-colors duration-200 py-2">Контакты</a>
        </nav>

        <div className="mt-auto pt-6">
          <button onClick={() => { setIsMenuOpen(false); toggleBooking(); }} className="w-full btn-primary py-4 rounded-2xl text-lg font-bold">
            Записаться онлайн
          </button>
        </div>
      </div>
    </>
  );
});

Header.displayName = 'Header';
