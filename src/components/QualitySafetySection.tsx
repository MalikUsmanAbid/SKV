import React, { useState } from 'react';
import { ShieldAlert, Award, FileCheck2, HardHat, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useSiteContext } from '../context/SiteContext';

export const QualitySafetySection: React.FC = () => {
  const { companyInfo } = useSiteContext();
  const [activeChecklistTab, setActiveChecklistTab] = useState<'materials' | 'site' | 'iso'>('materials');

  const safetyProtocols = [
    { title: 'ISO 45001 Health & Safety', desc: 'Certified occupational health & safety management system enforced across every active site.' },
    { title: 'Zero-Harm Site Policy', desc: 'Mandatory safety toolboxes, personal protective equipment (PPE) enforcement, and daily hazard audits.' },
    { title: 'Independent Material Testing', desc: 'Batch concrete cylinder crushing tests, steel tensile strain verification, and soil compaction audits.' },
    { title: 'Environmental Compliance', desc: 'Dust suppression, run-off drainage management, noise monitoring, and recyclable site waste disposal.' }
  ];

  const siteChecklist = {
    materials: [
      'Mill certified structural steel (ASTM A615 / A706)',
      '3rd-party certified 28-day concrete strength testing',
      'Low-VOC non-toxic sealants & eco-friendly insulation',
      'Non-destructive weld ultrasonic testing (UT)'
    ],
    site: [
      '100% mandatory PPE (Hardhat, High-vis, Steel-toe, Eye protection)',
      'Full perimeter safety netting & fall protection anchor points',
      'Certified crane & heavy rigging inspections before lift',
      '24/7 site access monitoring & CCTV security logging'
    ],
    iso: [
      'ISO 9001:2015 Quality Management Audit Trail',
      'ISO 45001:2018 Occupational Health & Safety Compliance',
      'LEED Green Building Certified Construction Standards',
      'OSHA 30-Hour Certified Site Safety Engineers'
    ]
  };

  return (
    <section id="safety" className="py-24 bg-[#0F0F0F] relative border-b border-white/10">
      
      {/* Background Accent Gradient */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero Compromise Policy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-mono">
            Safety & Quality Governance
          </h2>
          <p className="mt-3 text-base text-gray-400">
            Our zero-harm culture and ISO quality assurance framework protect workforce lives and guarantee long-term structural integrity.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {safetyProtocols.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#1A1A1A] border border-white/10 space-y-3 hover:border-accent transition-colors">
              <div className="p-3 w-fit rounded-xl bg-[#0F0F0F] text-accent border border-white/10">
                <HardHat className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-mono">{item.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Interactive Safety Checklist Panel */}
        <div className="bg-[#161A22] border border-[#2A3140] rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#2A3140] pb-6 mb-6 gap-4">
            <div>
              <span className="text-xs font-bold text-accent uppercase tracking-widest block">Interactive Site Standards</span>
              <h3 className="text-xl font-bold text-white font-mono mt-1">Live Quality & Material Inspection Protocols</h3>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-[#0A0C0F] p-1.5 rounded-xl border border-[#2A3140]">
              <button
                onClick={() => setActiveChecklistTab('materials')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${
                  activeChecklistTab === 'materials' ? 'bg-accent text-slate-950' : 'text-gray-400 hover:text-white'
                }`}
                id="btn-safety-tab-materials"
              >
                Material Testing
              </button>
              <button
                onClick={() => setActiveChecklistTab('site')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${
                  activeChecklistTab === 'site' ? 'bg-accent text-slate-950' : 'text-gray-400 hover:text-white'
                }`}
                id="btn-safety-tab-site"
              >
                Site Operations
              </button>
              <button
                onClick={() => setActiveChecklistTab('iso')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${
                  activeChecklistTab === 'iso' ? 'bg-accent text-slate-950' : 'text-gray-400 hover:text-white'
                }`}
                id="btn-safety-tab-iso"
              >
                ISO Certifications
              </button>
            </div>
          </div>

          {/* Active Checklist Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {siteChecklist[activeChecklistTab].map((checkItem, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#0A0C0F] border border-[#2A3140] flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-gray-200">{checkItem}</span>
              </div>
            ))}
          </div>

          {/* Badges Footer */}
          <div className="mt-8 pt-6 border-t border-[#2A3140] flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-accent" />
              <span>Certified ISO 9001:2015 & ISO 45001:2018 Contractor</span>
            </div>
            <div className="flex gap-2">
              {companyInfo.certifications.map((cert, cIdx) => (
                <span key={cIdx} className="px-2.5 py-1 rounded bg-[#0A0C0F] border border-[#2A3140] text-[10px] font-mono font-semibold text-gray-300">
                  {cert}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
