import React, { memo } from 'react';
import { Zap, Gift, Thermometer, Award, FileText, Users } from 'lucide-react';
import { City } from '../../types';
import homeImg from '../../assets/home.webp';

interface HeroSectionProps {
  selectedCity: City;
  toggleBooking: () => void;
}

export const HeroSection = memo(({ selectedCity, toggleBooking }: HeroSectionProps) => {
  return (
    <section className="relative pt-48 pb-16 lg:pt-60 lg:pb-32 overflow-hidden contain-layout">
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-gradient-radial from-brand-100/40 to-transparent rounded-full pointer-events-none will-change-transform"></div>
      <div className="absolute bottom-0 left-[-10%] w-[350px] h-[350px] bg-gradient-radial from-purple-100/30 to-transparent rounded-full pointer-events-none will-change-transform"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 lg:pr-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 shadow-sm text-brand-600 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
              <Zap size={14} fill="currentColor" />
              Pioneer Ozero Khanka 2024
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-dark leading-[1.05] mb-8 tracking-tight">
              Гладкая кожа <br/>
              <span className="text-gradient">без компромиссов.</span>
            </h1>

            <p className="text-lg text-gray-500 font-medium leading-relaxed mb-10 max-w-lg">
              Премиальная лазерная эпиляция в {selectedCity.name}. <br/>
              <span className="text-dark font-bold bg-brand-50 px-2 py-0.5 rounded-md">Скидка 50%</span> на первый визит + <span className="text-brand-500 font-bold">вторая зона в подарок!</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button onClick={toggleBooking} className="btn-primary px-8 py-5 rounded-2xl text-lg font-bold flex items-center justify-center gap-3">
                <span className="relative z-10 flex items-center gap-2">Забрать подарок <Gift size={20} /></span>
              </button>
              <a href="#services" className="btn-secondary px-8 py-5 rounded-2xl text-lg font-bold flex items-center justify-center">
                Прайс лист
              </a>
            </div>

            <div className="flex items-center gap-6 md:gap-8 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center">
                  <Award size={20} />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-dark">5.0 / 5</div>
                  <div className="text-xs text-gray-400 font-bold">Яндекс.Карты</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-dark">Лицензия</div>
                  <div className="text-xs text-gray-400 font-bold">Медицинская</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center">
                  <Users size={20} />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-dark">15 000+</div>
                  <div className="text-xs text-gray-400 font-bold">Клиентов сети</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative mt-12 lg:mt-0">
            <div className="relative z-10 aspect-[4/5]">
              <img 
                src={homeImg} 
                className="w-full h-full object-cover rounded-[3rem] shadow-xl border-8 border-white" 
                alt="Лазерная эпиляция" 
                loading="eager"
              />
              
              <div className="absolute top-12 -right-8 bg-white p-5 rounded-3xl shadow-card border border-gray-100 floating-card">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
                    <Thermometer size={24} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase">Охлаждение</div>
                    <div className="text-xl font-extrabold text-dark">-10°C</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
