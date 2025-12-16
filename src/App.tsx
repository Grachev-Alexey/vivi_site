import React, { useState, useEffect, Suspense, useMemo, memo, useCallback, useRef } from 'react';
import { MapPin, Menu, Star, ArrowRight, Zap, X, Phone, Sparkles, Brain, Gift, Thermometer, User, Plus, BadgeCheck, Smile, Layers, Clock, Instagram, Send, ChevronUp, Users, FileText, Award } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { CITIES, SERVICES, REVIEWS, SPECIALISTS, FAQ_ITEMS } from './constants';
import { City } from './types';

import homeImg from './assets/home.webp';
import ozeroImg from './assets/ozero.webp';
import logoImg from './assets/logo.jpg';

const ChatWidget = React.lazy(() => import('./components/ChatWidget').then(module => ({ default: module.ChatWidget })));
const BookingModal = React.lazy(() => import('./components/BookingModal').then(module => ({ default: module.BookingModal })));

interface PageContentProps {
  selectedCity: City;
  toggleBooking: (serviceId?: string) => void;
  servicesByCategory: {
    sets: typeof SERVICES;
    body: typeof SERVICES;
    face: typeof SERVICES;
  };
}

const PageContent = memo(({ 
  selectedCity, 
  toggleBooking, 
  servicesByCategory
}: PageContentProps) => {
  // Move state that only affects PageContent inside
  const [activeCategory, setActiveCategory] = useState<'all' | 'sets' | 'face' | 'body'>('all');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  
  // Computed value - no need for useCallback since it's just a comparison
  const shouldShow = (cat: 'sets' | 'face' | 'body') => activeCategory === 'all' || activeCategory === cat;
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-48 pb-16 lg:pt-60 lg:pb-32 overflow-hidden contain-paint">
        {/* Static Background gradients (no animation for performance) */}
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-gradient-radial from-brand-100/40 to-transparent rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-[-10%] w-[350px] h-[350px] bg-gradient-radial from-purple-100/30 to-transparent rounded-full pointer-events-none"></div>

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
                    <button onClick={() => toggleBooking()} className="px-8 py-5 bg-brand-500 text-white rounded-2xl text-lg font-bold shadow-button hover:bg-brand-600 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 relative overflow-hidden group active:scale-95 duration-200">
                       <span className="relative z-10 flex items-center gap-2">Забрать подарок <Gift size={20} /></span>
                       <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                    <a href="#services" className="px-8 py-5 bg-white text-dark border border-gray-100 shadow-sm rounded-2xl text-lg font-bold hover:border-brand-200 hover:text-brand-600 transition-all active:scale-95 duration-200 flex items-center justify-center">
                       Прайс лист
                    </a>
                 </div>

                 {/* Trust Indicators */}
                 <div className="flex items-center gap-6 md:gap-8 flex-wrap animate-fade-in" style={{animationDelay: '0.2s'}}>
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
                      fetchpriority="high"
                    />
                    
                    {/* Floating Cards - static for performance */}
                    <div className="absolute top-12 -right-8 bg-white p-5 rounded-3xl shadow-card border border-gray-100">
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

      {/* Marquee Section */}
      <div className="bg-brand-50 border-y border-brand-100 overflow-hidden py-4 contain-paint">
        <div className="whitespace-nowrap animate-marquee flex gap-8 items-center text-brand-900 text-sm font-extrabold uppercase tracking-widest">
           {[...Array(2)].map((_, i) => (
             <React.Fragment key={i}>
                <span>БЕЗ БОЛИ</span>
                <span className="text-brand-300">•</span>
                <span>БЕЗОПАСНО</span>
                <span className="text-brand-300">•</span>
                <span>РЕЗУЛЬТАТ С 1 ПРОЦЕДУРЫ</span>
                <span className="text-brand-300">•</span>
                <span>МОЩНЫЙ ЛАЗЕР</span>
                <span className="text-brand-300">•</span>
                <span>СЕРТИФИЦИРОВАННЫЕ МАСТЕРА</span>
                <span className="text-brand-300">•</span>
             </React.Fragment>
           ))}
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-24 relative bg-gray-50/50">
         <div className="container mx-auto px-6 relative z-10">
           <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-8">
              <div>
                 <h2 className="text-4xl lg:text-5xl font-extrabold text-dark mb-4 tracking-tight">Прайс лист</h2>
                 <p className="text-gray-500 font-medium max-w-md">Выбирайте зоны или комплексы. Скидка 50% уже включена в стоимость первого посещения.</p>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex gap-2 p-1.5 bg-white border border-gray-100 rounded-2xl overflow-x-auto no-scrollbar max-w-full">
                  {(['all', 'sets', 'body', 'face'] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap ${
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

           <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start transition-all duration-500">
              
              {/* Left Column (Sets, Face, AI) */}
              {(shouldShow('sets') || shouldShow('face')) && (
                <div className={`space-y-8 ${activeCategory === 'sets' || activeCategory === 'face' ? 'lg:col-span-2' : ''}`}>
                   
                   {/* Sets Card */}
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
                                <div key={service.id} className="relative group bg-white border border-gray-100 p-6 rounded-[2rem] hover:border-brand-200 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden active:scale-[0.98]" onClick={() => toggleBooking(service.id)}>
                                    <div className="absolute inset-0 bg-brand-50/0 group-hover:bg-brand-50/30 transition-colors duration-300"></div>
                                    <div className="absolute top-0 left-0 w-1 h-full bg-brand-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    
                                    <div className="flex justify-between items-start mb-4 relative z-10">
                                        <div className="font-extrabold text-xl text-dark group-hover:text-brand-600 transition-colors">{service.name}</div>
                                        <div className="px-3 py-1 bg-brand-100 text-brand-700 rounded-lg text-xs font-bold uppercase tracking-wide">-50%</div>
                                    </div>
                                    <p className="text-gray-500 text-sm font-medium mb-6 relative z-10 leading-relaxed pr-8">{service.description}</p>
                                    
                                    <div className="flex items-end justify-between relative z-10">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-extrabold text-dark">{service.price} ₽</span>
                                            {service.fullPrice && <span className="text-lg text-gray-300 line-through font-bold">{service.fullPrice} ₽</span>}
                                        </div>
                                        <button className="w-10 h-10 rounded-full bg-dark text-white flex items-center justify-center group-hover:bg-brand-500 group-hover:scale-110 transition-all shadow-lg">
                                            <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                     </div>
                   )}

                   {/* Face Card */}
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
                                <div key={service.id} className="group p-5 rounded-[1.5rem] bg-gray-50 border border-transparent hover:bg-white hover:border-brand-100 hover:shadow-card-hover transition-all duration-200 cursor-pointer flex flex-col justify-between active:scale-95 active:bg-gray-100" onClick={() => toggleBooking(service.id)}>
                                    <div className="flex justify-between items-start gap-2 mb-3">
                                        <span className="font-bold text-dark text-[15px] leading-tight group-hover:text-brand-600 transition-colors">{service.name}</span>
                                        <div className="w-8 h-8 rounded-full bg-white text-gray-300 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-all shadow-sm shrink-0">
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

                   {/* AI Card */}
                   {activeCategory === 'all' && (
                     <div className="rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl bg-gradient-to-br from-brand-900 via-brand-800 to-purple-900 group active:scale-[0.99] transition-transform">
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
                              <button onClick={() => document.querySelector<HTMLElement>('.chat-widget-toggle')?.click()} className="px-6 py-3 rounded-xl bg-white text-brand-900 font-bold hover:bg-brand-50 transition-all flex items-center gap-2 shadow-lg active:scale-95">
                                 <Sparkles size={16} className="text-brand-500" /> Начать чат
                              </button>
                           </div>
                        </div>
                     </div>
                   )}
                </div>
              )}

              {/* Right Column (Body) */}
              {shouldShow('body') && (
                <div className={`space-y-8 ${activeCategory === 'body' ? 'lg:col-span-2' : ''}`}>
                   {/* Body Card */}
                   <div className="bg-white rounded-[2.5rem] p-8 shadow-card border border-white/50">
                      <div className="flex items-center gap-4 mb-8">
                          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shadow-sm">
                              <User size={24} />
                          </div>
                          <h3 className="text-2xl font-extrabold text-dark">Тело</h3>
                      </div>
                      
                      <div className={`grid sm:grid-cols-2 gap-4 ${activeCategory === 'body' ? 'lg:grid-cols-3 xl:grid-cols-4' : ''}`}>
                          {servicesByCategory.body.map((service: any) => (
                              <div key={service.id} className="group p-5 rounded-[1.5rem] bg-gray-50 border border-transparent hover:bg-white hover:border-brand-100 hover:shadow-card-hover transition-all duration-200 cursor-pointer flex flex-col justify-between active:scale-95 active:bg-gray-100" onClick={() => toggleBooking(service.id)}>
                                  <div className="flex justify-between items-start gap-2 mb-3">
                                      <span className="font-bold text-dark text-[15px] leading-tight group-hover:text-brand-600 transition-colors">{service.name}</span>
                                      <div className="w-8 h-8 rounded-full bg-white text-gray-300 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-all shadow-sm shrink-0">
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

      {/* Technology Section */}
      <section id="about" className="py-24 bg-gray-50/50">
         <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <div className="inline-block text-brand-600 font-bold tracking-widest text-xs uppercase mb-4 bg-brand-50 px-3 py-1 rounded-lg">Технология 2024</div>
               <h2 className="text-4xl lg:text-5xl font-extrabold text-dark mb-6">Pioneer Ozero Khanka</h2>
               <p className="text-gray-500 text-lg">Единственный в мире гибридный лазер, сочетающий мощность и комфорт.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
               {/* Main Card */}
               <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-card border border-white flex flex-col md:flex-row gap-10 items-center overflow-hidden relative group hover:shadow-card-hover transition-shadow duration-500">
                   <div className="flex-1 relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center mb-6">
                          <Zap size={32} />
                      </div>
                      <h3 className="text-3xl font-extrabold text-dark mb-4">Гибридная система 3-в-1</h3>
                      <p className="text-gray-500 font-medium leading-relaxed mb-8">
                         В отличие от обычных лазеров, Pioneer одновременно подает три длины волны (755/808/1064 нм). Это позволяет эффективно удалять волосы любого цвета на любой глубине.
                      </p>
                      <div className="flex gap-3">
                         <div className="px-4 py-2 rounded-lg bg-gray-100 text-xs font-bold text-gray-600 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">Александрит</div>
                         <div className="px-4 py-2 rounded-lg bg-gray-100 text-xs font-bold text-gray-600 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">Диод</div>
                         <div className="px-4 py-2 rounded-lg bg-gray-100 text-xs font-bold text-gray-600 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">Неодим</div>
                      </div>
                   </div>
                   <div className="w-full md:w-1/2 relative">
                      <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform md:rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500">
                         <img 
                            src={ozeroImg} 
                            className="w-full h-full object-cover" 
                            alt="Laser Machine" 
                            loading="lazy"
                         />
                      </div>
                   </div>
               </div>

               {/* Side Cards */}
               <div className="grid gap-6">
                  <div className="bg-dark text-white rounded-[2.5rem] p-8 shadow-card flex flex-col justify-center relative overflow-hidden group hover:shadow-glow-sm transition-shadow">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/15 rounded-full pointer-events-none"></div>
                      <Thermometer size={32} className="text-blue-400 mb-4" />
                      <h4 className="text-2xl font-bold mb-2">Cooling Tech™</h4>
                      <p className="text-gray-400 text-sm">Сапфировый наконечник охлаждается до -10°C, полностью блокируя боль.</p>
                      <div className="mt-6 text-3xl font-extrabold text-white group-hover:scale-110 origin-left transition-transform">-10°C</div>
                  </div>

                  <div className="bg-white rounded-[2.5rem] p-8 shadow-card border border-white flex flex-col justify-center group hover:border-brand-100 transition-colors hover:shadow-lg">
                      <Clock size={32} className="text-brand-500 mb-4" />
                      <h4 className="text-2xl font-bold text-dark mb-2">Скорость X2</h4>
                      <p className="text-gray-500 text-sm">Частота 10 импульсов в секунду (10 Гц) позволяет обработать всё тело за 45 минут.</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Specialists Section */}
      <section className="py-24 bg-brand-50/50">
         <div className="container mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-4xl lg:text-5xl font-extrabold text-dark mb-4">Наши эксперты</h2>
               <p className="text-gray-500 font-medium max-w-2xl mx-auto">Все процедуры проводят сертифицированные специалисты с медицинским образованием.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
               {SPECIALISTS.map((specialist) => (
                  <div key={specialist.id} className="bg-white p-6 rounded-[2rem] border border-white shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300">
                     <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden mb-6 bg-gray-100 relative group">
                        <img 
                          src={specialist.img} 
                          alt={specialist.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          loading="lazy"
                        />
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-brand-600 flex items-center gap-1 shadow-sm">
                           <BadgeCheck size={14} fill="currentColor" className="text-brand-500" /> Сертифицирован
                        </div>
                     </div>
                     <h3 className="text-xl font-bold text-dark mb-1">{specialist.name}</h3>
                     <p className="text-gray-400 text-sm font-medium">{specialist.role}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-6">
             <div className="flex flex-col lg:flex-row gap-16">
                 <div className="lg:w-1/3">
                    <div className="sticky top-32">
                       <h2 className="text-4xl font-extrabold text-dark mb-6">Частые вопросы</h2>
                       <p className="text-gray-500 text-lg leading-relaxed mb-8">
                          Мы собрали ответы на самые популярные вопросы, чтобы вы чувствовали себя уверенно.
                       </p>
                       <button onClick={() => toggleBooking()} className="px-8 py-4 bg-gray-50 text-dark rounded-xl font-bold hover:bg-brand-500 hover:text-white transition-all shadow-sm">
                          Задать свой вопрос
                       </button>
                    </div>
                 </div>
                 
                 <div className="lg:w-2/3 space-y-4">
                    {FAQ_ITEMS.map((item, index) => (
                       <div key={index} className="border-b border-gray-100 pb-4">
                          <button 
                             onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                             className="w-full py-6 flex items-center justify-between gap-4 text-left group"
                          >
                             <span className={`text-xl font-bold transition-colors ${activeFaq === index ? 'text-brand-500' : 'text-dark group-hover:text-brand-600'}`}>
                                {item.q}
                             </span>
                             <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${activeFaq === index ? 'bg-brand-500 text-white rotate-45' : 'bg-gray-50 text-dark group-hover:bg-brand-50'}`}>
                                <Plus size={20} />
                             </div>
                          </button>
                          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                             <p className="text-gray-500 leading-relaxed pb-6 text-lg">
                                {item.a}
                             </p>
                          </div>
                       </div>
                    ))}
                 </div>
             </div>
         </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 bg-dark relative overflow-hidden contain-paint">
         {/* Static gradient backgrounds for performance */}
         <div className="absolute inset-0 bg-gradient-to-br from-brand-900/30 via-transparent to-purple-900/20 pointer-events-none"></div>

         <div className="container mx-auto px-6 relative z-10">
             <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                <div>
                   <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Клиенты о ViVi</h2>
                   <div className="flex items-center gap-3">
                      <div className="flex text-yellow-400">
                         {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
                      </div>
                      <span className="text-white/60 font-bold">5.0 на Яндекс.Картах</span>
                   </div>
                </div>
                <button className="hidden md:block px-8 py-4 rounded-xl border border-white/20 text-white font-bold hover:bg-white hover:text-dark transition-all">
                   Читать все отзывы
                </button>
             </div>

             {/* Mobile: Horizontal Scroll (Snap), Desktop: Grid */}
             <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
                {REVIEWS.map(review => (
                   <div key={review.id} className="min-w-[85vw] md:min-w-0 snap-center glass-dark p-8 rounded-[2rem] border border-white/5 hover:border-white/20 transition-all group">
                      <div className="flex items-center justify-between mb-8">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                               {review.name.charAt(0)}
                            </div>
                            <div>
                               <div className="font-bold text-white leading-tight">{review.name}</div>
                               <div className="text-xs text-white/40">{review.date}</div>
                            </div>
                         </div>
                         <div className="flex gap-0.5 text-brand-500">
                             {[...Array(5)].map((_,i) => <Star key={i} size={12} fill="currentColor"/>)}
                         </div>
                      </div>
                      <p className="text-white/80 leading-relaxed mb-2 font-medium">"{review.text}"</p>
                   </div>
                ))}
             </div>
         </div>
      </section>

      {/* Location Section */}
      <section id="locations" className="py-24 relative">
         <div className="container mx-auto px-6">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white h-[600px] group">
               {/* Map Iframe */}
               <iframe 
                 width="100%" 
                 height="100%" 
                 frameBorder="0" 
                 scrolling="no" 
                 marginHeight={0} 
                 marginWidth={0} 
                 loading="lazy"
                 src={`https://yandex.ru/map-widget/v1/?ll=${selectedCity.coordinates?.lng}%2C${selectedCity.coordinates?.lat}&z=16&pt=${selectedCity.coordinates?.lng}%2C${selectedCity.coordinates?.lat},pm2rdm`}
                 className="absolute inset-0 w-full h-full grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
               ></iframe>
               
               {/* Overlay Card - Floating */}
               <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex justify-center items-end pointer-events-none">
                   <div className="bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white max-w-3xl w-full pointer-events-auto transform translate-y-0 transition-transform">
                      <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-6">
                        <div>
                             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase mb-4">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Открыто сейчас
                             </div>
                             <h3 className="text-2xl md:text-3xl font-extrabold text-dark mb-2">г. {selectedCity.name}</h3>
                             <p className="text-gray-500 font-medium flex items-center gap-2">
                                <MapPin size={18} className="text-brand-500"/> {selectedCity.address}
                             </p>
                        </div>
                        <div className="flex flex-col gap-3 w-full md:w-auto">
                            <a href={`tel:${selectedCity.phone}`} className="px-6 py-3 bg-white border-2 border-gray-100 text-dark rounded-xl font-bold hover:border-brand-200 hover:text-brand-600 transition flex items-center justify-center gap-2">
                                <Phone size={18} /> {selectedCity.phone}
                            </a>
                            <button onClick={() => toggleBooking()} className="px-6 py-3 bg-dark text-white rounded-xl font-bold hover:bg-brand-500 transition shadow-lg flex items-center justify-center gap-2">
                                Записаться <ArrowRight size={18} />
                            </button>
                        </div>
                      </div>
                   </div>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
         <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
               <div className="md:col-span-2">
                  <div className="flex items-center gap-2 mb-6">
                     <img src={logoImg} alt="ViVi Logo" className="w-8 h-8 rounded-lg object-cover" />
                     <span className="font-extrabold text-2xl text-dark">ViVi</span>
                  </div>
                  <p className="text-gray-500 leading-relaxed max-w-sm mb-8">
                     Федеральная сеть студий лазерной эпиляции. Мы делаем премиальные услуги доступными, сохраняя высочайшие стандарты качества и безопасности.
                  </p>
                  <div className="flex gap-4">
                     <a href="#" className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-dark hover:bg-brand-500 hover:text-white transition-all"><Instagram size={20}/></a>
                     <a href="#" className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-dark hover:bg-brand-500 hover:text-white transition-all"><Send size={20}/></a>
                  </div>
               </div>
               
               <div>
                  <h4 className="font-bold text-dark mb-6">Меню</h4>
                  <ul className="space-y-4 text-gray-500">
                     <li><a href="#about" className="hover:text-brand-500 transition">О технологии</a></li>
                     <li><a href="#services" className="hover:text-brand-500 transition">Прайс лист</a></li>
                     <li><a href="#reviews" className="hover:text-brand-500 transition">Отзывы</a></li>
                     <li><a href="#locations" className="hover:text-brand-500 transition">Контакты</a></li>
                  </ul>
               </div>

               <div>
                  <h4 className="font-bold text-dark mb-6">Документы</h4>
                  <ul className="space-y-4 text-gray-500">
                     <li><a href="#" className="hover:text-brand-500 transition">Политика конфиденциальности</a></li>
                     <li><a href="#" className="hover:text-brand-500 transition">Публичная оферта</a></li>
                     <li><a href="#" className="hover:text-brand-500 transition">Лицензии</a></li>
                  </ul>
               </div>
            </div>

            <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
               <p>© {new Date().getFullYear()} ViVi Laser Network.</p>
               <p>Made with ❤️ for beauty.</p>
            </div>
         </div>
      </footer>
    </>
  );
});

// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [showCityToast, setShowCityToast] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Refs to track previous values and avoid unnecessary re-renders
  const scrolledRef = useRef(false);
  const showScrollTopRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  // Optimized Scroll Handler - only updates state when values actually change
  useEffect(() => {
    const handleScroll = () => {
      if (rafIdRef.current !== null) return;
      
      rafIdRef.current = window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const isScrolled = scrollY > 10;
        const shouldShowScrollTop = scrollY > 500;
        
        // Only update state if values changed
        if (scrolledRef.current !== isScrolled) {
          scrolledRef.current = isScrolled;
          setScrolled(isScrolled);
        }
        
        if (showScrollTopRef.current !== shouldShowScrollTop) {
          showScrollTopRef.current = shouldShowScrollTop;
          setShowScrollTop(shouldShowScrollTop);
        }

        rafIdRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Automatic City Detection
  useEffect(() => {
    const savedCityId = localStorage.getItem('vivi_city_id');
    if (savedCityId) {
       const city = CITIES.find(c => c.id === savedCityId);
       if (city) {
          setSelectedCity(city);
          return;
       }
    }

    const detectCityByIP = async () => {
       try {
          const response = await fetch('https://ipapi.co/json/');
          if (!response.ok) return;
          const data = await response.json();
          const detectedCityName = data.city;

          if (detectedCityName) {
             const foundCity = CITIES.find(c => 
                c.detectionAliases?.some(alias => 
                   alias.toLowerCase() === detectedCityName.toLowerCase()
                )
             );
             if (foundCity) {
                setSelectedCity(foundCity);
                setShowCityToast(true);
             }
          }
       } catch (error) {
          console.error("Auto-detection failed");
       }
    };

    const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; 
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                let closestCity = CITIES[0];
                let minDistance = Infinity;

                CITIES.forEach(city => {
                    if (city.coordinates) {
                        const dist = getDistance(latitude, longitude, city.coordinates.lat, city.coordinates.lng);
                        if (dist < minDistance) {
                            minDistance = dist;
                            closestCity = city;
                        }
                    }
                });

                if (minDistance < 200) {
                    setSelectedCity(closestCity);
                    setShowCityToast(true);
                } else {
                    detectCityByIP();
                }
            },
            (error) => {
                detectCityByIP();
            }
        );
    } else {
        detectCityByIP();
    }
  }, []);

  const handleCityChange = useCallback((city: City) => {
     setSelectedCity(city);
     setIsMenuOpen(false);
     setShowCityToast(false);
     localStorage.setItem('vivi_city_id', city.id);
  }, []);

  const confirmAutoCity = useCallback(() => {
    setShowCityToast(false);
    localStorage.setItem('vivi_city_id', selectedCity.id);
  }, [selectedCity.id]);

  const requestCityChange = useCallback(() => {
    setShowCityToast(false);
    setIsMenuOpen(true);
  }, []);

  const toggleBooking = useCallback((serviceId?: string) => {
    if (serviceId && typeof serviceId === 'string') {
      setPreselectedServiceId(serviceId);
    } else {
      setPreselectedServiceId(null);
    }
    setIsBookingOpen(prev => !prev);
  }, []);

  const scrollToTop = useCallback(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Group services (Memoized to prevent recalc on every render)
  const servicesByCategory = useMemo(() => ({
    sets: SERVICES.filter(s => s.category === 'sets'),
    body: SERVICES.filter(s => s.category === 'body'),
    face: SERVICES.filter(s => s.category === 'face'),
  }), []);

  // SEO: Schema.org JSON-LD Generation
  const schemaData = useMemo(() => {
      const schema = {
        "@context": "https://schema.org",
        "@type": "BeautySalon",
        "name": `ViVi Лазерная эпиляция ${selectedCity.name}`,
        "image": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881",
        "@id": `https://vivi-laser.ru/${selectedCity.id}`,
        "url": "https://vivi-laser.ru",
        "telephone": selectedCity.phone,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": selectedCity.address,
          "addressLocality": selectedCity.name,
          "addressCountry": "RU"
        },
        "geo": selectedCity.coordinates ? {
          "@type": "GeoCoordinates",
          "latitude": selectedCity.coordinates.lat,
          "longitude": selectedCity.coordinates.lng
        } : undefined,
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "09:00",
          "closes": "21:00"
        },
        "priceRange": "$$",
        "serviceArea": {
            "@type": "City",
            "name": selectedCity.name
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Услуги лазерной эпиляции",
            "itemListElement": SERVICES.slice(0, 5).map(s => ({
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": s.name
                },
                "price": s.price,
                "priceCurrency": "RUB"
            }))
        }
      };
      return JSON.stringify(schema);
  }, [selectedCity]);

  return (
    <div className="min-h-screen font-sans antialiased pb-20 md:pb-0 relative overflow-x-hidden selection:bg-brand-100 selection:text-brand-900">
      
      {/* Dynamic SEO Helmet */}
      <Helmet>
        <title>Лазерная эпиляция {selectedCity.name} | Скидка -50% | Студия ViVi</title>
        <meta name="description" content={`Лазерная эпиляция в г. ${selectedCity.name}. Диодный лазер Pioneer Ozero Khanka, медицинская лицензия. Цены от 300р. Скидка 50% на первый визит. Запишитесь онлайн!`} />
        <meta property="og:title" content={`Лазерная эпиляция ${selectedCity.name} | ViVi`} />
        <meta property="og:description" content="Безупречно гладкая кожа без боли. Скидка 50% для новых клиентов!" />
        <script type="application/ld+json">{schemaData}</script>
        <link rel="canonical" href={`https://vivi-laser.ru/${selectedCity.id}`} />
      </Helmet>

      {/* Toast */}
      {showCityToast && (
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
                 <button onClick={confirmAutoCity} className="px-4 py-2 bg-brand-500 text-white rounded-xl text-xs font-bold hover:bg-brand-600 transition shadow-button">Да, верно</button>
                 <button onClick={requestCityChange} className="px-4 py-2 bg-white text-dark border border-gray-100 rounded-xl text-xs font-bold hover:bg-gray-50 transition">Изменить</button>
              </div>
           </div>
        </div>
      )}

      {/* FOMO Banner */}
      <div className="bg-gradient-to-r from-brand-600 via-brand-500 to-brand-600 text-white text-xs md:text-sm font-bold py-3 text-center px-4 shadow-lg relative z-50">
        <div className="container mx-auto flex justify-center items-center gap-2 flex-wrap">
           <div className="flex items-center gap-2 animate-pulse-fast">
              <Gift size={16} />
              <span className="uppercase tracking-wide">Скидка 50% + ЗОНА В ПОДАРОК</span>
           </div>
           <span className="opacity-80 hidden md:inline">— только для новых клиентов в г. {selectedCity.name}</span>
           <button onClick={() => toggleBooking()} className="bg-white text-brand-600 px-4 py-1 rounded-full text-xs font-extrabold hover:bg-brand-50 transition shadow-sm ml-2 transform hover:scale-105 duration-200">
              ЗАБРАТЬ
           </button>
        </div>
      </div>

      {/* Navbar */}
      <header className={`fixed top-12 left-0 right-0 z-40 transition-all duration-500 px-0 md:px-6 flex justify-center`}>
        <nav className={`w-full max-w-[1400px] md:rounded-3xl px-6 py-4 flex justify-between items-center transition-all duration-300 border ${scrolled ? 'glass border-white/40 shadow-card' : 'bg-transparent border-transparent'}`}>
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="ViVi Logo" className="w-10 h-10 rounded-xl object-cover shadow-glow-sm" />
            <span className="font-extrabold text-2xl tracking-tight text-dark">ViVi.</span>
          </div>

          <div className="hidden lg:flex items-center gap-1 text-sm font-bold text-gray-500 bg-white/50 p-1.5 rounded-2xl border border-white/50 backdrop-blur-sm">
            <a href="#about" className="px-5 py-2.5 rounded-xl hover:bg-white hover:text-brand-600 hover:shadow-sm transition-all duration-300">О технологии</a>
            <a href="#services" className="px-5 py-2.5 rounded-xl hover:bg-white hover:text-brand-600 hover:shadow-sm transition-all duration-300">Прайс -50%</a>
            <a href="#reviews" className="px-5 py-2.5 rounded-xl hover:bg-white hover:text-brand-600 hover:shadow-sm transition-all duration-300">Отзывы</a>
            <a href="#locations" className="px-5 py-2.5 rounded-xl hover:bg-white hover:text-brand-600 hover:shadow-sm transition-all duration-300">Студии</a>
          </div>

          <div className="flex items-center gap-3">
             <div className="relative group hidden xl:block">
               <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/80 border border-white px-4 py-3 rounded-xl hover:bg-white hover:shadow-md transition text-dark">
                 <MapPin size={14} className="text-brand-500" />
                 {selectedCity.name}
               </button>
               <div className="absolute top-full right-0 pt-4 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform translate-y-2 group-hover:translate-y-0">
                  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-3 max-h-[400px] overflow-y-auto">
                     {CITIES.map(city => (
                        <button key={city.id} onClick={() => handleCityChange(city)} className="w-full text-left px-4 py-3 text-sm font-bold hover:bg-brand-50 hover:text-brand-600 rounded-xl transition flex items-center justify-between group/item">
                           {city.name}
                           <ArrowRight size={14} className="opacity-0 group-hover/item:opacity-100 transition-opacity transform -translate-x-2 group-hover/item:translate-x-0" />
                        </button>
                     ))}
                  </div>
               </div>
             </div>

             <a href={`tel:${selectedCity.phone}`} className="hidden md:flex w-12 h-12 rounded-xl bg-white border border-gray-100 items-center justify-center text-dark hover:text-brand-500 hover:border-brand-200 hover:shadow-md transition">
               <Phone size={20} />
             </a>

             <button onClick={() => toggleBooking()} className="hidden md:flex bg-dark text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-brand-500 hover:shadow-button hover:-translate-y-1 transition-all duration-300">
               Записаться
             </button>

             <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 text-dark bg-white/80 rounded-xl">
               <Menu size={24} />
             </button>
          </div>
        </nav>
      </header>

      {/* Render Memoized Page Content */}
      <PageContent 
        selectedCity={selectedCity}
        toggleBooking={toggleBooking}
        servicesByCategory={servicesByCategory}
      />

      {/* Sticky Bottom Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-2xl border-t border-gray-100 md:hidden z-40 flex gap-3 shadow-[0_-5px_30px_rgba(0,0,0,0.1)] pb-8 pt-4">
         <a href={`tel:${selectedCity.phone}`} className="flex-1 py-4 bg-gray-100 rounded-2xl text-dark font-extrabold text-center flex items-center justify-center gap-2 active:scale-95 transition">
            <Phone size={20} />
         </a>
         <button onClick={() => toggleBooking()} className="flex-[3] py-4 bg-brand-500 text-white rounded-2xl font-extrabold text-center shadow-button active:scale-95 transition flex items-center justify-center gap-2 text-lg">
            Записаться
         </button>
      </div>
      
      {/* Scroll To Top Button */}
      <button 
         onClick={scrollToTop}
         className={`fixed bottom-24 right-6 z-40 bg-white text-dark p-4 rounded-full shadow-button hover:bg-gray-100 transition-all duration-300 active:scale-95 border border-gray-100 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}
      >
         <ChevronUp size={24} />
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
         <div className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-xl flex flex-col animate-fade-in overflow-y-auto">
            <div className="p-6 flex justify-between items-center border-b border-gray-100/50">
               <span className="font-extrabold text-2xl text-dark">ViVi.</span>
               <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"><X size={24}/></button>
            </div>
            <div className="p-8 flex flex-col gap-6 text-3xl font-extrabold text-dark border-b border-gray-100/50 pb-8">
               <a href="#services" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-500 transition-colors">Услуги</a>
               <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-500 transition-colors">Технология</a>
               <a href="#reviews" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-500 transition-colors">Отзывы</a>
               <a href="#locations" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-500 transition-colors">Контакты</a>
            </div>
            
            <div className="p-8">
               <p className="text-sm font-bold text-gray-400 uppercase mb-6 tracking-wider">Выберите ваш город</p>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CITIES.map(c => (
                     <button 
                        key={c.id} 
                        onClick={() => handleCityChange(c)}
                        className={`text-left px-5 py-4 rounded-2xl font-bold text-sm transition flex items-center justify-between ${selectedCity.id === c.id ? 'bg-brand-500 text-white shadow-button' : 'bg-gray-50 text-dark hover:bg-gray-100'}`}
                     >
                        {c.name}
                        {selectedCity.id === c.id && <BadgeCheck size={18} />}
                     </button>
                  ))}
               </div>
            </div>
         </div>
      )}

      {/* Modals are wrapped in Suspense for lazy loading */}
      <Suspense fallback={null}>
          <ChatWidget />
          <BookingModal 
            isOpen={isBookingOpen} 
            onClose={() => setIsBookingOpen(false)} 
            initialCity={selectedCity} 
            preselectedServiceId={preselectedServiceId}
          />
      </Suspense>
    </div>
  );
};

export default App;