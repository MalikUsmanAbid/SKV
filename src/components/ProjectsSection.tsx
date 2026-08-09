import React, { useState } from 'react';
import { Building2, MapPin, Calendar, ArrowRight, Eye, Filter } from 'lucide-react';
import { useSiteContext } from '../context/SiteContext';
import { ProjectItem, ProjectCategory } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';

interface ProjectsSectionProps {
  onOpenQuoteModal: (projectRef?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenQuoteModal }) => {
  const { projectsData } = useSiteContext();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories: ProjectCategory[] = ['All', 'Commercial', 'Residential', 'Industrial', 'Infrastructure'];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 bg-[#0F0F0F] relative border-b border-white/10">
      
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 bg-blueprint opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-3">
              <Building2 className="w-4 h-4" />
              <span>Engineered Landmarks</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-mono">
              Featured Portfolio
            </h2>
            <p className="mt-2 text-sm text-gray-400 max-w-xl">
              Explore our landmark developments across high-rise commercial towers, luxury residential estates, industrial hubs, and civil infrastructure.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <Filter className="w-4 h-4 text-gray-400 shrink-0 hidden sm:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-accent text-slate-950 shadow-lg scale-105 font-black'
                    : 'bg-[#1A1A1A] border border-white/10 text-gray-300 hover:border-accent'
                }`}
                id={`filter-project-${cat}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Large Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#1A1A1A] border border-white/10 rounded-2xl overflow-hidden group hover:border-accent transition-all duration-300 transform hover:-translate-y-1.5 shadow-2xl flex flex-col justify-between"
            >
              {/* Card Image Block */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-80" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#0F0F0F]/85 backdrop-blur-md border border-white/10 text-accent text-[11px] font-extrabold uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    project.status === 'Completed' 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Quick View Button on Hover */}
                <div className="absolute inset-0 bg-[#0F0F0F]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="px-5 py-2.5 rounded-xl bg-accent text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl"
                    id={`btn-view-proj-hover-${project.id}`}
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Project Specs</span>
                  </button>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-4 text-[11px] text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-accent" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-accent" />
                      <span>{project.completionDate}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-extrabold text-white group-hover:text-accent transition-colors font-mono">
                    {project.title}
                  </h3>

                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Key Specs Pills */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block font-semibold">Scale</span>
                    <span className="font-bold text-gray-200">{project.areaSize}</span>
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-bold text-accent hover:underline flex items-center gap-1"
                    id={`btn-view-proj-link-${project.id}`}
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenQuoteModal={onOpenQuoteModal}
      />

    </section>
  );
};
