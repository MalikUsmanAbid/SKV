import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, Building2 } from 'lucide-react';
import { useSiteContext } from '../context/SiteContext';

export const TestimonialsSection: React.FC = () => {
  const { testimonialsData } = useSiteContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const current = testimonialsData[currentIndex];

  return (
    <section className="py-24 bg-[#0F0F0F] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-3">
            <Quote className="w-4 h-4" />
            <span>Client Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-mono">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-3 text-base text-gray-400">
            Read what commercial developers, public authorities, and private estate investors say about partner execution with SKV Construction.
          </p>
        </div>

        {/* Carousel Card */}
        <div className="max-w-4xl mx-auto bg-[#1A1A1A] border border-white/10 rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <Quote className="w-20 h-20 text-accent/10 absolute -top-4 -right-4 pointer-events-none" />

          <div className="space-y-6 relative z-10">
            
            {/* Rating Stars & Project Reference */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex items-center gap-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                <Building2 className="w-3.5 h-3.5" />
                <span>Project: {current.projectTitle}</span>
              </div>
            </div>

            {/* Testimonial Quote Text */}
            <p className="text-lg sm:text-xl text-gray-200 italic leading-relaxed font-light">
              "{current.testimonial}"
            </p>

            {/* Client Bio Footer */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-4">
                <img
                  src={current.avatarUrl}
                  alt={current.clientName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-accent"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white font-mono">{current.clientName}</h4>
                    {current.verifiedClient && (
                      <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" /> Verified Client
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-accent font-medium">{current.clientRole}</div>
                  <div className="text-xs text-gray-400">{current.companyName}</div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-xl bg-[#0F0F0F] border border-white/10 text-gray-300 hover:text-white hover:border-accent transition-colors"
                  aria-label="Previous Testimonial"
                  id="btn-prev-testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-xl bg-[#0F0F0F] border border-white/10 text-gray-300 hover:text-white hover:border-accent transition-colors"
                  aria-label="Next Testimonial"
                  id="btn-next-testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'w-8 bg-accent' : 'w-2 bg-white/20'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
