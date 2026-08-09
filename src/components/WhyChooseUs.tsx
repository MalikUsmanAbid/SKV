import React from 'react';
import { ShieldCheck, Award, Clock, DollarSign, Cpu, Leaf, CheckCircle2 } from 'lucide-react';
import { whyChooseUsData } from '../data/companyData';
import { IconRenderer } from './IconRenderer';

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-24 bg-[#0F0F0F] relative border-b border-white/10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>Built On Trust & Precision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-mono">
            Why Partner With SKV Construction
          </h2>
          <p className="mt-3 text-base text-gray-400">
            We combine decades of structural engineering expertise with modern digital site tools, transparent pricing, and a zero-harm safety commitment.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUsData.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#1A1A1A] border border-white/10 hover:border-accent transition-all duration-300 transform hover:-translate-y-1.5 shadow-xl relative group overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-transparent group-hover:bg-accent transition-colors" />

              <div className="space-y-4">
                <div className="p-3.5 w-fit rounded-xl bg-[#0F0F0F] border border-white/10 text-accent group-hover:bg-accent/20 transition-colors">
                  <IconRenderer name={item.iconName} className="w-7 h-7" />
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors font-mono">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-[#1A1A1A] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-accent text-slate-950 font-black shrink-0">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white uppercase font-mono">The SKV Fixed-Budget & On-Time Guarantee</h4>
              <p className="text-xs text-gray-400 max-w-xl mt-1">
                Every tender and agreement backed by SKV Construction includes guaranteed milestone handovers, zero unapproved change orders, and full structural warranty binders.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-slate-950 font-bold text-xs uppercase tracking-wider whitespace-nowrap shadow-lg shrink-0"
            id="btn-why-us-consultation"
          >
            Schedule Consultation
          </a>
        </div>

      </div>
    </section>
  );
};
