import React, { memo } from 'react';
import { MapPin, Phone, ArrowRight, ExternalLink } from 'lucide-react';
import { City } from '../../types';

interface LocationSectionProps {
  selectedCity: City;
  toggleBooking: () => void;
}

export const LocationSection = memo(({ selectedCity, toggleBooking }: LocationSectionProps) => {
  const hasYandexMaps = !!selectedCity.yandexMapsOrgId;
  const yandexMapsUrl = hasYandexMaps 
    ? `https://yandex.ru/maps/org/vivi_laser/${selectedCity.yandexMapsOrgId}/`
    : null;
  const mapWidgetUrl = hasYandexMaps
    ? `https://yandex.ru/map-widget/v1/?oid=${selectedCity.yandexMapsOrgId}&ol=biz&source=constructor`
    : null;

  return (
    <section id="locations" className="py-24 relative contain-layout">
      <div className="container mx-auto px-6">
        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white h-[600px] group">
          {mapWidgetUrl ? (
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no" 
              marginHeight={0} 
              marginWidth={0} 
              loading="lazy"
              src={mapWidgetUrl}
              className="absolute inset-0 w-full h-full"
            ></iframe>
          ) : (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin size={48} className="mx-auto mb-4 text-brand-500" />
                <p className="font-bold text-lg">{selectedCity.name}</p>
                <p className="text-sm">{selectedCity.address}</p>
              </div>
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex justify-center items-end pointer-events-none">
            <div className="bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white max-w-3xl w-full pointer-events-auto">
              <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase mb-4">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Открыто сейчас
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-dark mb-2">The Cashmere</h3>
                  <p className="text-gray-500 font-medium flex items-center gap-2">
                    <MapPin size={18} className="text-brand-500"/> {selectedCity.address}
                  </p>
                  {yandexMapsUrl && (
                    <a 
                      href={yandexMapsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-500 text-sm font-bold flex items-center gap-1 mt-2 hover:text-brand-600 transition-colors"
                    >
                      Открыть в Яндекс Картах <ExternalLink size={14} />
                    </a>
                  )}
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
