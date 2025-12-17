import React, { memo } from 'react';

export const MarqueeSection = memo(() => {
  return (
    <div className="bg-brand-50 border-y border-brand-100 overflow-hidden py-4 contain-layout">
      <div className="whitespace-nowrap animate-marquee flex gap-8 items-center text-brand-900 text-sm font-extrabold uppercase tracking-widest will-change-transform">
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
  );
});

MarqueeSection.displayName = 'MarqueeSection';
