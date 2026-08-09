import React, { useState } from 'react';
import { Calculator, Send, CheckCircle2, AlertCircle, Upload, ShieldCheck, Download, X, AlertTriangle } from 'lucide-react';
import { QuoteFormData } from '../types';
import { sanitizeInput, isValidEmail, isValidPhone, isRateLimited, INPUT_LIMITS } from '../utils/security';

interface QuoteFormSectionProps {
  initialService?: string;
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

export const QuoteFormSection: React.FC<QuoteFormSectionProps> = ({ initialService, isOpenModal, onCloseModal }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    projectType: initialService || 'Commercial Construction',
    projectLocation: '',
    estimatedBudget: '$1M - $5M',
    targetTimeline: '6 - 12 Months',
    projectScopeDetails: '',
    hasArchitecturalPlans: false,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  const projectTypes = [
    'Commercial Construction',
    'Residential Construction',
    'Industrial Construction',
    'Infrastructure Development',
    'Renovation & Remodeling',
    'General Contracting / Turnkey',
    'Project Management Advisory'
  ];

  const budgetRanges = [
    'Under $500,000',
    '$500,000 - $1,000,000',
    '$1,000,000 - $5,000,000',
    '$5,000,000 - $20,000,000',
    '$20,000,000+'
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    // Sanitize & Validate Full Name
    const cleanName = sanitizeInput(formData.fullName, INPUT_LIMITS.NAME);
    if (!cleanName) {
      newErrors.fullName = 'Full Name is required.';
    } else if (cleanName.length < 2) {
      newErrors.fullName = 'Please enter a valid full name.';
    }

    // Sanitize & Validate Email
    const cleanEmail = sanitizeInput(formData.email, INPUT_LIMITS.EMAIL);
    if (!cleanEmail) {
      newErrors.email = 'Email address is required.';
    } else if (!isValidEmail(cleanEmail)) {
      newErrors.email = 'Please enter a valid business email address.';
    }

    // Sanitize & Validate Phone
    const cleanPhone = sanitizeInput(formData.phone, INPUT_LIMITS.PHONE);
    if (!cleanPhone) {
      newErrors.phone = 'Phone number is required.';
    } else if (!isValidPhone(cleanPhone)) {
      newErrors.phone = 'Please enter a valid telephone number.';
    }

    // Sanitize & Validate Location
    const cleanLocation = sanitizeInput(formData.projectLocation, INPUT_LIMITS.LOCATION);
    if (!cleanLocation) {
      newErrors.projectLocation = 'Project location is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRateLimitError(null);
    setSubmissionError(null);

    if (validate()) {
      if (isRateLimited('skv_quote_form', 8000)) {
        setRateLimitError('Too many submission attempts. Please wait a few seconds before trying again.');
        return;
      }
      // Input Normalization / Sanitization on submit
      const sanitizedPayload = {
        fullName: sanitizeInput(formData.fullName, INPUT_LIMITS.NAME),
        email: sanitizeInput(formData.email, INPUT_LIMITS.EMAIL),
        phone: sanitizeInput(formData.phone, INPUT_LIMITS.PHONE),
        companyName: sanitizeInput(formData.companyName, INPUT_LIMITS.COMPANY),
        projectType: sanitizeInput(formData.projectType, INPUT_LIMITS.PROJECT_TYPE),
        projectLocation: sanitizeInput(formData.projectLocation, INPUT_LIMITS.LOCATION),
        estimatedBudget: sanitizeInput(formData.estimatedBudget, INPUT_LIMITS.BUDGET),
        targetTimeline: sanitizeInput(formData.targetTimeline, 50),
        projectScopeDetails: sanitizeInput(formData.projectScopeDetails, INPUT_LIMITS.MESSAGE),
        hasArchitecturalPlans: formData.hasArchitecturalPlans,
      };
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/quotes', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...sanitizedPayload, attachmentName: uploadedFile || '' }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Unable to submit request');
        setFormData(sanitizedPayload);
        setReferenceId(result.reference);
        setFormSubmitted(true);
      } catch (error) {
        setSubmissionError(error instanceof Error ? error.message : 'Unable to submit request');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // File Size Security Check (Max 15MB)
      if (file.size > 15 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, file: 'File exceeds maximum limit of 15MB.' }));
        return;
      }

      // Allowed File Extension & MIME Security Check
      const allowedExtensions = ['pdf', 'dwg', 'cad', 'png', 'jpg', 'jpeg'];
      const fileExt = file.name.split('.').pop()?.toLowerCase() || '';

      if (!allowedExtensions.includes(fileExt)) {
        setErrors(prev => ({ ...prev, file: 'Invalid file format. Allowed: PDF, DWG, CAD, PNG, JPG' }));
        return;
      }

      setErrors(prev => {
        const copy = { ...prev };
        delete copy.file;
        return copy;
      });

      setUploadedFile(sanitizeInput(file.name, 80));
    }
  };

  const formContent = (
    <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl relative">
      
      {!formSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          
          <div className="border-b border-white/10 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-2">
              <Calculator className="w-4 h-4" />
              <span>Interactive Quote & Estimate Generator</span>
            </div>
            <h3 className="text-2xl font-black text-white font-mono uppercase">
              Request a Construction Estimate
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Provide your project details for an itemized Bill of Quantities (BOQ) consultation with our civil engineering estimation team.
            </p>
          </div>

          {rateLimitError && (
            <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{rateLimitError}</span>
            </div>
          )}

          {/* Grid: Name, Email, Phone, Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5">Full Name *</label>
              <input
                type="text"
                maxLength={INPUT_LIMITS.NAME}
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Johnathan Miller"
                className={`w-full px-4 py-2.5 rounded-xl bg-[#0F0F0F] border ${errors.fullName ? 'border-red-500' : 'border-white/10'} text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent`}
                id="input-quote-name"
              />
              {errors.fullName && <p className="text-[10px] text-red-400 mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5">Email Address *</label>
              <input
                type="email"
                maxLength={INPUT_LIMITS.EMAIL}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="johnathan@company.com"
                className={`w-full px-4 py-2.5 rounded-xl bg-[#0F0F0F] border ${errors.email ? 'border-red-500' : 'border-white/10'} text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent`}
                id="input-quote-email"
              />
              {errors.email && <p className="text-[10px] text-red-400 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5">Phone Number *</label>
              <input
                type="tel"
                maxLength={INPUT_LIMITS.PHONE}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className={`w-full px-4 py-2.5 rounded-xl bg-[#0F0F0F] border ${errors.phone ? 'border-red-500' : 'border-white/10'} text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent`}
                id="input-quote-phone"
              />
              {errors.phone && <p className="text-[10px] text-red-400 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5">Company / Organization</label>
              <input
                type="text"
                maxLength={INPUT_LIMITS.COMPANY}
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="e.g. Apex Real Estate Corp"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0F0F0F] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent"
                id="input-quote-company"
              />
            </div>

          </div>

          {/* Grid: Project Type, Location, Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5">Project Category</label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0A0C0F] border border-[#2A3140] text-xs text-white focus:outline-none focus:border-accent"
                id="select-quote-type"
              >
                {projectTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5">Project Location *</label>
              <input
                type="text"
                maxLength={INPUT_LIMITS.LOCATION}
                value={formData.projectLocation}
                onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                placeholder="City / Region"
                className={`w-full px-4 py-2.5 rounded-xl bg-[#0A0C0F] border ${errors.projectLocation ? 'border-red-500' : 'border-[#2A3140]'} text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent`}
                id="input-quote-location"
              />
              {errors.projectLocation && <p className="text-[10px] text-red-400 mt-1">{errors.projectLocation}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5">Estimated Budget</label>
              <select
                value={formData.estimatedBudget}
                onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0A0C0F] border border-[#2A3140] text-xs text-white focus:outline-none focus:border-accent"
                id="select-quote-budget"
              >
                {budgetRanges.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Message / Scope */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5">Project Scope / Details</label>
            <textarea
              rows={3}
              maxLength={INPUT_LIMITS.MESSAGE}
              value={formData.projectScopeDetails}
              onChange={(e) => setFormData({ ...formData, projectScopeDetails: e.target.value })}
              placeholder="Describe square footage, structural specifications, site conditions, or target deadlines..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#0A0C0F] border border-[#2A3140] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent resize-none"
              id="textarea-quote-scope"
            />
          </div>

          {/* Attach Architectural Blueprint Simulator */}
          <div className="p-4 rounded-xl bg-[#0A0C0F] border border-[#2A3140] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Upload className="w-5 h-5 text-accent shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">Attach Architectural Plans / BIM Files</div>
                <div className="text-[10px] text-gray-400">Record a CAD, PDF, or DWG filename (Max 15MB). File storage can be added separately.</div>
                {errors.file && <div className="text-[10px] text-red-400 mt-0.5">{errors.file}</div>}
              </div>
            </div>

            <label className="px-4 py-2 rounded-lg bg-[#161A22] border border-[#2A3140] text-xs font-semibold text-accent hover:border-accent cursor-pointer text-center">
              <span>{uploadedFile ? uploadedFile : 'Browse Files'}</span>
              <input type="file" onChange={handleFileUpload} className="hidden" accept=".pdf,.dwg,.cad,.png,.jpg,.jpeg" />
            </label>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#2A3140]">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Confidential Tender Submission</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-accent/20 transition-all"
              id="btn-submit-quote-form"
            >
              <span>{isSubmitting ? 'Submitting…' : 'Submit & Generate Estimate'}</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
          {submissionError && <p className="text-xs text-red-400 text-center">{submissionError}</p>}

        </form>
      ) : (
        /* Instant Proposal Summary View */
        <div className="space-y-6 py-4 animate-in fade-in">
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 shrink-0" />
            <div>
              <div className="text-sm font-bold">Estimate Request Successfully Generated!</div>
              <div className="text-xs text-gray-300 mt-0.5">Reference ID: <span className="font-mono text-accent">{referenceId}</span></div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#0A0C0F] border border-[#2A3140] space-y-4">
            <h4 className="text-xs font-bold text-accent uppercase tracking-widest border-b border-[#2A3140] pb-2">
              Preliminary Estimation Brief Summary
            </h4>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase">Client Name</span>
                <span className="font-bold text-white">{formData.fullName}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase">Category</span>
                <span className="font-bold text-white">{formData.projectType}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase">Location</span>
                <span className="font-bold text-white">{formData.projectLocation}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase">Budget Bracket</span>
                <span className="font-bold text-accent">{formData.estimatedBudget}</span>
              </div>
            </div>

            <p className="text-xs text-gray-300 bg-[#161A22] p-3 rounded border border-[#2A3140]">
              Our chief civil estimator is analyzing your submission. You will receive an itemized proposal and scheduling call within 24 business hours at <span className="text-accent font-bold">{formData.email}</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => { setFormSubmitted(false); setReferenceId(null); if (onCloseModal) onCloseModal(); }}
              className="text-xs font-bold text-gray-400 hover:text-white"
            >
              Submit Another Request
            </button>

            <button
              onClick={() => alert(`Proposal Brief generated for ${formData.fullName}. Reference ID: SKV-2026`)}
              className="px-6 py-2.5 rounded-xl bg-accent text-slate-950 font-bold text-xs uppercase flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Brief</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );

  if (isOpenModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/85 backdrop-blur-md animate-in fade-in">
        <div className="max-w-2xl w-full max-h-[92vh] overflow-y-auto relative">
          {onCloseModal && (
            <button
              onClick={onCloseModal}
              className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-[#0F0F0F] border border-white/10 text-gray-400 hover:text-white hover:bg-red-500/20 transition-colors"
              aria-label="Close Modal"
              id="btn-close-quote-modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          {formContent}
        </div>
      </div>
    );
  }

  return (
    <div id="get-a-quote">
      {formContent}
    </div>
  );
};
