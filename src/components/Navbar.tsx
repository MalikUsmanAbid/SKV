import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ChevronRight, ShieldCheck } from 'lucide-react';
import { useSiteContext } from '../context/SiteContext';
import logo from '../assets/images/skv_logo_dark_theme_1786245182064.jpg';

interface NavbarProps {
  onOpenQuoteModal: () => void;
  onOpenAdminModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal, onOpenAdminModal }) => {
  const { companyInfo } = useSiteContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'services', 'projects', 'why-us', 'process', 'safety', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Process', href: '#process' },
    { name: 'Safety', href: '#safety' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#0A0C0F]/90 backdrop-blur-md border-b border-[#2A3140] shadow-2xl py-3' 
        : 'bg-gradient-to-b from-[#0A0C0F]/90 to-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-accent rounded-lg p-1"
            id="nav-logo"
          >
            <img src={logo} alt="SKG Builders & Developers" className="h-12 w-auto object-contain transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-wider text-white uppercase font-mono flex items-center gap-1">
                SKG <span className="text-accent font-sans">BUILDERS & DEVELOPERS</span>
              </span>
              <span className="text-[10px] tracking-widest text-gray-400 uppercase font-medium">
                Infrastructure & Building
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#161A22]/80 border border-[#2A3140] rounded-full px-4 py-1.5 backdrop-blur-sm">
            {navLinks.map((link) => {
              const linkSection = link.href.replace('#', '');
              const isActive = activeSection === linkSection;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-200 ${
                    isActive 
                      ? 'bg-accent text-slate-950 shadow-md font-bold' 
                      : 'text-gray-300 hover:text-white hover:bg-[#1F2430]'
                  }`}
                  id={`nav-link-${linkSection}`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Admin Panel Trigger */}
            {onOpenAdminModal && (
              <button
                onClick={onOpenAdminModal}
                className="p-2.5 rounded-lg bg-[#161A22] border border-accent/40 text-accent hover:bg-accent/10 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                title="Open Admin CMS Portal"
                id="btn-navbar-admin-portal"
              >
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span className="hidden xl:inline">Admin Panel</span>
              </button>
            )}

            {/* Direct Phone */}
            <a 
              href={`tel:${companyInfo.phone}`}
              className="hidden xl:flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-accent transition-colors px-3 py-2"
              id="btn-navbar-phone"
            >
              <Phone className="w-4 h-4 text-accent" />
              <span>{companyInfo.phone}</span>
            </a>

            {/* Quote Button */}
            <button
              onClick={onOpenQuoteModal}
              className="px-5 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg shadow-accent/20 flex items-center gap-1.5"
              id="btn-navbar-get-quote"
            >
              <span>Get a Quote</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenQuoteModal}
              className="sm:hidden px-3 py-1.5 rounded-lg bg-accent text-slate-950 font-bold text-xs uppercase tracking-wider"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#161A22] border border-[#2A3140] text-gray-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
              id="btn-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-accent" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0C0F]/95 backdrop-blur-xl border-b border-[#2A3140] px-4 pt-4 pb-6 mt-3 animate-in fade-in slide-in-from-top-4">
          <div className="space-y-1 mb-6">
            {navLinks.map((link) => {
              const linkSection = link.href.replace('#', '');
              const isActive = activeSection === linkSection;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all ${
                    isActive 
                      ? 'bg-accent text-slate-950 font-bold' 
                      : 'text-gray-300 hover:bg-[#161A22] hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#2A3140] space-y-3">
            <a
              href={`tel:${companyInfo.phone}`}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#161A22] border border-[#2A3140] text-sm font-semibold text-gray-200"
            >
              <Phone className="w-4 h-4 text-accent" />
              <span>Call: {companyInfo.phone}</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full py-3 rounded-lg bg-accent text-slate-950 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Get a Free Quote</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
