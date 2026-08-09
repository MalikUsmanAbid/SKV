import React from 'react';
import { X, CheckCircle2, ArrowRight, Shield, HardHat, FileText } from 'lucide-react';
import { ServiceItem } from '../types';
import { IconRenderer } from './IconRenderer';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenQuoteModal: (preselectedService?: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose, onOpenQuoteModal }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#161A22] border border-[#2A3140] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95">
        
        {/* Modal Header Bar */}
        <div className="sticky top-0 z-10 bg-[#161A22]/95 border-b border-[#2A3140] px-6 py-4 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-accent/20 border border-accent/30 text-accent">
              <IconRenderer name={service.iconName} className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-accent font-bold">SKV Construction Service</span>
              <h3 className="text-xl font-bold text-white font-mono">{service.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#1F2430] text-gray-400 hover:text-white hover:bg-red-500/20 transition-colors"
            id="btn-close-service-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Banner Image */}
          <div className="relative h-64 rounded-xl overflow-hidden border border-[#2A3140]">
            <img
              src={service.imageUrl}
              alt={service.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161A22] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-accent text-slate-950 font-extrabold text-xs uppercase tracking-wider">
                Full-Scope Execution
              </span>
              <span className="text-xs text-gray-300 bg-dark/80 px-3 py-1 rounded-md border border-[#2A3140]">
                ISO Certified Workflow
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-sm uppercase tracking-wider text-accent font-bold">Detailed Service Scope</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          {/* Grid: Key Features & Deliverables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-4 rounded-xl bg-[#0A0C0F] border border-[#2A3140] space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider border-b border-[#2A3140] pb-2">
                <HardHat className="w-4 h-4 text-accent" />
                <span>Key Capabilities</span>
              </div>
              <ul className="space-y-2">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#0A0C0F] border border-[#2A3140] space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider border-b border-[#2A3140] pb-2">
                <FileText className="w-4 h-4 text-accent" />
                <span>Client Deliverables</span>
              </div>
              <ul className="space-y-2">
                {service.deliverables.map((deliv, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Quality & Safety Assurance Note */}
          <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 flex items-center gap-3">
            <Shield className="w-6 h-6 text-accent shrink-0" />
            <div className="text-xs text-gray-300">
              <span className="font-bold text-white">Guaranteed Execution: </span>
              All {service.title.toLowerCase()} works are executed under certified safety supervisor oversight with fixed-price line-item budgeting.
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-2 flex items-center justify-between border-t border-[#2A3140]">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-gray-400 hover:text-white"
            >
              Close Window
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenQuoteModal(service.title);
              }}
              className="px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
              id="btn-service-modal-quote"
            >
              <span>Request Quote for {service.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
