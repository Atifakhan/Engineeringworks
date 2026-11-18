import React, { useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { GallerySection } from './components/GallerySection';
import { CommercialResidentialSection } from './components/CommercialResidentialSection';
import { BookingSection } from './components/BookingSection';
import { ContactFooter } from './components/ContactFooter';

function AppContent() {
  const [preselectedService, setPreselectedService] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForBooking = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    scrollToSection('booking');
  };

  const handleNotify = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] transition-colors duration-200 dark:bg-[#0B1220] dark:text-[#F8FAFC]">
      <Navbar onBookClick={() => scrollToSection('booking')} />

      <main>
        <Hero
          onBookClick={() => scrollToSection('booking')}
          onExploreClick={() => scrollToSection('services')}
        />

        <ServicesSection onSelectServiceForBooking={handleSelectServiceForBooking} />

        <GallerySection onBookSimilar={handleSelectServiceForBooking} />

        <CommercialResidentialSection />

        <BookingSection
          preselectedService={preselectedService}
          onNotify={handleNotify}
        />

        <ContactFooter />
      </main>

      {/* Theme-Aware Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex max-w-md items-start gap-3 rounded-xl border border-[#0D9488]/40 bg-[#FFFFFF] px-4 py-3.5 text-sm text-[#0F172A] shadow-lg dark:border-[#2DD4BF]/40 dark:bg-[#17263B] dark:text-[#F8FAFC]"
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0D9488] dark:text-[#2DD4BF]" />
          <p className="leading-snug">{toastMessage}</p>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            aria-label="Dismiss notification"
            className="ml-1 shrink-0 rounded p-0.5 text-[#475569] hover:text-[#0F172A] dark:text-[#B8C5D6] dark:hover:text-[#F8FAFC]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
