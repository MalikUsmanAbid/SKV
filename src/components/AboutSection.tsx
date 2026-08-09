import React, { useState } from 'react';
import { Target, Eye, ShieldCheck, Award, HeartHandshake, Check } from 'lucide-react';
import { useSiteContext } from '../context/SiteContext';
import aboutEngineeringImg from '../assets/images/skv_about_engineering_1786244275934.jpg';

export const AboutSection: React.FC = () => {
  const { companyInfo, teamMembers } = useSiteContext();
  const [activeTab, setActiveTab] = useState<'story' | 'mission' | 'quality'>('story');

  const coreValues = [
    { title: 'Structural Integrity', desc: 'Zero compromises on materials, engineering standards, or safety protocols.' },
    { title: 'Transparent Governance', desc: 'Clear contracts, itemized estimates, and open line-item budgeting.' },
    { title: 'Innovation & Tech', desc: 'Applying 3D BIM clash detection and drone surveillance for site precision.' },
    { title: 'Client Centricity', desc: 'Dedicated project management communication and guaranteed handovers.' },
  ];

  return (
    <section id="about" className="py-24 bg-[#0A0C0F] relative border-b border-[#2A3140]">
      
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-3">
            <Award className="w-4 h-4" />
            <span>About SKV Construction</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-mono">
            Engineering Excellence. Uncompromising Safety.
          </h2>
          <p className="mt-3 text-base text-gray-400">
            Learn about our origin, engineering philosophy, and the experienced leadership team building iconic infrastructure.
          </p>
        </div>

        {/* Top Grid: Image + Story Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Image Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#2A3140] shadow-2xl group">
              <img
                src={aboutEngineeringImg}
                alt="SKV Construction Engineering Team"
                className="w-full h-[450px] object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0F] via-transparent to-transparent opacity-60" />
              
              {/* Floating Quality Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#161A22]/95 border border-[#2A3140] backdrop-blur-md flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-accent uppercase tracking-wider">Quality Assurance</div>
                  <div className="text-sm font-semibold text-white">Multi-Stage Inspection & ISO Standards</div>
                </div>
                <ShieldCheck className="w-8 h-8 text-accent shrink-0" />
              </div>
            </div>
          </div>

          {/* Right Text / Tabbed Story Column */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Tab Navigation */}
            <div className="flex border-b border-[#2A3140]">
              <button
                onClick={() => setActiveTab('story')}
                className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === 'story'
                    ? 'border-accent text-accent'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
                id="btn-about-tab-story"
              >
                Our Story
              </button>
              <button
                onClick={() => setActiveTab('mission')}
                className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === 'mission'
                    ? 'border-accent text-accent'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
                id="btn-about-tab-mission"
              >
                Mission & Vision
              </button>
              <button
                onClick={() => setActiveTab('quality')}
                className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  activeTab === 'quality'
                    ? 'border-accent text-accent'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
                id="btn-about-tab-quality"
              >
                Safety & Quality
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'story' && (
              <div className="space-y-4 animate-in fade-in">
                <h3 className="text-xl font-bold text-white font-mono">Transforming Architectural Visions into Physical Reality</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {companyInfo.aboutStory}
                </p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Whether constructing complex Grade-A commercial towers, bespoke luxury villas, or post-tensioned highway bridges, our multidisciplinary team applies rigorous engineering practices to guarantee longevity, cost efficiency, and zero site accidents.
                </p>
              </div>
            )}

            {activeTab === 'mission' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="p-4 rounded-xl bg-[#161A22] border border-[#2A3140] space-y-2">
                  <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase">
                    <Target className="w-4 h-4" />
                    <span>Our Mission</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">{companyInfo.mission}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#161A22] border border-[#2A3140] space-y-2">
                  <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase">
                    <Eye className="w-4 h-4" />
                    <span>Our Vision</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">{companyInfo.vision}</p>
                </div>
              </div>
            )}

            {activeTab === 'quality' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="p-4 rounded-xl bg-[#161A22] border border-[#2A3140] space-y-2">
                  <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Quality Commitment</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">{companyInfo.qualityCommitment}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#161A22] border border-[#2A3140] space-y-2">
                  <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase">
                    <HeartHandshake className="w-4 h-4" />
                    <span>Safety Commitment</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">{companyInfo.safetyCommitment}</p>
                </div>
              </div>
            )}

            {/* Core Value Checklist Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {coreValues.map((val, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#161A22] border border-[#2A3140] flex items-start gap-2.5">
                  <div className="mt-0.5 p-1 rounded bg-accent/20 text-accent">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{val.title}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{val.desc}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Leadership Team Spotlight */}
        <div className="pt-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-xs font-bold text-accent uppercase tracking-widest mb-1">Our Leadership</div>
              <h3 className="text-2xl font-extrabold text-white font-mono uppercase">Professional Engineering Team</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div 
                key={member.id} 
                className="rounded-xl bg-[#161A22] border border-[#2A3140] overflow-hidden group hover:border-accent transition-all duration-300"
              >
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-dark/80 backdrop-blur-md text-[10px] font-bold text-accent border border-[#2A3140]">
                    {member.experienceYears}
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h4 className="text-base font-bold text-white group-hover:text-accent transition-colors">{member.name}</h4>
                  <div className="text-xs text-accent font-medium">{member.role}</div>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{member.bio}</p>
                  
                  <div className="pt-2 flex flex-wrap gap-1">
                    {member.specialties.map((spec, sIdx) => (
                      <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded bg-[#1F2430] text-gray-300">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
