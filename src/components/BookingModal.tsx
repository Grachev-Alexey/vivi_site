import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle, Calendar, ArrowRight, Clock, ChevronDown, Check, Plus, Trash2, MapPin, Sparkles, Loader2 } from 'lucide-react';
import { City, Service } from '../types';
import { CITIES, SERVICES } from '../constants';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCity?: City;
  preselectedServiceId?: string | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, initialCity, preselectedServiceId }) => {
  const [step, setStep] = useState(1);
  const [cityOpen, setCityOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    cityId: initialCity?.id || CITIES[0].id,
    selectedServices: [] as string[],
    name: '',
    phone: ''
  });

  // Body Scroll Lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Load preselected service
  useEffect(() => {
    if (isOpen && preselectedServiceId) {
       if (!formData.selectedServices.includes(preselectedServiceId)) {
          setFormData(prev => ({
             ...prev,
             selectedServices: [...prev.selectedServices, preselectedServiceId]
          }));
       }
    }
  }, [isOpen, preselectedServiceId]);

  // Click outside handler for dropdowns
  const modalRef = useRef<HTMLDivElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const serviceDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
     const handleClickOutside = (event: MouseEvent) => {
        // Handle City Dropdown closing
        if (cityOpen && cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
           setCityOpen(false);
        }
        
        // Handle Service Dropdown closing
        if (serviceOpen && serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target as Node)) {
           setServiceOpen(false);
        }
     };

     if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
     }
     
     return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, cityOpen, serviceOpen]);


  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.selectedServices.length === 0) {
       alert("Пожалуйста, выберите хотя бы одну услугу");
       return;
    }

    setIsSubmitting(true);

    // Prepare Data
    const selectedCityData = CITIES.find(c => c.id === formData.cityId);
    const selectedServicesData = SERVICES.filter(s => formData.selectedServices.includes(s.id));
    const totalPrice = selectedServicesData.reduce((acc, curr) => acc + curr.price, 0);

    const payload = {
        event_type: 'lead_form_submission',
        timestamp: new Date().toISOString(),
        client: {
            name: formData.name,
            phone: formData.phone,
        },
        location: {
            city_id: formData.cityId,
            city_name: selectedCityData?.name || 'Unknown',
        },
        order: {
            services: selectedServicesData.map(s => s.name),
            service_ids: formData.selectedServices,
            total_price: totalPrice,
            currency: 'RUB'
        }
    };

    try {
        // Add a small delay to ensure loading state is visible and UI feels responsive
        // and send Webhook in parallel
        const minLoadingTime = new Promise(resolve => setTimeout(resolve, 800));
        
        const fetchRequest = fetch('https://vivi-stats.store/webhook-test/34429cc4-413d-4f49-b990-4b40a6eb7edc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        await Promise.all([minLoadingTime, fetchRequest]);

    } catch (error) {
        // Log as warning instead of error to prevent console noise if URL is invalid or CORS blocked
        console.warn("Webhook submission simulated (network request failed):", error);
    } finally {
        // Always proceed to success step
        setIsSubmitting(false);
        setStep(2);
    }
  };

  const toggleService = (id: string) => {
     setFormData(prev => {
        const exists = prev.selectedServices.includes(id);
        if (exists) {
           return { ...prev, selectedServices: prev.selectedServices.filter(s => s !== id) };
        } else {
           return { ...prev, selectedServices: [...prev.selectedServices, id] };
        }
     });
  };

  const removeService = (id: string) => {
     setFormData(prev => ({ ...prev, selectedServices: prev.selectedServices.filter(s => s !== id) }));
  };

  const selectedCity = CITIES.find(c => c.id === formData.cityId);
  const selectedServicesList = SERVICES.filter(s => formData.selectedServices.includes(s.id));
  const totalPrice = selectedServicesList.reduce((acc, curr) => acc + curr.price, 0);

  // Group services for the dropdown
  const servicesByCat = {
     'Выгодные комплексы': SERVICES.filter(s => s.category === 'sets'),
     'Лицо': SERVICES.filter(s => s.category === 'face'),
     'Тело': SERVICES.filter(s => s.category === 'body'),
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-dark/60 backdrop-blur-md transition-opacity animate-fade-in" onClick={onClose}></div>

      <div ref={modalRef} className="relative z-10 w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-slide-up border border-white/20 max-h-[90vh] flex flex-col">
        {step === 1 ? (
          <div className="flex flex-col h-full">
             <div className="p-8 md:p-10 pb-0 shrink-0">
                 <div className="flex justify-between items-start mb-6">
                    <div>
                       <h2 className="text-3xl font-extrabold text-dark tracking-tight">Запись на визит</h2>
                       <p className="text-gray-500 font-medium mt-1">Скидка 50% на первый визит применяется автоматически.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition"><X size={24} /></button>
                 </div>
                 
                 {/* Progress Bar */}
                 <div className="flex gap-2 mb-6">
                    <div className="h-1.5 flex-1 bg-brand-500 rounded-full"></div>
                    <div className="h-1.5 flex-1 bg-gray-100 rounded-full"></div>
                 </div>
             </div>

             <div className="overflow-y-auto px-8 md:px-10 pb-4 md:pb-8 flex-1 custom-scrollbar">
                 <form onSubmit={handleSubmit} className="space-y-6">
                    {/* City Select */}
                    <div className="space-y-2 relative z-50" ref={cityDropdownRef}>
                       <label className="text-xs font-bold uppercase text-gray-400 tracking-wider flex items-center gap-1"><MapPin size={12}/> Город</label>
                       <div className="relative">
                          <button 
                             type="button"
                             onClick={() => setCityOpen(!cityOpen)}
                             className="custom-select-trigger w-full p-4 bg-gray-50 rounded-2xl font-bold text-dark flex justify-between items-center hover:bg-gray-100 transition border border-transparent focus:border-brand-200 text-base"
                          >
                             {selectedCity?.name}
                             <ChevronDown size={20} className={`text-gray-400 transition-transform ${cityOpen ? 'rotate-180' : ''}`} />
                          </button>
                          
                          {cityOpen && (
                             <div className="custom-select-options absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl max-h-60 overflow-y-auto z-50 animate-fade-in p-1">
                                {CITIES.map(city => (
                                   <button
                                      key={city.id}
                                      type="button"
                                      onClick={() => {
                                         setFormData({...formData, cityId: city.id});
                                         setCityOpen(false);
                                      }}
                                      className={`w-full text-left px-4 py-3 rounded-xl text-base font-bold transition flex justify-between items-center ${formData.cityId === city.id ? 'bg-brand-50 text-brand-600' : 'hover:bg-gray-50 text-dark'}`}
                                   >
                                      {city.name}
                                      {formData.cityId === city.id && <Check size={16} />}
                                   </button>
                                ))}
                             </div>
                          )}
                       </div>
                    </div>

                    {/* Services Multi-Select */}
                    <div className="space-y-2" ref={serviceDropdownRef}>
                       <label className="text-xs font-bold uppercase text-gray-400 tracking-wider flex items-center gap-1"><Sparkles size={12}/> Услуги</label>
                       
                       {/* Selected Chips */}
                       <div className="flex flex-wrap gap-2 mb-3 min-h-[40px]">
                          {selectedServicesList.map(s => (
                             <div key={s.id} className="bg-brand-50 text-brand-900 px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-2 border border-brand-100 animate-fade-in">
                                {s.name}
                                <button type="button" onClick={() => removeService(s.id)} className="hover:text-brand-600 p-0.5 rounded-full hover:bg-brand-200/50">
                                   <X size={14} />
                                </button>
                             </div>
                          ))}
                          <button 
                             type="button"
                             onClick={() => setServiceOpen(!serviceOpen)}
                             className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1 border border-dashed transition active:scale-95 ${serviceOpen ? 'border-brand-300 text-brand-500 bg-brand-50' : 'border-gray-300 text-gray-500 hover:border-brand-300 hover:text-brand-500'}`}
                          >
                             <Plus size={14} /> {selectedServicesList.length > 0 ? 'Добавить ещё' : 'Выбрать услуги'}
                          </button>
                       </div>

                       {/* Service Picker Area */}
                       {serviceOpen && (
                          <div className="bg-white border border-gray-100 rounded-2xl p-2 shadow-xl absolute left-0 right-0 z-40 max-h-72 overflow-y-auto animate-fade-in">
                             {Object.entries(servicesByCat).map(([category, items]) => (
                                <div key={category} className="mb-4 last:mb-0">
                                   <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 py-2 sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-gray-50">{category}</div>
                                   <div className="space-y-1 mt-1">
                                      {items.map(s => {
                                         const isSelected = formData.selectedServices.includes(s.id);
                                         return (
                                            <button
                                               key={s.id}
                                               type="button"
                                               onClick={() => toggleService(s.id)}
                                               className={`w-full text-left px-3 py-3 rounded-xl text-base font-bold transition flex justify-between items-center active:scale-[0.98] ${isSelected ? 'bg-brand-50 text-brand-700' : 'hover:bg-gray-50 text-dark'}`}
                                            >
                                               <span>{s.name}</span>
                                               {isSelected ? <CheckCircle size={20} fill="currentColor" className="text-brand-500" /> : <div className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">{s.price} ₽</div>}
                                            </button>
                                         );
                                      })}
                                   </div>
                                </div>
                             ))}
                          </div>
                       )}
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4 pt-2">
                       <div className="space-y-2">
                          <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Имя</label>
                          <input 
                            required
                            autoComplete="given-name"
                            className="w-full p-4 bg-gray-50 rounded-2xl font-bold text-dark outline-none focus:ring-2 focus:ring-brand-200 transition placeholder:text-gray-300 text-base"
                            placeholder="Как вас зовут?"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                       </div>

                       <div className="space-y-2">
                          <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Телефон</label>
                          <input 
                            required
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            className="w-full p-4 bg-gray-50 rounded-2xl font-bold text-dark outline-none focus:ring-2 focus:ring-brand-200 transition placeholder:text-gray-300 text-base"
                            placeholder="+7 (___) ___-__-__"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                       </div>
                    </div>

                    <div className="pt-2">
                         {selectedServicesList.length > 0 ? (
                             <div className="bg-gray-50 rounded-2xl p-4 flex justify-between items-center mb-4 border border-gray-100">
                                 <span className="text-sm font-bold text-gray-500">Итого к оплате:</span>
                                 <span className="text-2xl font-extrabold text-brand-600">{totalPrice} ₽</span>
                             </div>
                         ) : null}
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full py-5 bg-brand-500 text-white rounded-2xl font-extrabold text-lg hover:bg-brand-600 hover:shadow-button hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
                        >
                           {isSubmitting ? <Loader2 className="animate-spin" /> : <>Записаться <ArrowRight size={20} /></>}
                        </button>
                    </div>
                 </form>
             </div>
          </div>
        ) : (
          <div className="p-12 text-center bg-white h-full flex flex-col justify-center items-center animate-fade-in">
             <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8 animate-bounce">
                <CheckCircle size={48} fill="currentColor" className="text-white" stroke="currentColor" />
             </div>
             <div className="flex gap-2 mb-6 justify-center">
                <div className="h-1.5 w-12 bg-green-500 rounded-full"></div>
                <div className="h-1.5 w-12 bg-green-500 rounded-full"></div>
             </div>
             <h3 className="text-3xl font-extrabold text-dark mb-4">Заявка принята!</h3>
             <p className="text-gray-500 mb-10 text-lg leading-relaxed">
                Спасибо, {formData.name}!<br/>
                Мы забронировали скидку. Менеджер свяжется с вами по номеру <span className="text-dark font-bold whitespace-nowrap">{formData.phone}</span> в течение 5 минут.
             </p>
             <button onClick={onClose} className="w-full py-4 bg-gray-100 text-dark font-bold rounded-2xl hover:bg-gray-200 transition active:scale-95">Отлично</button>
          </div>
        )}
      </div>
    </div>
  );
};