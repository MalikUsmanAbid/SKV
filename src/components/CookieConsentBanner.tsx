import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, Check, X } from 'lucide-react';

export const CookieConsentBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if consent has already been given/declined
    const consent = localStorage.getItem('skv_cookie_consent');
    if (!consent) {
      // Delay display slightly for smooth page load
      const timer = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('skv_cookie_consent', JSON.stringify({ essential: true, analytics: true, timestamp: Date.now() }));
    setShowBanner(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('skv_cookie_consent', JSON.stringify({ essential: true, analytics: false, timestamp: Date.now() }));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5">
      <div className="bg-[#161A22] border border-accent/40 rounded-2xl p-5 shadow-2xl space-y-4 backdrop-blur-xl relative">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-accent/20 border border-accent/30 text-accent shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold text-white uppercase font-mono flex items-center gap-2">
              <span>Privacy & Cookie Choices</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-accent/20 text-accent font-sans">GDPR Compliant</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              We use strictly necessary technical cookies to remember your theme preferences and maintain security. We do not track personal identifiers without your consent.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-1 border-t border-[#2A3140]">
          <button
            onClick={handleEssentialOnly}
            className="px-3.5 py-2 rounded-lg bg-[#0F0F0F] border border-white/10 text-gray-300 hover:text-white text-xs font-semibold transition-colors"
            id="btn-cookie-essential"
          >
            Essential Only
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-4 py-2 rounded-lg bg-accent text-slate-950 hover:bg-accent-hover text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1"
            id="btn-cookie-accept"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Accept All</span>
          </button>
        </div>
      </div>
    </div>
  );
};
