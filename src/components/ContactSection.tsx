import React from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare, Globe } from 'lucide-react';
import { useSiteContext } from '../context/SiteContext';
import { QuoteFormSection } from './QuoteFormSection';

export const ContactSection: React.FC = () => {
  const { companyInfo } = useSiteContext();
  return (
    <section id="contact" className="py-24 bg-[#0F0F0F] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-3">
            <MessageSquare className="w-4 h-4" />
            <span>Direct Communication</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-mono">
            Let's Build Something Great Together.
          </h2>
          <p className="mt-3 text-base text-gray-400">
            Reach out to SKV Construction headquarters to discuss project tenders, site visits, or partnership inquiries.
          </p>
        </div>

        {/* Top Grid: Contact Cards + Simulated Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left: 4 Contact Info Blocks */}
          <div className="lg:col-span-5 space-y-4">
            
            <a
              href={`tel:${companyInfo.phone}`}
              className="p-5 rounded-2xl bg-[#1A1A1A] border border-white/10 hover:border-accent transition-all flex items-center gap-4 group"
            >
              <div className="p-3.5 rounded-xl bg-[#0F0F0F] text-accent border border-white/10 group-hover:bg-accent group-hover:text-slate-950 transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Call Directly</div>
                <div className="text-sm font-bold text-white font-mono">{companyInfo.phone}</div>
                <div className="text-[11px] text-gray-400">Toll-free contractor helpline</div>
              </div>
            </a>

            <a
              href={`mailto:${companyInfo.email}`}
              className="p-5 rounded-2xl bg-[#1A1A1A] border border-white/10 hover:border-accent transition-all flex items-center gap-4 group"
            >
              <div className="p-3.5 rounded-xl bg-[#0F0F0F] text-accent border border-white/10 group-hover:bg-accent group-hover:text-slate-950 transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Inquiry</div>
                <div className="text-sm font-bold text-white font-mono">{companyInfo.email}</div>
                <div className="text-[11px] text-gray-400">Tender & estimation desk</div>
              </div>
            </a>

            <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-white/10 flex items-center gap-4">
              <div className="p-3.5 rounded-xl bg-[#0F0F0F] text-accent border border-white/10">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Corporate Headquarters</div>
                <div className="text-sm font-bold text-white font-mono">{companyInfo.address.street}</div>
                <div className="text-[11px] text-gray-400">{companyInfo.address.city}, {companyInfo.address.state} {companyInfo.address.zip}</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-white/10 flex items-center gap-4">
              <div className="p-3.5 rounded-xl bg-[#0F0F0F] text-accent border border-white/10">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Operating Hours</div>
                <div className="text-xs font-bold text-white">{companyInfo.businessHours}</div>
                <div className="text-[11px] text-gray-400">Emergency site dispatch available 24/7</div>
              </div>
            </div>

          </div>

          {/* Right: Simulated Interactive Map Viewer */}
          <div className="lg:col-span-7 rounded-2xl bg-[#1A1A1A] border border-white/10 overflow-hidden relative shadow-2xl flex flex-col justify-between min-h-[350px]">
            <div className="absolute inset-0 bg-blueprint opacity-30 pointer-events-none" />
            
            <div className="p-6 relative z-10 flex items-center justify-between border-b border-white/10 bg-[#1A1A1A]/90 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <Globe className="w-4 h-4 text-accent" />
                <span>Headquarters & Regional Operations Hub</span>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">
                Site Office Active
              </span>
            </div>

            {/* Simulated Map Visual Canvas */}
            <div className="relative z-10 flex-1 p-8 flex flex-col items-center justify-center text-center space-y-3 bg-[#0F0F0F]/60">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-slate-950 font-black shadow-xl animate-bounce">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="text-sm font-extrabold text-white font-mono uppercase">{companyInfo.name} Regional Headquarters</div>
              <p className="text-xs text-gray-400 max-w-md">
                100 Architectural Boulevard, Metro City. Coordinates: 40.7128° N, 74.0060° W
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${companyInfo.address.street}, ${companyInfo.address.city}, ${companyInfo.address.state}`)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-[#0F0F0F] border border-white/10 hover:border-accent text-xs text-accent font-bold transition-colors"
                id="btn-open-google-maps"
              >
                Open in Google Maps
              </a>
            </div>

            <div className="p-4 relative z-10 border-t border-white/10 bg-[#1A1A1A] text-[11px] text-gray-400 flex items-center justify-between">
              <span>Licensed in ALL Major Municipalities</span>
              <span className="text-accent font-bold">Class-A General Contractor</span>
            </div>
          </div>

        </div>

        {/* Lead Quote Form Block */}
        <div className="mt-12">
          <QuoteFormSection />
        </div>

      </div>
    </section>
  );
};
