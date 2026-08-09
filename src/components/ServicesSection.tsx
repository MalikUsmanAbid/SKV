import React, { useState } from 'react';
import { ArrowRight, Wrench, CheckCircle2, Search } from 'lucide-react';
import { useSiteContext } from '../context/SiteContext';
import { ServiceItem } from '../types';
import { IconRenderer } from './IconRenderer';
import { ServiceDetailModal } from './ServiceDetailModal';

interface ServicesSectionProps {
  onOpenQuoteModal: (preselectedService?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenQuoteModal }) => {
  const { servicesData } = useSiteContext();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Residential', 'Commercial', 'Industrial', 'Infrastructure', 'Contracting & Advisory'];

  const filteredServices = servicesData.filter((service) => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterCategory === 'All') return matchesSearch;
    if (filterCategory === 'Residential') return matchesSearch && service.id.includes('residential');
    if (filterCategory === 'Commercial') return matchesSearch && (service.id.includes('commercial') || service.id.includes('renovation'));
    if (filterCategory === 'Industrial') return matchesSearch && service.id.includes('industrial');
    if (filterCategory === 'Infrastructure') return matchesSearch && service.id.includes('infrastructure');
    if (filterCategory === 'Contracting & Advisory') return matchesSearch && (service.id.includes('contracting') || service.id.includes('project-management') || service.id.includes('interiors'));
    return matchesSearch;
  });

  return (
    <section id="services" className="py-24 bg-[#0F0F0F] relative border-b border-white/10">
      
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-3">
              <Wrench className="w-4 h-4" />
              <span>Full-Spectrum Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-mono">
              Our Construction Services
            </h2>
            <p className="mt-2 text-sm text-gray-400 max-w-xl">
              Turnkey architectural execution, structural engineering, general contracting, and heavy infrastructure development.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#1A1A1A] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent"
              id="input-search-services"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterCategory === cat
                  ? 'bg-accent text-slate-950 font-bold shadow-md'
                  : 'bg-[#161A22] border border-[#2A3140] text-gray-300 hover:border-accent'
              }`}
              id={`filter-service-${cat}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 flex flex-col justify-between group hover:border-accent transition-all duration-300 transform hover:-translate-y-1 shadow-xl relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-accent transition-colors" />

              <div className="space-y-4">
                {/* Header Icon + Title */}
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-xl bg-[#0F0F0F] border border-white/10 text-accent group-hover:bg-accent/20 transition-colors">
                    <IconRenderer name={service.iconName} className="w-6 h-6" />
                  </div>
                  {service.featured && (
                    <span className="px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-wider">
                      Core Service
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors font-mono">
                  {service.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                  {service.shortDescription}
                </p>

                {/* Top Features */}
                <ul className="space-y-1.5 pt-2">
                  {service.features.slice(0, 3).map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-[11px] text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span className="line-clamp-1">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-bold text-accent hover:underline flex items-center gap-1"
                  id={`btn-learn-more-${service.id}`}
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenQuoteModal(service.title)}
                  className="px-3 py-1.5 rounded-lg bg-[#0F0F0F] border border-white/10 hover:border-accent text-xs font-medium text-gray-300 hover:text-white transition-colors"
                  id={`btn-quote-service-${service.id}`}
                >
                  Get Estimate
                </button>
              </div>

            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-[#1A1A1A] rounded-2xl border border-white/10">
            <p className="text-sm text-gray-400">No services match your search terms.</p>
            <button
              onClick={() => { setSearchQuery(''); setFilterCategory('All'); }}
              className="mt-3 px-4 py-2 rounded-lg bg-accent text-slate-950 text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenQuoteModal={onOpenQuoteModal}
      />

    </section>
  );
};
