import React, { memo } from 'react';
import { MapPin, Phone, ArrowRight } from 'lucide-react';
import { City } from '../../types';

interface LocationSectionProps {
  selectedCity: City;
  toggleBooking: () => void;
}

export const LocationSection = memo(({ selectedCity, toggleBooking }: LocationSectionProps) => {
  return (
    <section id="locations" className="py-24 relative contain-layout">
      <div className="container mx-auto px-6">
        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white h-[600px] group">
          <iframe 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            scrolling="no" 
            marginHeight={0} 
            marginWidth={0} 
            loading="lazy"
            src={`https://yandex.ru/map-widget/v1/?ll=${selectedCity.coordinates?.lng}%2C${selectedCity.coordinates?.lat}&z=16&pt=${selectedCity.coordinates?.lng}%2C${selectedCity.coordinates?.lat},pm2rdm`}
            className="absolute inset-0 w-full h-full grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500"
          ></iframe>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex justify-center items-end pointer-events-none">
            <div className="bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white max-w-3xl w-full pointer-events-auto">
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
                  <a href={`tel:${selectedCity.phone}`} className="px-6 py-3 bg-white border-2 border-gray-100 text-dark rounded-xl font-bold hover:border-brand-200 hover:text-brand-600 transition-colors duration-200 flex items-center justify-center gap-2">
                    <Phone size={18} /> {selectedCity.phone}
                  </a>
                  <button onClick={toggleBooking} className="px-6 py-3 bg-dark text-white rounded-xl font-bold hover:bg-brand-500 transition-colors duration-200 shadow-lg flex items-center justify-center gap-2">
                    Записаться <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

LocationSection.displayName = 'LocationSection';
