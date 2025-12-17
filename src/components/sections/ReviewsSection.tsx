import React, { memo } from 'react';
import { Star } from 'lucide-react';
import { REVIEWS } from '../../constants';

export const ReviewsSection = memo(() => {
  return (
    <section id="reviews" className="py-24 bg-dark relative overflow-hidden contain-layout">
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
          <button className="hidden md:block px-8 py-4 rounded-xl border border-white/20 text-white font-bold hover:bg-white hover:text-dark transition-colors duration-200">
            Читать все отзывы
          </button>
        </div>

        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
          {REVIEWS.map(review => (
            <div key={review.id} className="min-w-[85vw] md:min-w-0 snap-center glass-dark p-8 rounded-[2rem] border border-white/5 hover:border-white/20 transition-colors duration-200 group">
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
  );
});

ReviewsSection.displayName = 'ReviewsSection';
