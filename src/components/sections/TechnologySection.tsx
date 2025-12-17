import React, { memo } from 'react';
import { Zap, Thermometer, Clock } from 'lucide-react';
import ozeroImg from '../../assets/ozero.webp';

export const TechnologySection = memo(() => {
  return (
    <section id="about" className="py-24 bg-gray-50/50 contain-layout">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block text-brand-600 font-bold tracking-widest text-xs uppercase mb-4 bg-brand-50 px-3 py-1 rounded-lg">Технология 2024</div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-dark mb-6">Pioneer Ozero Khanka</h2>
          <p className="text-gray-500 text-lg">Единственный в мире гибридный лазер, сочетающий мощность и комфорт.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-card border border-white flex flex-col md:flex-row gap-10 items-center overflow-hidden relative group hover:shadow-card-hover transition-shadow duration-300">
            <div className="flex-1 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center mb-6">
                <Zap size={32} />
              </div>
              <h3 className="text-3xl font-extrabold text-dark mb-4">Гибридная система 3-в-1</h3>
              <p className="text-gray-500 font-medium leading-relaxed mb-8">
                В отличие от обычных лазеров, Pioneer одновременно подает три длины волны (755/808/1064 нм). Это позволяет эффективно удалять волосы любого цвета на любой глубине.
              </p>
              <div className="flex gap-3">
                <div className="px-4 py-2 rounded-lg bg-gray-100 text-xs font-bold text-gray-600 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors duration-200">Александрит</div>
                <div className="px-4 py-2 rounded-lg bg-gray-100 text-xs font-bold text-gray-600 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors duration-200">Диод</div>
                <div className="px-4 py-2 rounded-lg bg-gray-100 text-xs font-bold text-gray-600 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors duration-200">Неодим</div>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform md:rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-transform duration-300 will-change-transform">
                <img 
                  src={ozeroImg} 
                  className="w-full h-full object-cover" 
                  alt="Laser Machine" 
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="bg-dark text-white rounded-[2.5rem] p-8 shadow-card flex flex-col justify-center relative overflow-hidden group hover:shadow-glow-sm transition-shadow duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/15 rounded-full pointer-events-none"></div>
              <Thermometer size={32} className="text-blue-400 mb-4" />
              <h4 className="text-2xl font-bold mb-2">Cooling Tech™</h4>
              <p className="text-gray-400 text-sm">Сапфировый наконечник охлаждается до -10°C, полностью блокируя боль.</p>
              <div className="mt-6 text-3xl font-extrabold text-white group-hover:scale-110 origin-left transition-transform duration-200">-10°C</div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 shadow-card border border-white flex flex-col justify-center group hover:border-brand-100 transition-colors duration-200 hover:shadow-lg">
              <Clock size={32} className="text-brand-500 mb-4" />
              <h4 className="text-2xl font-bold text-dark mb-2">Экспресс-процедуры</h4>
              <p className="text-gray-500 text-sm">Полная эпиляция ног за 15 минут, подмышек — за 5 минут благодаря увеличенному пятну.</p>
              <div className="mt-6 text-3xl font-extrabold text-brand-500 group-hover:scale-110 origin-left transition-transform duration-200">5 мин</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

TechnologySection.displayName = 'TechnologySection';
