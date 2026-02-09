import React, { memo } from 'react';
import { Instagram, Send } from 'lucide-react';
import logoImg from '../../assets/logo.jpg';

export const Footer = memo(() => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100 contain-layout">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <img src={logoImg} alt="The Cashmere Logo" className="w-8 h-8 rounded-lg object-cover" />
              <span className="font-extrabold text-2xl tracking-tight text-brand-500 font-serif">The Cashmere</span>
            </div>
            <p className="text-gray-500 leading-relaxed max-w-sm mb-8">
              Студия лазерной эпиляции в Волгограде. Мы делаем премиальные услуги доступными, сохраняя высочайшие стандарты качества и безопасности.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-dark hover:bg-brand-500 hover:text-white transition-colors duration-200"><Instagram size={20}/></a>
              <a href="#" className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-dark hover:bg-brand-500 hover:text-white transition-colors duration-200"><Send size={20}/></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-dark mb-6">Меню</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#about" className="hover:text-brand-500 transition-colors duration-200">О технологии</a></li>
              <li><a href="#services" className="hover:text-brand-500 transition-colors duration-200">Прайс лист</a></li>
              <li><a href="#reviews" className="hover:text-brand-500 transition-colors duration-200">Отзывы</a></li>
              <li><a href="#locations" className="hover:text-brand-500 transition-colors duration-200">Контакты</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-dark mb-6">Документы</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-brand-500 transition-colors duration-200">Политика конфиденциальности</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors duration-200">Публичная оферта</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors duration-200">Лицензии</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
