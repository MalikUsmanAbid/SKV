import React, { useState } from 'react';
import { X, MapPin, Calendar, CheckCircle2, ArrowRight, Layers, DollarSign, Ruler, Building } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenQuoteModal: (projectRef?: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose, onOpenQuoteModal }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'blueprint'>('overview');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);

  if (!project) return null;

  const currentHeroImg = selectedGalleryImg || project.imageUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#161A22] border border-[#2A3140] rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-[#161A22]/95 border-b border-[#2A3140] px-6 py-4 flex items-center justify-between backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-accent/20 border border-accent/30 text-accent font-bold text-[10px] uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-xs text-gray-400 font-medium">| {project.status}</span>
            </div>
            <h3 className="text-xl font-black text-white font-mono mt-0.5">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#1F2430] text-gray-400 hover:text-white hover:bg-red-500/20 transition-colors"
            id="btn-close-project-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Main Hero Gallery View */}
          <div className="space-y-3">
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#2A3140] shadow-xl">
              <img
                src={currentHeroImg}
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0F] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-gray-300">
                <div className="flex items-center gap-1.5 bg-dark/80 px-3 py-1.5 rounded-lg border border-[#2A3140]">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-dark/80 px-3 py-1.5 rounded-lg border border-[#2A3140]">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span>Handover: {project.completionDate}</span>
                </div>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {project.galleryImages && project.galleryImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {project.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedGalleryImg(img)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden border shrink-0 transition-all ${
                      currentHeroImg === img ? 'border-accent ring-2 ring-accent/50 scale-105' : 'border-[#2A3140] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Modal Content Tabs */}
          <div className="flex border-b border-[#2A3140]">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 px-5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'overview' ? 'border-accent text-accent' : 'border-transparent text-gray-400 hover:text-white'
              }`}
              id="btn-proj-tab-overview"
            >
              Overview & Scope
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 px-5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'specs' ? 'border-accent text-accent' : 'border-transparent text-gray-400 hover:text-white'
              }`}
              id="btn-proj-tab-specs"
            >
              Key Specifications
            </button>
            <button
              onClick={() => setActiveTab('blueprint')}
              className={`pb-3 px-5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'blueprint' ? 'border-accent text-accent' : 'border-transparent text-gray-400 hover:text-white'
              }`}
              id="btn-proj-tab-blueprint"
            >
              Architectural Plan / BIM
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-4 animate-in fade-in">
              <p className="text-sm text-gray-300 leading-relaxed">{project.fullDescription}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#0A0C0F] border border-[#2A3140]">
                  <div className="text-[10px] text-gray-400 uppercase font-semibold flex items-center gap-1">
                    <Ruler className="w-3.5 h-3.5 text-accent" /> Area Size
                  </div>
                  <div className="text-xs font-bold text-white mt-1">{project.areaSize}</div>
                </div>

                <div className="p-3 rounded-xl bg-[#0A0C0F] border border-[#2A3140]">
                  <div className="text-[10px] text-gray-400 uppercase font-semibold flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-accent" /> Capital Scale
                  </div>
                  <div className="text-xs font-bold text-white mt-1">{project.budgetRange}</div>
                </div>

                <div className="p-3 rounded-xl bg-[#0A0C0F] border border-[#2A3140]">
                  <div className="text-[10px] text-gray-400 uppercase font-semibold flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-accent" /> Principal Client
                  </div>
                  <div className="text-xs font-bold text-white mt-1 truncate">{project.client}</div>
                </div>

                <div className="p-3 rounded-xl bg-[#0A0C0F] border border-[#2A3140]">
                  <div className="text-[10px] text-gray-400 uppercase font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Status
                  </div>
                  <div className="text-xs font-bold text-accent mt-1">{project.status}</div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Key Specifications */}
          {activeTab === 'specs' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.keySpecs.map((spec, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#0A0C0F] border border-[#2A3140] flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-semibold">{spec.label}</span>
                    <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded border border-accent/20">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Architectural Plan / BIM View */}
          {activeTab === 'blueprint' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-6 rounded-2xl bg-[#06101E] border border-blue-900/50 bg-blueprint relative overflow-hidden space-y-4">
                <div className="flex items-center justify-between border-b border-blue-800/40 pb-3">
                  <div className="flex items-center gap-2 text-blue-400 text-xs font-mono font-bold uppercase">
                    <Layers className="w-4 h-4" />
                    <span>3D BIM Structural Blueprint Model - {project.title}</span>
                  </div>
                  <span className="text-[10px] bg-blue-950 text-blue-300 border border-blue-800 px-2 py-0.5 rounded font-mono">
                    ISO-BIM Standard 19650
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-blue-200">
                  <div className="p-3 bg-blue-950/60 rounded border border-blue-800/50">
                    <div className="text-blue-400 text-[10px]">STRUCTURAL GRID</div>
                    <div className="font-bold mt-1 text-white">Axis 1-12 / A-H Matrix</div>
                  </div>
                  <div className="p-3 bg-blue-950/60 rounded border border-blue-800/50">
                    <div className="text-blue-400 text-[10px]">FOUNDATION SYSTEM</div>
                    <div className="font-bold mt-1 text-white">Bored Concrete Friction Piles</div>
                  </div>
                  <div className="p-3 bg-blue-950/60 rounded border border-blue-800/50">
                    <div className="text-blue-400 text-[10px]">CLASH STATUS</div>
                    <div className="font-bold mt-1 text-green-400">0 MEP Clashes Detected</div>
                  </div>
                </div>

                <p className="text-xs text-blue-300/80 leading-relaxed font-sans">
                  SKV Construction engineered this project using 3D Building Information Modeling (BIM) to optimize spatial layouts, schedule critical path milestones, and calculate precise bill of materials before physical construction.
                </p>
              </div>
            </div>
          )}

          {/* Footer Action */}
          <div className="pt-4 flex items-center justify-between border-t border-[#2A3140]">
            <button onClick={onClose} className="text-xs font-semibold text-gray-400 hover:text-white">
              Close Project
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenQuoteModal(`Similar to ${project.title}`);
              }}
              className="px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
              id="btn-project-modal-quote"
            >
              <span>Build a Similar Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
