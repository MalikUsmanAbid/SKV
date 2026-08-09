import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  X,
  Building,
  Briefcase,
  FolderPlus,
  Users,
  MessageSquareQuote,
  HelpCircle,
  BarChart,
  Download,
  Upload,
  RotateCcw,
  Plus,
  Trash2,
  Edit2,
  Check,
  Key,
  AlertTriangle,
  LogOut,
  Save,
  History,
  Clock,
  Activity,
  Search,
  Filter,
  FileText,
  Palette,
  Sparkles,
} from 'lucide-react';
import { useSiteContext } from '../context/SiteContext';
import { ServiceItem, ProjectItem, TeamMember, TestimonialItem, FAQItem, ActivityLog } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const {
    companyInfo,
    servicesData,
    projectsData,
    teamMembers,
    testimonialsData,
    faqsData,
    statisticsData,
    activityLogs,
    activeTheme,
    updateTheme,
    updateCompanyInfo,
    addService,
    updateService,
    deleteService,
    addProject,
    updateProject,
    deleteProject,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    addFAQ,
    updateFAQ,
    deleteFAQ,
    updateStatistic,
    clearActivityLogs,
    exportSiteData,
    importSiteData,
    resetToDefaults,
  } = useSiteContext();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [activeTab, setActiveTab] = useState<'company' | 'services' | 'projects' | 'team' | 'testimonials' | 'faqs' | 'stats' | 'theme' | 'logs' | 'backup'>('company');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Activity Logs Filter State
  const [logSearchQuery, setLogSearchQuery] = useState('');
  const [logCategoryFilter, setLogCategoryFilter] = useState<'All' | ActivityLog['category']>('All');

  const filteredActivityLogs = (activityLogs || []).filter((log) => {
    const matchesCategory = logCategoryFilter === 'All' || log.category === logCategoryFilter;
    const matchesSearch =
      log.action.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
      (log.details && log.details.toLowerCase().includes(logSearchQuery.toLowerCase())) ||
      log.timestamp.toLowerCase().includes(logSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const exportLogsCSV = () => {
    const headers = ['ID', 'Timestamp', 'Category', 'Action', 'Details'];
    const rows = (activityLogs || []).map((l) => [
      l.id,
      `"${l.timestamp}"`,
      `"${l.category}"`,
      `"${l.action.replace(/"/g, '""')}"`,
      `"${(l.details || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', encodeURI(csvContent));
    downloadAnchor.setAttribute('download', `skv_activity_logs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Form states for adding items
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);

  // Local state copies for forms
  const [companyForm, setCompanyForm] = useState({ ...companyInfo });

  useEffect(() => {
    setCompanyForm({ ...companyInfo });
  }, [companyInfo]);

  const triggerSaveToast = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (failedAttempts >= 5) {
      setAuthError('Too many failed attempts. Login locked for safety.');
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: passcode }),
      });
      if (!response.ok) throw new Error('Invalid passcode');
      setIsAuthenticated(true);
      sessionStorage.setItem('skv_admin_auth', 'true');
      setAuthError('');
      setPasscode('');
    } catch {
      setFailedAttempts((prev) => prev + 1);
      setAuthError(`Invalid Passcode. (${5 - (failedAttempts + 1)} attempts remaining)`);
    }
  };

  const handleLogout = () => {
    void fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
    setIsAuthenticated(false);
    sessionStorage.removeItem('skv_admin_auth');
    onClose();
  };

  const handleCompanySave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyInfo(companyForm);
    triggerSaveToast('Company Information & Hero Content Updated Successfully!');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-dark/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#161A22] border border-[#2A3140] rounded-2xl max-w-5xl w-full h-[92vh] flex flex-col shadow-2xl relative text-gray-200 text-xs sm:text-sm overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#2A3140] px-6 py-4 bg-[#0F1218] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-accent/20 border border-accent/40 text-accent">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white uppercase font-mono tracking-wider">
                  SKV Construction Portal Control
                </h2>
                <span className="px-2 py-0.5 rounded bg-accent/20 text-accent text-[10px] font-bold">
                  CMS v2.0
                </span>
              </div>
              <p className="text-[11px] text-gray-400">Manage all website text, services, projects, stats & settings</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/25 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                id="btn-admin-logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#0A0C0F] border border-white/10 text-gray-400 hover:text-white hover:bg-red-500/20 transition-colors"
              aria-label="Close Admin Panel"
              id="btn-close-admin-panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Save Toast */}
        {saveSuccessMsg && (
          <div className="bg-emerald-500 text-slate-950 font-bold px-4 py-2 text-xs flex items-center justify-between shrink-0 animate-in fade-in">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>{saveSuccessMsg}</span>
            </div>
          </div>
        )}

        {/* Login Guard View */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-blueprint">
            <div className="bg-[#0A0C0F] border border-[#2A3140] rounded-2xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl text-center">
              <div className="w-12 h-12 rounded-2xl bg-accent/20 border border-accent/30 text-accent mx-auto flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white uppercase font-mono">Admin Authorization Required</h3>
                <p className="text-xs text-gray-400 mt-1">Enter master passcode to access the website content management system.</p>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs flex items-center justify-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Enter administrator passcode"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#161A22] border border-[#2A3140] text-xs text-white placeholder-gray-500 text-center focus:outline-none focus:border-accent"
                    id="input-admin-passcode"
                  />
                  <p className="text-[10px] text-gray-500 mt-1">Your passcode is configured securely in the deployment environment.</p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-accent hover:bg-accent-hover text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
                  id="btn-admin-login-submit"
                >
                  Authorize & Access Panel
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation Tabs */}
            <div className="w-full md:w-64 bg-[#0A0C0F] border-b md:border-b-0 md:border-r border-[#2A3140] p-3 space-y-1 overflow-x-auto md:overflow-y-auto shrink-0 flex md:flex-col gap-1 md:gap-0">
              
              <button
                onClick={() => setActiveTab('company')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors whitespace-nowrap ${
                  activeTab === 'company' ? 'bg-accent text-slate-950 font-bold' : 'text-gray-300 hover:bg-[#161A22]'
                }`}
                id="tab-admin-company"
              >
                <Building className="w-4 h-4 shrink-0" />
                <span>Company & Hero Info</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors whitespace-nowrap ${
                  activeTab === 'services' ? 'bg-accent text-slate-950 font-bold' : 'text-gray-300 hover:bg-[#161A22]'
                }`}
                id="tab-admin-services"
              >
                <Briefcase className="w-4 h-4 shrink-0" />
                <span>Services ({servicesData.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors whitespace-nowrap ${
                  activeTab === 'projects' ? 'bg-accent text-slate-950 font-bold' : 'text-gray-300 hover:bg-[#161A22]'
                }`}
                id="tab-admin-projects"
              >
                <FolderPlus className="w-4 h-4 shrink-0" />
                <span>Projects ({projectsData.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('stats')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors whitespace-nowrap ${
                  activeTab === 'stats' ? 'bg-accent text-slate-950 font-bold' : 'text-gray-300 hover:bg-[#161A22]'
                }`}
                id="tab-admin-stats"
              >
                <BarChart className="w-4 h-4 shrink-0" />
                <span>Metrics & Stats</span>
              </button>

              <button
                onClick={() => setActiveTab('team')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors whitespace-nowrap ${
                  activeTab === 'team' ? 'bg-accent text-slate-950 font-bold' : 'text-gray-300 hover:bg-[#161A22]'
                }`}
                id="tab-admin-team"
              >
                <Users className="w-4 h-4 shrink-0" />
                <span>Leadership ({teamMembers.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('testimonials')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors whitespace-nowrap ${
                  activeTab === 'testimonials' ? 'bg-accent text-slate-950 font-bold' : 'text-gray-300 hover:bg-[#161A22]'
                }`}
                id="tab-admin-testimonials"
              >
                <MessageSquareQuote className="w-4 h-4 shrink-0" />
                <span>Reviews ({testimonialsData.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('faqs')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors whitespace-nowrap ${
                  activeTab === 'faqs' ? 'bg-accent text-slate-950 font-bold' : 'text-gray-300 hover:bg-[#161A22]'
                }`}
                id="tab-admin-faqs"
              >
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span>FAQ Items ({faqsData.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('theme')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors whitespace-nowrap ${
                  activeTab === 'theme' ? 'bg-accent text-slate-950 font-bold' : 'text-gray-300 hover:bg-[#161A22]'
                }`}
                id="tab-admin-theme"
              >
                <Palette className="w-4 h-4 shrink-0 text-amber-400" />
                <div className="flex items-center justify-between w-full">
                  <span>Brand Theme & Colors</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold uppercase">
                    CMS
                  </span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('logs')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors whitespace-nowrap ${
                  activeTab === 'logs' ? 'bg-accent text-slate-950 font-bold' : 'text-gray-300 hover:bg-[#161A22]'
                }`}
                id="tab-admin-logs"
              >
                <History className="w-4 h-4 shrink-0" />
                <div className="flex items-center justify-between w-full">
                  <span>Activity Logs</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    activeTab === 'logs' ? 'bg-slate-950/20 text-slate-900' : 'bg-[#161A22] text-accent'
                  }`}>
                    {activityLogs?.length || 0}
                  </span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('backup')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors whitespace-nowrap ${
                  activeTab === 'backup' ? 'bg-accent text-slate-950 font-bold' : 'text-gray-300 hover:bg-[#161A22]'
                }`}
                id="tab-admin-backup"
              >
                <RotateCcw className="w-4 h-4 shrink-0" />
                <span>Backup & Export JSON</span>
              </button>

            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 overflow-y-auto bg-[#161A22]">
              
              {/* TAB 1: COMPANY & HERO INFO */}
              {activeTab === 'company' && (
                <form onSubmit={handleCompanySave} className="space-y-6 max-w-3xl">
                  <div className="border-b border-[#2A3140] pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white uppercase font-mono">Company Identity & Hero Headline</h3>
                      <p className="text-xs text-gray-400">Updates live site text across top banner, hero card and contact footer.</p>
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-accent text-slate-950 font-bold text-xs uppercase flex items-center gap-1.5 shadow-lg hover:bg-accent-hover transition-colors"
                      id="btn-save-company-info"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Company Display Name</label>
                      <input
                        type="text"
                        value={companyForm.name}
                        onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg bg-[#0A0C0F] border border-[#2A3140] text-xs text-white focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Legal Entity Name</label>
                      <input
                        type="text"
                        value={companyForm.legalName}
                        onChange={(e) => setCompanyForm({ ...companyForm, legalName: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg bg-[#0A0C0F] border border-[#2A3140] text-xs text-white focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Hero Sub-Headline Quote</label>
                      <input
                        type="text"
                        value={companyForm.heroHeadline}
                        onChange={(e) => setCompanyForm({ ...companyForm, heroHeadline: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg bg-[#0A0C0F] border border-[#2A3140] text-xs text-white focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={companyForm.phone}
                        onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg bg-[#0A0C0F] border border-[#2A3140] text-xs text-white focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Corporate Email</label>
                      <input
                        type="email"
                        value={companyForm.email}
                        onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg bg-[#0A0C0F] border border-[#2A3140] text-xs text-white focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Street Address</label>
                      <input
                        type="text"
                        value={companyForm.address.street}
                        onChange={(e) => setCompanyForm({ ...companyForm, address: { ...companyForm.address, street: e.target.value } })}
                        className="w-full px-3.5 py-2 rounded-lg bg-[#0A0C0F] border border-[#2A3140] text-xs text-white focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Hero Main Description</label>
                    <textarea
                      rows={3}
                      value={companyForm.heroDescription}
                      onChange={(e) => setCompanyForm({ ...companyForm, heroDescription: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#0A0C0F] border border-[#2A3140] text-xs text-white focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Company Story (About Us Tab)</label>
                    <textarea
                      rows={4}
                      value={companyForm.aboutStory}
                      onChange={(e) => setCompanyForm({ ...companyForm, aboutStory: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#0A0C0F] border border-[#2A3140] text-xs text-white focus:outline-none focus:border-accent"
                    />
                  </div>
                </form>
              )}

              {/* TAB 2: SERVICES MANAGER */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div className="border-b border-[#2A3140] pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white uppercase font-mono">Services Offered</h3>
                      <p className="text-xs text-gray-400">Add, edit or delete engineering & construction services.</p>
                    </div>
                    <button
                      onClick={() => {
                        addService({
                          title: 'New Civil Engineering Service',
                          iconName: 'Building2',
                          shortDescription: 'Custom high-spec civil engineering and project management service.',
                          fullDescription: 'Comprehensive end-to-end execution involving structural design, material sourcing, and site supervision.',
                          features: ['Custom Planning', 'ISO Site Safety', 'Dedicated Project Director'],
                          deliverables: ['Bill of Quantities', 'As-Built Drawings', 'Safety Logs'],
                          imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&q=80&w=800',
                          featured: true,
                        });
                        triggerSaveToast('New Service Added!');
                      }}
                      className="px-4 py-2 rounded-xl bg-accent text-slate-950 font-bold text-xs uppercase flex items-center gap-1.5 shadow-lg"
                      id="btn-add-new-service"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Service</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {servicesData.map((srv) => (
                      <div key={srv.id} className="p-4 rounded-xl bg-[#0A0C0F] border border-[#2A3140] space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1 flex-1">
                            <input
                              type="text"
                              value={srv.title}
                              onChange={(e) => updateService(srv.id, { title: e.target.value })}
                              className="text-sm font-bold text-white bg-transparent border-b border-transparent focus:border-accent focus:outline-none w-full"
                            />
                            <textarea
                              rows={2}
                              value={srv.shortDescription}
                              onChange={(e) => updateService(srv.id, { shortDescription: e.target.value })}
                              className="text-xs text-gray-400 bg-transparent border-b border-transparent focus:border-accent focus:outline-none w-full"
                            />
                          </div>

                          <button
                            onClick={() => {
                              deleteService(srv.id);
                              triggerSaveToast('Service deleted');
                            }}
                            className="p-2 rounded bg-red-500/15 text-red-400 hover:bg-red-500/25 shrink-0"
                            title="Delete Service"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: PROJECTS MANAGER */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="border-b border-[#2A3140] pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white uppercase font-mono">Projects Portfolio</h3>
                      <p className="text-xs text-gray-400">Add or modify landmark projects in the portfolio section.</p>
                    </div>
                    <button
                      onClick={() => {
                        addProject({
                          title: 'New Infrastructure Development',
                          category: 'Commercial',
                          location: 'Central Metro District',
                          client: 'Metropolitan Real Estate Trust',
                          completionDate: '2026',
                          status: 'In Progress',
                          shortDescription: 'State-of-the-art commercial high-rise tower with BIM clash detection.',
                          fullDescription: 'Comprehensive turnkey project incorporating post-tensioned slab construction and zero-harm safety standards.',
                          areaSize: '150,000 sq ft',
                          budgetRange: '$12.5 Million',
                          imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&q=80&w=800',
                          galleryImages: [],
                          keySpecs: [{ label: 'Height', value: '18 Storeys' }],
                          featured: true,
                        });
                        triggerSaveToast('New Project Added!');
                      }}
                      className="px-4 py-2 rounded-xl bg-accent text-slate-950 font-bold text-xs uppercase flex items-center gap-1.5 shadow-lg"
                      id="btn-add-new-project"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Project</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projectsData.map((proj) => (
                      <div key={proj.id} className="p-4 rounded-xl bg-[#0A0C0F] border border-[#2A3140] space-y-3">
                        <div className="flex justify-between items-start">
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                            className="text-sm font-bold text-white bg-transparent border-b border-transparent focus:border-accent focus:outline-none w-full"
                          />
                          <button
                            onClick={() => {
                              deleteProject(proj.id);
                              triggerSaveToast('Project deleted');
                            }}
                            className="p-1.5 rounded bg-red-500/15 text-red-400 hover:bg-red-500/25 shrink-0 ml-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <label className="text-[10px] text-gray-500 uppercase">Category</label>
                            <select
                              value={proj.category}
                              onChange={(e) => updateProject(proj.id, { category: e.target.value as any })}
                              className="w-full bg-[#161A22] border border-[#2A3140] rounded px-2 py-1 text-white text-xs"
                            >
                              <option value="Residential">Residential</option>
                              <option value="Commercial">Commercial</option>
                              <option value="Industrial">Industrial</option>
                              <option value="Infrastructure">Infrastructure</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-[10px] text-gray-500 uppercase">Budget Range</label>
                            <input
                              type="text"
                              value={proj.budgetRange}
                              onChange={(e) => updateProject(proj.id, { budgetRange: e.target.value })}
                              className="w-full bg-[#161A22] border border-[#2A3140] rounded px-2 py-1 text-white text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] text-gray-500 uppercase">Image URL</label>
                          <input
                            type="text"
                            value={proj.imageUrl}
                            onChange={(e) => updateProject(proj.id, { imageUrl: e.target.value })}
                            className="w-full bg-[#161A22] border border-[#2A3140] rounded px-2 py-1 text-white text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: METRICS & STATS */}
              {activeTab === 'stats' && (
                <div className="space-y-6">
                  <div className="border-b border-[#2A3140] pb-3">
                    <h3 className="text-base font-bold text-white uppercase font-mono">Hero Statistics Cards</h3>
                    <p className="text-xs text-gray-400">Edit key figures displayed under the hero banner.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {statisticsData.map((stat) => (
                      <div key={stat.id} className="p-4 rounded-xl bg-[#0A0C0F] border border-[#2A3140] space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-accent font-mono">[{stat.id}]</span>
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => updateStatistic(stat.id, { label: e.target.value })}
                            className="text-xs font-bold text-white bg-transparent border-b border-transparent focus:border-accent focus:outline-none flex-1"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-gray-500 uppercase">Value Display</label>
                            <input
                              type="text"
                              value={stat.value}
                              onChange={(e) => updateStatistic(stat.id, { value: e.target.value })}
                              className="w-full bg-[#161A22] border border-[#2A3140] rounded px-2 py-1 text-white text-xs font-mono font-bold"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-gray-500 uppercase">Subtext</label>
                            <input
                              type="text"
                              value={stat.description}
                              onChange={(e) => updateStatistic(stat.id, { description: e.target.value })}
                              className="w-full bg-[#161A22] border border-[#2A3140] rounded px-2 py-1 text-white text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: LEADERSHIP TEAM */}
              {activeTab === 'team' && (
                <div className="space-y-6">
                  <div className="border-b border-[#2A3140] pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white uppercase font-mono">Leadership & Engineering Team</h3>
                      <p className="text-xs text-gray-400">Manage executive bios and engineering directors.</p>
                    </div>
                    <button
                      onClick={() => {
                        addTeamMember({
                          name: 'Senior Project Manager',
                          role: 'Lead Structural Engineer',
                          bio: 'Over 15 years leading major civil projects and commercial handovers.',
                          experienceYears: '15+ Yrs Exp',
                          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
                          specialties: ['Structural BIM', 'Site Safety'],
                        });
                        triggerSaveToast('Team member added!');
                      }}
                      className="px-4 py-2 rounded-xl bg-accent text-slate-950 font-bold text-xs uppercase flex items-center gap-1.5 shadow-lg"
                      id="btn-add-team-member"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Team Member</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="p-4 rounded-xl bg-[#0A0C0F] border border-[#2A3140] space-y-3">
                        <div className="flex justify-between items-start">
                          <input
                            type="text"
                            value={member.name}
                            onChange={(e) => updateTeamMember(member.id, { name: e.target.value })}
                            className="text-sm font-bold text-white bg-transparent border-b border-transparent focus:border-accent focus:outline-none w-full"
                          />
                          <button
                            onClick={() => {
                              deleteTeamMember(member.id);
                              triggerSaveToast('Team member removed');
                            }}
                            className="p-1.5 rounded bg-red-500/15 text-red-400 hover:bg-red-500/25 shrink-0 ml-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div>
                          <label className="text-[10px] text-gray-500 uppercase">Title / Role</label>
                          <input
                            type="text"
                            value={member.role}
                            onChange={(e) => updateTeamMember(member.id, { role: e.target.value })}
                            className="w-full bg-[#161A22] border border-[#2A3140] rounded px-2 py-1 text-white text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-gray-500 uppercase">Short Bio</label>
                          <textarea
                            rows={2}
                            value={member.bio}
                            onChange={(e) => updateTeamMember(member.id, { bio: e.target.value })}
                            className="w-full bg-[#161A22] border border-[#2A3140] rounded px-2 py-1 text-white text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: TESTIMONIALS */}
              {activeTab === 'testimonials' && (
                <div className="space-y-6">
                  <div className="border-b border-[#2A3140] pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white uppercase font-mono">Client Testimonials & Reviews</h3>
                      <p className="text-xs text-gray-400">Add or edit verified client reviews.</p>
                    </div>
                    <button
                      onClick={() => {
                        addTestimonial({
                          clientName: 'Arthur Vance',
                          clientRole: 'Director of Development',
                          companyName: 'Vance Commercial Properties',
                          projectTitle: 'Apex Tech Park Commercial Tower',
                          testimonial: 'SKV Construction delivered our Grade-A office complex 2 weeks ahead of target schedule with flawless site safety governance.',
                          rating: 5,
                          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
                          verifiedClient: true,
                        });
                        triggerSaveToast('Testimonial added!');
                      }}
                      className="px-4 py-2 rounded-xl bg-accent text-slate-950 font-bold text-xs uppercase flex items-center gap-1.5 shadow-lg"
                      id="btn-add-testimonial"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Review</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {testimonialsData.map((tst) => (
                      <div key={tst.id} className="p-4 rounded-xl bg-[#0A0C0F] border border-[#2A3140] space-y-3">
                        <div className="flex justify-between items-start">
                          <input
                            type="text"
                            value={tst.clientName}
                            onChange={(e) => updateTestimonial(tst.id, { clientName: e.target.value })}
                            className="text-sm font-bold text-white bg-transparent border-b border-transparent focus:border-accent focus:outline-none w-full"
                          />
                          <button
                            onClick={() => {
                              deleteTestimonial(tst.id);
                              triggerSaveToast('Review removed');
                            }}
                            className="p-1.5 rounded bg-red-500/15 text-red-400 hover:bg-red-500/25 shrink-0 ml-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <textarea
                          rows={2}
                          value={tst.testimonial}
                          onChange={(e) => updateTestimonial(tst.id, { testimonial: e.target.value })}
                          className="w-full bg-[#161A22] border border-[#2A3140] rounded px-2 py-1 text-white text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: FAQS */}
              {activeTab === 'faqs' && (
                <div className="space-y-6">
                  <div className="border-b border-[#2A3140] pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white uppercase font-mono">Frequently Asked Questions</h3>
                      <p className="text-xs text-gray-400">Edit or add questions to the FAQ accordion.</p>
                    </div>
                    <button
                      onClick={() => {
                        addFAQ({
                          category: 'Estimation & Cost',
                          question: 'How do you structure fixed-price engineering contracts?',
                          answer: 'Our contracts feature transparent line-item pricing derived from BIM volume estimations, eliminating surprise variation costs during execution.',
                        });
                        triggerSaveToast('FAQ item added!');
                      }}
                      className="px-4 py-2 rounded-xl bg-accent text-slate-950 font-bold text-xs uppercase flex items-center gap-1.5 shadow-lg"
                      id="btn-add-faq"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add FAQ Item</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {faqsData.map((faq) => (
                      <div key={faq.id} className="p-4 rounded-xl bg-[#0A0C0F] border border-[#2A3140] space-y-3">
                        <div className="flex justify-between items-start">
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => updateFAQ(faq.id, { question: e.target.value })}
                            className="text-xs font-bold text-white bg-transparent border-b border-transparent focus:border-accent focus:outline-none w-full"
                          />
                          <button
                            onClick={() => {
                              deleteFAQ(faq.id);
                              triggerSaveToast('FAQ item removed');
                            }}
                            className="p-1.5 rounded bg-red-500/15 text-red-400 hover:bg-red-500/25 shrink-0 ml-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <textarea
                          rows={2}
                          value={faq.answer}
                          onChange={(e) => updateFAQ(faq.id, { answer: e.target.value })}
                          className="w-full bg-[#161A22] border border-[#2A3140] rounded px-2 py-1 text-white text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 8: BACKUP & EXPORT */}
              {activeTab === 'backup' && (
                <div className="space-y-6 max-w-2xl">
                  <div className="border-b border-[#2A3140] pb-3">
                    <h3 className="text-base font-bold text-white uppercase font-mono">Backup, Restore & Export JSON</h3>
                    <p className="text-xs text-gray-400">Save a complete JSON snapshot of all edits or restore original factory defaults.</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0A0C0F] border border-[#2A3140] space-y-3">
                    <div className="flex items-center gap-3">
                      <Download className="w-5 h-5 text-accent" />
                      <div>
                        <div className="text-xs font-bold text-white">Export Website State (JSON)</div>
                        <div className="text-[11px] text-gray-400">Download a full backup file containing all text, services, projects & team edits.</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        exportSiteData();
                        triggerSaveToast('Site Data JSON Exported!');
                      }}
                      className="px-4 py-2 rounded-xl bg-accent text-slate-950 font-bold text-xs uppercase tracking-wider"
                      id="btn-export-json"
                    >
                      Export Backup JSON
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0A0C0F] border border-[#2A3140] space-y-3">
                    <div className="flex items-center gap-3">
                      <Upload className="w-5 h-5 text-accent" />
                      <div>
                        <div className="text-xs font-bold text-white">Import JSON Backup</div>
                        <div className="text-[11px] text-gray-400">Restore previously saved website configuration from a JSON file.</div>
                      </div>
                    </div>
                    <label className="inline-block px-4 py-2 rounded-xl bg-[#161A22] border border-[#2A3140] text-accent font-bold text-xs uppercase cursor-pointer hover:border-accent">
                      <span>Choose Backup File</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              if (event.target?.result) {
                                const success = importSiteData(event.target.result as string);
                                if (success) {
                                  triggerSaveToast('Site Data Restored from Backup JSON!');
                                } else {
                                  alert('Failed to parse invalid backup JSON file.');
                                }
                              }
                            };
                            reader.readAsText(e.target.files[0]);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-3">
                    <div className="flex items-center gap-3">
                      <RotateCcw className="w-5 h-5 text-red-400" />
                      <div>
                        <div className="text-xs font-bold text-red-400">Reset to Original Defaults</div>
                        <div className="text-[11px] text-gray-400">Wipe all custom edits and return to original initial content.</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to reset all content to default settings? This cannot be undone.')) {
                          resetToDefaults();
                          triggerSaveToast('Site restored to original defaults.');
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-red-500 text-white font-bold text-xs uppercase tracking-wider hover:bg-red-600 transition-colors"
                      id="btn-reset-defaults"
                    >
                      Reset to Factory Defaults
                    </button>
                  </div>

                </div>
              )}

              {/* TAB 9: ACTIVITY LOGS */}
              {activeTab === 'logs' && (
                <div className="space-y-6 max-w-4xl">
                  {/* Header & Main Controls */}
                  <div className="border-b border-[#2A3140] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <History className="w-5 h-5 text-accent" />
                        <h3 className="text-base font-bold text-white uppercase font-mono">Administrative Audit & Activity Logs</h3>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Timestamped history tracking administrative changes, status updates, and CMS edits.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={exportLogsCSV}
                        disabled={!activityLogs || activityLogs.length === 0}
                        className="px-3.5 py-2 rounded-xl bg-[#0A0C0F] border border-[#2A3140] hover:border-accent text-accent font-bold text-xs flex items-center gap-2 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                        id="btn-export-logs-csv"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export CSV</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to clear all activity logs? This cannot be undone.')) {
                            clearActivityLogs();
                            triggerSaveToast('Activity logs cleared.');
                          }
                        }}
                        disabled={!activityLogs || activityLogs.length === 0}
                        className="px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                        id="btn-clear-logs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear History</span>
                      </button>
                    </div>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-2xl bg-[#0A0C0F] border border-[#2A3140] flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center shrink-0">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[11px] text-gray-400 uppercase font-mono tracking-wider">Total Actions Logged</div>
                        <div className="text-lg font-black text-white font-mono">{activityLogs?.length || 0} Records</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#0A0C0F] border border-[#2A3140] flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[11px] text-gray-400 uppercase font-mono tracking-wider">Latest Activity</div>
                        <div className="text-xs font-bold text-white font-mono truncate max-w-[180px]">
                          {activityLogs && activityLogs.length > 0 ? activityLogs[0].timestamp : 'No activity yet'}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#0A0C0F] border border-[#2A3140] flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[11px] text-gray-400 uppercase font-mono tracking-wider">System Status</div>
                        <div className="text-xs font-bold text-emerald-400 font-mono">
                          Active & Logging
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Search and Category Filter Bar */}
                  <div className="bg-[#0A0C0F] border border-[#2A3140] rounded-2xl p-4 space-y-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                      {/* Search Box */}
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search logs by keyword (e.g., 'updated', 'hero', 'status')..."
                          value={logSearchQuery}
                          onChange={(e) => setLogSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#161A22] border border-[#2A3140] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-accent"
                          id="input-search-logs"
                        />
                        {logSearchQuery && (
                          <button
                            onClick={() => setLogSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                      <span className="text-[10px] text-gray-400 uppercase font-mono flex items-center gap-1 mr-1 shrink-0">
                        <Filter className="w-3 h-3" /> Filter:
                      </span>
                      {(['All', 'Company', 'Services', 'Projects', 'Team', 'Testimonials', 'FAQs', 'Stats', 'System'] as const).map((cat) => {
                        const count = cat === 'All'
                          ? (activityLogs?.length || 0)
                          : (activityLogs || []).filter((l) => l.category === cat).length;
                        return (
                          <button
                            key={cat}
                            onClick={() => setLogCategoryFilter(cat)}
                            className={`px-3 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all border ${
                              logCategoryFilter === cat
                                ? 'bg-accent text-slate-950 border-accent font-bold shadow'
                                : 'bg-[#161A22] text-gray-400 border-[#2A3140] hover:text-white hover:border-gray-500'
                            }`}
                          >
                            {cat} {count > 0 && `(${count})`}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Logs Feed List */}
                  <div className="space-y-3">
                    {filteredActivityLogs.length === 0 ? (
                      <div className="p-10 text-center bg-[#0A0C0F] border border-[#2A3140] rounded-2xl space-y-3">
                        <History className="w-8 h-8 text-gray-500 mx-auto" />
                        <div className="text-sm font-bold text-gray-300">No Activity Logs Found</div>
                        <p className="text-xs text-gray-500 max-w-sm mx-auto">
                          {logSearchQuery || logCategoryFilter !== 'All'
                            ? 'No logged actions match your current search or category filter criteria.'
                            : 'No administrative activity has been recorded yet. Any updates to content will automatically appear here.'}
                        </p>
                        {(logSearchQuery || logCategoryFilter !== 'All') && (
                          <button
                            onClick={() => {
                              setLogSearchQuery('');
                              setLogCategoryFilter('All');
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-[#161A22] border border-[#2A3140] text-accent text-xs font-bold hover:border-accent"
                          >
                            Reset Log Filters
                          </button>
                        )}
                      </div>
                    ) : (
                      filteredActivityLogs.map((log) => {
                        let categoryBadgeClass = 'bg-violet-500/15 text-violet-400 border-violet-500/30';
                        if (log.category === 'Company') categoryBadgeClass = 'bg-amber-500/15 text-amber-400 border-amber-500/30';
                        if (log.category === 'Services') categoryBadgeClass = 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
                        if (log.category === 'Projects') categoryBadgeClass = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
                        if (log.category === 'Team') categoryBadgeClass = 'bg-blue-500/15 text-blue-400 border-blue-500/30';
                        if (log.category === 'Testimonials') categoryBadgeClass = 'bg-purple-500/15 text-purple-400 border-purple-500/30';
                        if (log.category === 'FAQs') categoryBadgeClass = 'bg-pink-500/15 text-pink-400 border-pink-500/30';
                        if (log.category === 'Stats') categoryBadgeClass = 'bg-orange-500/15 text-orange-400 border-orange-500/30';

                        return (
                          <div
                            key={log.id}
                            className="p-4 rounded-2xl bg-[#0A0C0F] border border-[#2A3140] hover:border-gray-600 transition-all space-y-2.5 group"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${categoryBadgeClass}`}>
                                  {log.category}
                                </span>
                                <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-gray-500" />
                                  {log.timestamp}
                                </span>
                              </div>
                              <span className="text-[10px] font-mono text-gray-600 group-hover:text-gray-400 transition-colors">
                                ID: {log.id}
                              </span>
                            </div>

                            <div className="flex items-start gap-2.5">
                              <div className="p-1 rounded bg-accent/10 text-accent mt-0.5 shrink-0">
                                <Activity className="w-3.5 h-3.5" />
                              </div>
                              <div className="space-y-1 flex-1">
                                <div className="text-xs font-bold text-white leading-snug">
                                  {log.action}
                                </div>
                                {log.details && (
                                  <div className="p-2.5 rounded-xl bg-[#161A22] border border-[#2A3140]/60 text-[11px] text-gray-300 font-sans leading-relaxed flex items-start gap-2">
                                    <FileText className="w-3.5 h-3.5 text-gray-500 shrink-0 mt-0.5" />
                                    <span>{log.details}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* TAB 10: BRAND THEME & COLORS */}
              {activeTab === 'theme' && (
                <div className="space-y-6 max-w-4xl">
                  {/* Header */}
                  <div className="border-b border-[#2A3140] pb-4">
                    <div className="flex items-center gap-2">
                      <Palette className="w-5 h-5 text-accent" />
                      <h3 className="text-base font-bold text-white uppercase font-mono">Brand Theme & Accent Color Management</h3>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Manage the primary brand accent color applied across all buttons, highlights, badges, and borders website-wide.
                      <span className="text-accent font-semibold ml-1">(Public color toolbar disabled; admin-only controls active)</span>
                    </p>
                  </div>

                  {/* Active Theme Summary Card */}
                  <div className="p-5 rounded-2xl bg-[#0A0C0F] border border-[#2A3140] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-slate-950 font-black shadow-lg shrink-0">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-[11px] text-gray-400 uppercase font-mono tracking-wider">Active Brand Theme</div>
                        <div className="text-lg font-bold text-white uppercase font-mono flex items-center gap-2">
                          <span>{activeTheme} Theme</span>
                          <span className="px-2 py-0.5 text-[10px] rounded-full bg-accent/20 text-accent font-bold">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#161A22] border border-[#2A3140] text-xs text-gray-300 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Changes persist across user sessions & devices</span>
                    </div>
                  </div>

                  {/* Theme Preset Grid */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                      <Palette className="w-4 h-4 text-accent" />
                      <span>Select Preset Brand Color</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {[
                        { id: 'amber', name: 'Amber Gold', hex: '#D97706', desc: 'Warm corporate gold' },
                        { id: 'orange', name: 'Safety Orange', hex: '#EA580C', desc: 'High-visibility construction' },
                        { id: 'blue', name: 'Architectural Blue', hex: '#2563EB', desc: 'Precision engineering blue' },
                        { id: 'bronze', name: 'Warm Bronze', hex: '#B45309', desc: 'High-end metallic bronze' },
                        { id: 'emerald', name: 'Industrial Emerald', hex: '#10B981', desc: 'Environmental & green build' },
                        { id: 'ruby', name: 'Ruby Steel', hex: '#DC2626', desc: 'Heavy equipment crimson' },
                        { id: 'purple', name: 'High-Tech Violet', hex: '#7C3AED', desc: 'Modern engineering purple' },
                        { id: 'yellow', name: 'Caution Yellow', hex: '#EAB308', desc: 'High-visibility safety yellow' },
                      ].map((preset) => {
                        const isSelected = activeTheme === preset.id;
                        return (
                          <button
                            key={preset.id}
                            onClick={() => {
                              updateTheme(preset.id);
                              triggerSaveToast(`Brand theme updated to ${preset.name}!`);
                            }}
                            className={`p-4 rounded-2xl text-left transition-all relative group flex flex-col justify-between h-32 border ${
                              isSelected
                                ? 'bg-accent/15 border-accent shadow-xl ring-1 ring-accent'
                                : 'bg-[#0A0C0F] border-[#2A3140] hover:border-gray-500 hover:bg-[#12151B]'
                            }`}
                            id={`admin-theme-btn-${preset.id}`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="w-7 h-7 rounded-full border-2 border-white/30 shadow-md" style={{ backgroundColor: preset.hex }} />
                              {isSelected && (
                                <span className="w-5 h-5 rounded-full bg-accent text-slate-950 flex items-center justify-center font-bold">
                                  <Check className="w-3.5 h-3.5" />
                                </span>
                              )}
                            </div>

                            <div>
                              <div className="text-xs font-bold text-white group-hover:text-accent transition-colors">
                                {preset.name}
                              </div>
                              <div className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">
                                {preset.desc}
                              </div>
                            </div>

                            <div className="text-[10px] font-mono text-gray-500 uppercase">
                              HEX: {preset.hex}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* UI Elements Preview Box */}
                  <div className="bg-[#0A0C0F] border border-[#2A3140] rounded-2xl p-5 space-y-4">
                    <div className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center justify-between">
                      <span>Live Site Element Preview</span>
                      <span className="text-[10px] text-accent font-mono font-normal">Real-time styling test</span>
                    </div>

                    <div className="p-4 rounded-xl bg-[#161A22] border border-[#2A3140] space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <button className="px-4 py-2 rounded-lg bg-accent text-slate-950 font-bold text-xs uppercase tracking-wider shadow">
                          Primary Button
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-[#0A0C0F] border border-accent/40 text-accent font-semibold text-xs">
                          Secondary Outline
                        </button>
                        <span className="px-2.5 py-1 rounded-full bg-accent/20 text-accent font-bold text-[11px] flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Badge Highlight
                        </span>
                      </div>

                      <div className="p-3 rounded-xl border border-accent/30 bg-accent/5 text-xs text-gray-300">
                        <span className="text-accent font-bold">SKV Construction Accent:</span> All primary call-to-actions, hero highlights, hover states, and key metrics adjust automatically when you select a theme above.
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
