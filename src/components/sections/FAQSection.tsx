import React, { memo, useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { FAQ_ITEMS } from '../../constants';

interface FAQSectionProps {
  toggleBooking: () => void;
}

export const FAQSection = memo(({ toggleBooking }: FAQSectionProps) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleFaqToggle = useCallback((index: number) => {
    setActiveFaq(prev => prev === index ? null : index);
  }, []);

  return (
    <section className="py-24 bg-white contain-layout">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <h2 className="text-4xl font-extrabold text-dark mb-6">Частые вопросы</h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Мы собрали ответы на самые популярные вопросы, чтобы вы чувствовали себя уверенно.
              </p>
              <button onClick={toggleBooking} className="px-8 py-4 bg-gray-50 text-dark rounded-xl font-bold hover:bg-brand-500 hover:text-white transition-colors duration-200 shadow-sm">
                Задать свой вопрос
              </button>
            </div>
          </div>
          
          <div className="lg:w-2/3 space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <div key={index} className="border-b border-gray-100 pb-4">
                <button 
                  onClick={() => handleFaqToggle(index)}
                  className="w-full py-6 flex items-center justify-between gap-4 text-left group"
                >
                  <span className={`text-xl font-bold transition-colors duration-200 ${activeFaq === index ? 'text-brand-500' : 'text-dark group-hover:text-brand-600'}`}>
                    {item.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${activeFaq === index ? 'bg-brand-500 text-white rotate-45' : 'bg-gray-50 text-dark group-hover:bg-brand-50'}`}>
                    <Plus size={20} />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-200 ease-out ${activeFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
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
  );
});

FAQSection.displayName = 'FAQSection';
