import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, Server, Globe, UserCheck, X } from 'lucide-react';
import { companyInfo } from '../data/companyData';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#161A22] border border-[#2A3140] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 relative text-gray-300 text-xs sm:text-sm">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2A3140] pb-4 sticky top-0 bg-[#161A22] z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-accent/15 border border-accent/30 text-accent">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-mono uppercase">Privacy Policy & Data Security</h2>
              <p className="text-xs text-gray-400">SKV Construction Compliance Statement</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg bg-[#0F0F0F] border border-white/10 text-gray-400 hover:text-white hover:bg-red-500/20 transition-colors"
            aria-label="Close Privacy Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Banner */}
        <div className="p-3.5 rounded-xl bg-accent/10 border border-accent/20 text-accent flex items-start gap-2 text-xs">
          <Lock className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            <strong>Legal Notice Placeholder:</strong> This document outlines default privacy and data collection standards for {companyInfo.legalName}. Final publication requires review by your legal department or counsel.
          </span>
        </div>

        {/* Policy Body */}
        <div className="space-y-5 text-gray-300 leading-relaxed">
          
          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2">
              <Eye className="w-4 h-4 text-accent" /> 1. Information We Collect
            </h3>
            <p className="text-xs text-gray-400">
              When you interact with the SKV Construction web platform or submit inquiry forms (such as project estimates, general contact, or tender proposals), we collect the following personal and technical information:
            </p>
            <ul className="list-disc pl-5 text-xs text-gray-400 space-y-1">
              <li><strong>Contact Information:</strong> Full Name, Corporate Email Address, Phone Number, Company/Organization Name.</li>
              <li><strong>Project Details:</strong> Site location, estimated project budget range, architectural specifications, engineering requirements, and uploaded blueprints/documents.</li>
              <li><strong>Technical Logs:</strong> IP address (sanitized for rate limiting), browser type, time stamps, and basic usage metrics.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2">
              <FileText className="w-4 h-4 text-accent" /> 2. How We Use Your Information
            </h3>
            <p className="text-xs text-gray-400">
              The information collected is strictly utilized for legitimate construction engineering and business purposes:
            </p>
            <ul className="list-disc pl-5 text-xs text-gray-400 space-y-1">
              <li>Preparing itemized Bill of Quantities (BOQ) and structural cost estimations.</li>
              <li>Scheduling site inspections, feasibility audits, and engineering consultations.</li>
              <li>Responding to commercial tenders and client support communications.</li>
              <li>Maintaining system security, preventing form spamming, and preventing automated rate-limit abuse.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2">
              <Server className="w-4 h-4 text-accent" /> 3. Data Protection & Storage Security
            </h3>
            <p className="text-xs text-gray-400">
              {companyInfo.name} enforces strict administrative, technical, and physical safeguards:
            </p>
            <ul className="list-disc pl-5 text-xs text-gray-400 space-y-1">
              <li>All web transmissions are encrypted in transit via industry-standard TLS/HTTPS protocols.</li>
              <li>Inquiry submissions are sanitized to block script injections, cross-site scripting (XSS), and malicious inputs.</li>
              <li>We do <strong>NOT</strong> sell, rent, or trade client personal information or project blueprints to third-party advertisers.</li>
              <li>Confidential tender documents are retained only for the duration required to evaluate and execute engineering contracts.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2">
              <Globe className="w-4 h-4 text-accent" /> 4. Third-Party Services & Cookies
            </h3>
            <p className="text-xs text-gray-400">
              This platform uses essential technical cookies for brand customization and session state navigation. Non-essential third-party tracking scripts are strictly restricted unless user consent is explicitly given via the cookie preferences toolbar.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-accent" /> 5. Your Rights & Contact
            </h3>
            <p className="text-xs text-gray-400">
              You have the right to request access to, correction of, or complete erasure of your submitted contact details at any time. For privacy inquiries or data removal requests, contact our Compliance Officer:
            </p>
            <div className="p-3 rounded-xl bg-[#0F0F0F] border border-[#2A3140] text-xs text-gray-300">
              <div><strong>Email:</strong> {companyInfo.email}</div>
              <div><strong>Phone:</strong> {companyInfo.phone}</div>
              <div><strong>Address:</strong> {companyInfo.address.street}, {companyInfo.address.city}, {companyInfo.address.state} {companyInfo.address.zip}</div>
            </div>
          </section>

        </div>

        {/* Footer Close Button */}
        <div className="pt-4 border-t border-[#2A3140] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-accent text-slate-950 font-bold uppercase text-xs tracking-wider hover:bg-accent-hover transition-colors"
          >
            I Understand & Accept
          </button>
        </div>

      </div>
    </div>
  );
};
