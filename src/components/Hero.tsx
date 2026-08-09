import React from 'react';
import { ShieldCheck, Award, ArrowRight, Building2, HardHat, CheckCircle2 } from 'lucide-react';
import { useSiteContext } from '../context/SiteContext';
import heroBuildingImg from '../assets/images/skv_hero_building_1786244254983.jpg';

interface HeroProps {
  onOpenQuoteModal: () => void;
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal, onExploreProjects }) => {
  const { companyInfo, statisticsData } = useSiteContext();

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between bg-dark overflow-hidden border-b border-[#2A3140]">
      
      {/* Background Architectural Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBuildingImg}
          alt="SKV Construction Modern Architectural Engineering Project"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0C0F] via-[#0A0C0F]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0F] via-transparent to-[#0A0C0F]/60" />
        <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161A22]/90 border border-[#2A3140] text-accent text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg">
              <HardHat className="w-4 h-4 text-accent" />
              <span>General Contractor & Infrastructure Engineering</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none uppercase font-mono">
              SKV Construction
              <span className="block mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-accent font-sans normal-case">
                "{companyInfo.heroHeadline}"
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed font-normal">
              {companyInfo.heroDescription}
            </p>

            <div className="flex flex-wrap gap-y-2 gap-x-6 text-xs font-semibold text-gray-300 pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>Zero-Accident Safety Record</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>ISO 9001 & 45001 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>Fixed-Price Guarantee</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenQuoteModal}
                className="px-8 py-4 rounded-xl bg-accent hover:bg-accent-hover text-slate-950 font-bold text-sm uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 shadow-xl shadow-accent/25 flex items-center justify-center gap-2 group"
                id="hero-cta-quote"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreProjects}
                className="px-8 py-4 rounded-xl bg-[#161A22]/90 hover:bg-[#1F2430] border border-[#2A3140] hover:border-accent text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2"
                id="hero-cta-projects"
              >
                <Building2 className="w-4 h-4 text-accent" />
                <span>View Recent Projects</span>
              </button>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl bg-[#161A22]/90 border border-[#2A3140] backdrop-blur-md shadow-2xl space-y-2 transform transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-accent/20 border border-accent/30 text-accent">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase font-semibold">Safety & Compliance</div>
                  <div className="text-sm font-bold text-white">ISO 45001 Certified Sites</div>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Full HSE site management & zero-harm enforcement on every project.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#161A22]/90 border border-[#2A3140] backdrop-blur-md shadow-2xl space-y-2 transform transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-accent/20 border border-accent/30 text-accent">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase font-semibold">Engineering Precision</div>
                  <div className="text-sm font-bold text-white">3D BIM Model Integration</div>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Virtual constructability reviews eliminate cost overruns before physical breaking of ground.
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#161A22]/95 border border-[#2A3140] backdrop-blur-xl shadow-2xl">
          {statisticsData.map((stat) => (
            <div key={stat.id} className="text-center md:text-left border-r last:border-0 border-[#2A3140] pr-4">
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight flex items-center justify-center md:justify-start gap-1">
                <span className="text-accent">{stat.value}</span>
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-300 mt-0.5">{stat.label}</div>
              <div className="text-[10px] text-gray-500 hidden sm:block mt-0.5">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
