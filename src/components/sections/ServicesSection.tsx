import React, { memo, useState, useCallback } from 'react';
import { Layers, Smile, User, ArrowRight, Plus, Brain, Sparkles } from 'lucide-react';
import { SERVICES } from '../../constants';

interface ServicesSectionProps {
  toggleBooking: (serviceId?: string) => void;
  servicesByCategory: {
    sets: typeof SERVICES;
    body: typeof SERVICES;
    face: typeof SERVICES;
  };
}

export const ServicesSection = memo(({ toggleBooking, servicesByCategory }: ServicesSectionProps) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'sets' | 'face' | 'body'>('all');

  const shouldShow = useCallback((cat: 'sets' | 'face' | 'body') => {
    return activeCategory === 'all' || activeCategory === cat;
  }, [activeCategory]);

  const handleCategoryChange = useCallback((cat: 'all' | 'sets' | 'face' | 'body') => {
    setActiveCategory(cat);
  }, []);

  return (
    <section id="services" className="py-24 relative bg-gray-50/50 contain-layout">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-8">
          <div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-dark mb-4 tracking-tight">Прайс лист</h2>
            <p className="text-gray-500 font-medium max-w-md">Выбирайте зоны или комплексы. Скидка 50% уже включена в стоимость первого посещения.</p>
          </div>

          <div className="flex gap-2 p-1.5 bg-white border border-gray-100 rounded-2xl overflow-x-auto no-scrollbar max-w-full">
            {(['all', 'sets', 'body', 'face'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-colors duration-200 whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-brand-500 text-white shadow-button' 
                    : 'bg-transparent text-gray-500 hover:bg-white hover:text-dark'
                }`}
              >
                {cat === 'all' && 'Все услуги'}
                {cat === 'sets' && 'Комплексы'}
                {cat === 'body' && 'Тело'}
                {cat === 'face' && 'Лицо'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {(shouldShow('sets') || shouldShow('face')) && (
            <div className={`space-y-8 ${activeCategory === 'sets' || activeCategory === 'face' ? 'lg:col-span-2' : ''}`}>
              
              {shouldShow('sets') && (
                <div className="bg-white rounded-[2.5rem] p-8 shadow-card border border-white/50 relative overflow-hidden">
                  <div className="flex items-center gap-4 mb-8 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center shadow-sm">
                      <Layers size={24} />
                    </div>
                    <h3 className="text-2xl font-extrabold text-dark">Выгодные комплексы</h3>
                  </div>
                  
                  <div className={`grid gap-4 relative z-10 ${activeCategory === 'sets' ? 'md:grid-cols-2 lg:grid-cols-3' : ''}`}>
                    {servicesByCategory.sets.map((service: any) => (
                      <div 
                        key={service.id} 
                        className="service-card relative group bg-white border border-gray-100 p-6 rounded-[2rem] cursor-pointer overflow-hidden" 
                        onClick={() => toggleBooking(service.id)}
                      >
                        <div className="absolute inset-0 bg-brand-50/0 group-hover:bg-brand-50/30 transition-colors duration-200"></div>
                        <div className="absolute top-0 left-0 w-1 h-full bg-brand-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        
                        <div className="flex justify-between items-start mb-4 relative z-10">
                          <div className="font-extrabold text-xl text-dark group-hover:text-brand-600 transition-colors duration-200">{service.name}</div>
                          <div className="px-3 py-1 bg-brand-100 text-brand-700 rounded-lg text-xs font-bold uppercase tracking-wide">-50%</div>
                        </div>
                        <p className="text-gray-500 text-sm font-medium mb-6 relative z-10 leading-relaxed pr-8">{service.description}</p>
                        
                        <div className="flex items-end justify-between relative z-10">
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-extrabold text-dark">{service.price} ₽</span>
                            {service.fullPrice && <span className="text-lg text-gray-300 line-through font-bold">{service.fullPrice} ₽</span>}
                          </div>
                          <button className="w-10 h-10 rounded-full bg-dark text-white flex items-center justify-center group-hover:bg-brand-500 group-hover:scale-110 transition-all duration-200 shadow-lg">
                            <ArrowRight size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {shouldShow('face') && (
                <div className="bg-white rounded-[2.5rem] p-8 shadow-card border border-white/50">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center shadow-sm">
                      <Smile size={24} />
                    </div>
                    <h3 className="text-2xl font-extrabold text-dark">Лицо</h3>
                  </div>
                  <div className={`grid sm:grid-cols-2 gap-4 ${activeCategory === 'face' ? 'lg:grid-cols-3 xl:grid-cols-4' : ''}`}>
                    {servicesByCategory.face.map((service: any) => (
                      <div 
                        key={service.id} 
                        className="service-card-small group p-5 rounded-[1.5rem] bg-gray-50 border border-transparent cursor-pointer flex flex-col justify-between" 
                        onClick={() => toggleBooking(service.id)}
                      >
                        <div className="flex justify-between items-start gap-2 mb-3">
                          <span className="font-bold text-dark text-[15px] leading-tight group-hover:text-brand-600 transition-colors duration-200">{service.name}</span>
                          <div className="w-8 h-8 rounded-full bg-white text-gray-300 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-all duration-200 shadow-sm shrink-0">
                            <Plus size={16} />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-auto">
                          <span className="font-extrabold text-lg text-dark">{service.price} ₽</span>
                          {service.fullPrice && <span className="text-xs text-gray-400 line-through font-bold">{service.fullPrice}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeCategory === 'all' && (
                <div className="rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl bg-gradient-to-br from-brand-900 via-brand-800 to-purple-900 group">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/20 rounded-full pointer-events-none"></div>
                  <div className="relative z-10 flex flex-col items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 shrink-0 mb-2">
                      <Brain size={28} className="text-brand-200" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">AI Помощник</h3>
                      <p className="text-white/80 text-sm leading-relaxed mb-6 font-medium max-w-sm">
                        Не знаете, с чего начать? Наш AI-консультант подберет идеальный курс процедур за 30 секунд.
                      </p>
                      <button 
                        onClick={() => document.querySelector<HTMLElement>('.chat-widget-toggle')?.click()} 
                        className="px-6 py-3 rounded-xl bg-white text-brand-900 font-bold hover:bg-brand-50 transition-colors duration-200 flex items-center gap-2 shadow-lg active:scale-95"
                      >
                        <Sparkles size={16} className="text-brand-500" /> Начать чат
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {shouldShow('body') && (
            <div className={`space-y-8 ${activeCategory === 'body' ? 'lg:col-span-2' : ''}`}>
              <div className="bg-white rounded-[2.5rem] p-8 shadow-card border border-white/50">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shadow-sm">
                    <User size={24} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-dark">Тело</h3>
                </div>
                
                <div className={`grid sm:grid-cols-2 gap-4 ${activeCategory === 'body' ? 'lg:grid-cols-3 xl:grid-cols-4' : ''}`}>
                  {servicesByCategory.body.map((service: any) => (
                    <div 
                      key={service.id} 
                      className="service-card-small group p-5 rounded-[1.5rem] bg-gray-50 border border-transparent cursor-pointer flex flex-col justify-between" 
                      onClick={() => toggleBooking(service.id)}
                    >
                      <div className="flex justify-between items-start gap-2 mb-3">
                        <span className="font-bold text-dark text-[15px] leading-tight group-hover:text-brand-600 transition-colors duration-200">{service.name}</span>
                        <div className="w-8 h-8 rounded-full bg-white text-gray-300 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-all duration-200 shadow-sm shrink-0">
                          <Plus size={16} />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-auto">
                        <span className="font-extrabold text-lg text-dark">{service.price} ₽</span>
                        {service.fullPrice && <span className="text-xs text-gray-400 line-through font-bold">{service.fullPrice}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

ServicesSection.displayName = 'ServicesSection';
