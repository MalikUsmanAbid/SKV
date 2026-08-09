import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useSiteContext } from '../context/SiteContext';

export const FAQSection: React.FC = () => {
  const { faqsData } = useSiteContext();
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [faqSearchQuery, setFaqSearchQuery] = useState<string>('');

  const categories = ['All', 'General', 'Services', 'Estimation & Cost', 'Timelines & Safety'];

  const filteredFaqs = faqsData.filter((faq) => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(faqSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-[#0F0F0F] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Client Knowledge Base</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-mono">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-gray-400">
            Find immediate answers regarding tender estimation, site safety, contract types, and project handover timelines.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="max-w-3xl mx-auto mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-accent text-slate-950 font-black'
                    : 'bg-[#1A1A1A] border border-white/10 text-gray-300 hover:border-accent'
                }`}
                id={`faq-cat-${cat}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions..."
              value={faqSearchQuery}
              onChange={(e) => setFaqSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#1A1A1A] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent"
              id="input-faq-search"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[#1A1A1A] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none hover:bg-white/5 transition-colors"
                  id={`btn-faq-toggle-${faq.id}`}
                >
                  <span className="text-sm sm:text-base font-bold text-white font-mono flex items-center gap-3">
                    <span className="text-accent text-xs font-mono bg-accent/10 px-2 py-0.5 rounded border border-accent/20 shrink-0">
                      {faq.category}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-accent shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-white/10 text-xs sm:text-sm text-gray-300 leading-relaxed animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-8 bg-[#1A1A1A] rounded-2xl border border-white/10 text-xs text-gray-400">
              No matching questions found. Try searching another term or contact our engineering team directly.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
