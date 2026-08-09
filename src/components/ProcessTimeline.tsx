import React, { useState } from 'react';
import { GitCommit, CheckCircle2, Clock, ChevronRight, HardHat } from 'lucide-react';
import { useSiteContext } from '../context/SiteContext';

export const ProcessTimeline: React.FC = () => {
  const { processStepsData } = useSiteContext();
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);

  const steps = processStepsData && processStepsData.length > 0 ? processStepsData : [];
  const currentStep = steps[selectedStepIndex] || steps[0];

  return (
    <section id="process" className="py-24 bg-[#0F0F0F] relative border-b border-white/10">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-3">
            <GitCommit className="w-4 h-4" />
            <span>Methodical Execution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-mono">
            Our Construction Process Workflow
          </h2>
          <p className="mt-3 text-base text-gray-400">
            A structured, transparent 8-step lifecycle ensuring zero surprises from initial consultation to long-term post-handover support.
          </p>
        </div>

        {/* Desktop Horizontal Step Bar */}
        <div className="hidden lg:block mb-12">
          <div className="relative flex items-center justify-between px-4">
            
            {/* Connecting Track Line */}
            <div className="absolute top-1/2 left-8 right-8 h-1 bg-white/10 -translate-y-1/2 z-0" />

            {steps.map((step, idx) => {
              const isActive = idx === selectedStepIndex;
              const isPast = idx < selectedStepIndex;
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setSelectedStepIndex(idx)}
                  className={`relative z-10 group flex flex-col items-center focus:outline-none`}
                  id={`btn-step-desktop-${step.stepNumber}`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-black text-sm transition-all duration-300 ${
                      isActive
                        ? 'bg-accent text-slate-950 scale-125 shadow-xl shadow-accent/30 ring-4 ring-accent/20'
                        : isPast
                        ? 'bg-accent/20 text-accent border border-accent/40'
                        : 'bg-[#1A1A1A] border border-white/10 text-gray-400 group-hover:border-accent'
                    }`}
                  >
                    {step.stepNumber}
                  </div>
                  <span className={`mt-3 text-[11px] font-bold uppercase tracking-wider max-w-[100px] text-center transition-colors ${
                    isActive ? 'text-accent' : 'text-gray-400 group-hover:text-white'
                  }`}>
                    {step.title.split('&')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Details Active Box */}
        <div className="bg-[#161A22] border border-[#2A3140] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Step Left Summary */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black font-mono text-accent">{currentStep.stepNumber}</span>
                <div className="h-6 w-px bg-[#2A3140]" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-accent" /> Est. Duration: {currentStep.estimatedDuration}
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-white font-mono">{currentStep.title}</h3>

              <p className="text-sm text-gray-300 leading-relaxed font-medium">
                {currentStep.description}
              </p>

              {/* Step Deliverables */}
              <div className="pt-2 space-y-2">
                <span className="text-xs uppercase tracking-wider text-accent font-bold block">Key Deliverables:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentStep.deliverables.map((deliv, dIdx) => (
                    <div key={dIdx} className="p-2.5 rounded-lg bg-[#0F0F0F] border border-white/10 flex items-center gap-2 text-xs text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step Navigation Controls / Mobile View */}
            <div className="lg:col-span-5 bg-[#0F0F0F] p-6 rounded-xl border border-white/10 space-y-4">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-white/10 pb-2">
                Navigate Workflow Steps ({selectedStepIndex + 1} / {steps.length})
              </div>

              <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                {steps.map((s, idx) => (
                  <button
                    key={s.stepNumber}
                    onClick={() => setSelectedStepIndex(idx)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                      idx === selectedStepIndex
                        ? 'bg-accent/20 border border-accent/40 text-accent font-bold'
                        : 'text-gray-300 hover:bg-[#1A1A1A]'
                    }`}
                    id={`btn-step-list-${s.stepNumber}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#0F0F0F] border border-white/10">
                        {s.stepNumber}
                      </span>
                      <span className="truncate">{s.title}</span>
                    </div>
                    {idx === selectedStepIndex && <ChevronRight className="w-4 h-4 text-accent" />}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  disabled={selectedStepIndex === 0}
                  onClick={() => setSelectedStepIndex(selectedStepIndex - 1)}
                  className="flex-1 py-2 rounded-lg bg-[#1A1A1A] border border-white/10 text-xs font-bold text-gray-300 disabled:opacity-40 hover:text-white"
                >
                  Previous
                </button>
                <button
                  disabled={selectedStepIndex === steps.length - 1}
                  onClick={() => setSelectedStepIndex(selectedStepIndex + 1)}
                  className="flex-1 py-2 rounded-lg bg-accent text-slate-950 text-xs font-black disabled:opacity-40"
                >
                  Next Step
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
