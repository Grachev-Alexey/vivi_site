import React, { memo } from 'react';
import { BadgeCheck } from 'lucide-react';
import { SPECIALISTS } from '../../constants';

export const SpecialistsSection = memo(() => {
  return (
    <section className="py-24 bg-white contain-layout">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-dark mb-6">Наши мастера</h2>
          <p className="text-gray-500 text-lg">Сертифицированные специалисты с медицинским образованием и опытом работы от 5 лет.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SPECIALISTS.map((specialist) => (
            <div key={specialist.id} className="bg-white p-6 rounded-[2rem] border border-white shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-200 will-change-transform">
              <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden mb-6 bg-gray-100 relative group">
                <img 
                  src={specialist.img} 
                  alt={specialist.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 will-change-transform" 
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
  );
});

SpecialistsSection.displayName = 'SpecialistsSection';
