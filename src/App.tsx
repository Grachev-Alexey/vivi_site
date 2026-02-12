import React, { useState, useEffect, Suspense, useMemo, useCallback, useRef, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { CITIES, SERVICES } from './constants';
import { City } from './types';

import { 
  HeroSection, 
  MarqueeSection, 
  ServicesSection, 
  TechnologySection, 
  SpecialistsSection,
  FAQSection,
  ReviewsSection,
  LocationSection,
  Footer 
} from './components/sections';

import { 
  Header, 
  FomoBanner, 
  CityToast, 
  MobileNav, 
  ScrollTopButton 
} from './components/ui';

const ChatWidget = lazy(() => import('./components/ChatWidget').then(m => ({ default: m.ChatWidget })));
const BookingModal = lazy(() => import('./components/BookingModal').then(m => ({ default: m.BookingModal })));

const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [showCityToast, setShowCityToast] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrolledRef = useRef(false);
  const showScrollTopRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (rafIdRef.current !== null) return;
      
      rafIdRef.current = window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const isScrolled = scrollY > 10;
        const shouldShowScrollTop = scrollY > 500;
        
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
      } catch {
        console.error("Auto-detection failed");
      }
    };

    detectCityByIP();
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

  const servicesByCategory = useMemo(() => ({
    sets: SERVICES.filter(s => s.category === 'sets'),
    body: SERVICES.filter(s => s.category === 'body'),
    face: SERVICES.filter(s => s.category === 'face'),
  }), []);

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
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
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
      <Helmet>
        <title>Лазерная эпиляция {selectedCity.name} | Скидка -50% | Студия ViVi</title>
        <meta name="description" content={`Лазерная эпиляция в г. ${selectedCity.name}. Диодный лазер Pioneer Ozero Khanka, медицинская лицензия. Цены от 300р. Скидка 50% на первый визит. Запишитесь онлайн!`} />
        <meta property="og:title" content={`Лазерная эпиляция ${selectedCity.name} | ViVi`} />
        <meta property="og:description" content="Безупречно гладкая кожа без боли. Скидка 50% для новых клиентов!" />
        <script type="application/ld+json">{schemaData}</script>
        <link rel="canonical" href={`https://vivi-laser.ru/${selectedCity.id}`} />
      </Helmet>

      <CityToast 
        show={showCityToast} 
        selectedCity={selectedCity} 
        onConfirm={confirmAutoCity} 
        onRequestChange={requestCityChange} 
      />

      <FomoBanner selectedCity={selectedCity} toggleBooking={() => toggleBooking()} />

      <Header 
        scrolled={scrolled}
        selectedCity={selectedCity}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        handleCityChange={handleCityChange}
        toggleBooking={() => toggleBooking()}
      />

      <main>
        <HeroSection selectedCity={selectedCity} toggleBooking={() => toggleBooking()} />
        <MarqueeSection />
        <ServicesSection toggleBooking={toggleBooking} servicesByCategory={servicesByCategory} />
        <TechnologySection />
        <SpecialistsSection />
        <FAQSection toggleBooking={() => toggleBooking()} />
        <ReviewsSection selectedCity={selectedCity} />
        <LocationSection selectedCity={selectedCity} toggleBooking={() => toggleBooking()} />
      </main>

      <Footer />

      <MobileNav />

      <ScrollTopButton show={showScrollTop} onClick={scrollToTop} />

      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
      
      <Suspense fallback={null}>
        {isBookingOpen && (
          <BookingModal 
            isOpen={isBookingOpen} 
            onClose={() => setIsBookingOpen(false)} 
            initialCity={selectedCity}
            preselectedServiceId={preselectedServiceId}
          />
        )}
      </Suspense>
    </div>
  );
};

export default App;
