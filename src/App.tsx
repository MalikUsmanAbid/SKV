/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SiteProvider } from './context/SiteContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProcessTimeline } from './components/ProcessTimeline';
import { QualitySafetySection } from './components/QualitySafetySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuoteFormSection } from './components/QuoteFormSection';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { AdminModal } from './components/AdminModal';

export default function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState<boolean>(false);
  const [adminModalOpen, setAdminModalOpen] = useState<boolean>(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  const handleOpenQuoteModal = (serviceOrProjRef?: string) => {
    setPreselectedService(serviceOrProjRef);
    setQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setQuoteModalOpen(false);
  };

  useEffect(() => {
    // Global keyboard shortcut Ctrl + Shift + A to open Admin Panel
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setAdminModalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleExploreProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SiteProvider>
      <div className="min-h-screen bg-dark text-gray-100 selection:bg-accent selection:text-slate-950 font-sans">
        
        {/* Sticky Header Navigation */}
        <Navbar
          onOpenQuoteModal={() => handleOpenQuoteModal()}
          onOpenAdminModal={() => setAdminModalOpen(true)}
        />

        {/* Main Content Area */}
        <main id="main-content">
          
          {/* 1. Hero Section */}
          <Hero
            onOpenQuoteModal={() => handleOpenQuoteModal()}
            onExploreProjects={handleExploreProjects}
          />

          {/* 2. About SKV Construction */}
          <AboutSection />

          {/* 3. Comprehensive Services */}
          <ServicesSection onOpenQuoteModal={handleOpenQuoteModal} />

          {/* 4. Portfolio / Featured Projects */}
          <ProjectsSection onOpenQuoteModal={handleOpenQuoteModal} />

          {/* 5. Why Choose SKV Construction */}
          <WhyChooseUs />

          {/* 6. Process Workflow Timeline */}
          <ProcessTimeline />

          {/* 7. Safety & Quality Standards */}
          <QualitySafetySection />

          {/* 8. Testimonials */}
          <TestimonialsSection />

          {/* 9. FAQ Accordion */}
          <FAQSection />

          {/* 10. Contact & Interactive Lead Quote Generator */}
          <ContactSection />

        </main>

        {/* Footer */}
        <Footer onOpenAdminModal={() => setAdminModalOpen(true)} />

        {/* Cookie Consent Banner */}
        <CookieConsentBanner />

        {/* Quote Form Modal */}
        {quoteModalOpen && (
          <QuoteFormSection
            initialService={preselectedService}
            isOpenModal={true}
            onCloseModal={handleCloseQuoteModal}
          />
        )}

        {/* Admin CMS Modal */}
        <AdminModal
          isOpen={adminModalOpen}
          onClose={() => setAdminModalOpen(false)}
        />

      </div>
    </SiteProvider>
  );
}

