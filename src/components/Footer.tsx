import React, { useState } from 'react';
import { HardHat, Phone, Mail, MapPin, ChevronRight, X, ShieldCheck } from 'lucide-react';
import { useSiteContext } from '../context/SiteContext';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';

interface FooterProps {
  onOpenAdminModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdminModal }) => {
  const { companyInfo, servicesData } = useSiteContext();
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects Portfolio', href: '#projects' },
    { name: 'Why Partner With Us', href: '#why-us' },
    { name: 'Process Workflow', href: '#process' },
    { name: 'Safety & Quality', href: '#safety' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact & Quote', href: '#contact' },
  ];

  return (
    <footer className="bg-[#0A0C0F] border-t border-[#2A3140] text-gray-400 text-xs">
      
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-slate-950">
                <HardHat className="w-5 h-5 font-bold" />
              </div>
              <span className="text-lg font-black tracking-wider text-white uppercase font-mono">
                SKV <span className="text-accent font-sans">CONSTRUCTION</span>
              </span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm pt-2">
              {companyInfo.heroDescription}
            </p>

            <div className="p-3 rounded-xl bg-[#161A22] border border-[#2A3140] space-y-1">
              <div className="text-[10px] font-bold text-accent uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Quality & Security Compliant</span>
              </div>
              <div className="text-[11px] text-gray-300">Certified Class-A General Contractor & Infrastructure Group</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-[#2A3140] pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-accent transition-colors flex items-center gap-1.5 text-xs text-gray-300"
                  >
                    <ChevronRight className="w-3 h-3 text-accent" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-[#2A3140] pb-2">
              Core Services
            </h4>
            <ul className="space-y-2">
              {servicesData.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <a href="#services" className="hover:text-accent transition-colors text-xs text-gray-300">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-[#2A3140] pb-2">
              Corporate Office
            </h4>
            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>{companyInfo.address.street}, {companyInfo.address.city}, {companyInfo.address.state}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span>{companyInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span>{companyInfo.email}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#050608] border-t border-[#2A3140] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-gray-500">
            © {new Date().getFullYear()} {companyInfo.legalName}. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6 text-[11px] text-gray-400">
            {onOpenAdminModal && (
              <button
                onClick={onOpenAdminModal}
                className="text-accent hover:underline font-bold flex items-center gap-1"
                id="btn-footer-admin-portal"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin CMS Panel</span>
              </button>
            )}
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-accent transition-colors font-medium"
              id="btn-footer-privacy"
            >
              Privacy Policy & Legal Notice
            </button>
            <button
              onClick={() => setLegalModal('terms')}
              className="hover:text-accent transition-colors font-medium"
              id="btn-footer-terms"
            >
              Terms of Service
            </button>
            <a href="#home" className="hover:text-accent transition-colors">
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>

      {/* Privacy Policy Full Modal */}
      <PrivacyPolicyModal 
        isOpen={legalModal === 'privacy'} 
        onClose={() => setLegalModal(null)} 
      />

      {/* Terms Modal */}
      {legalModal === 'terms' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/80 backdrop-blur-md">
          <div className="bg-[#161A22] border border-[#2A3140] rounded-2xl p-6 max-w-lg w-full text-xs text-gray-300 space-y-4 relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#2A3140] pb-3">
              <h3 className="text-sm font-bold text-white uppercase font-mono">
                Terms & Conditions
              </h3>
              <button onClick={() => setLegalModal(null)} className="p-1 text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="leading-relaxed">
              All engineering estimates, Bill of Quantities (BOQ), and architectural representations on this website serve as preliminary project references. Binding contracts are subject to physical site inspection and signed agreements.
            </p>
            <button
              onClick={() => setLegalModal(null)}
              className="w-full py-2 rounded-lg bg-accent text-slate-950 font-bold uppercase text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </footer>
  );
};
