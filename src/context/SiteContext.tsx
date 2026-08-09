import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  CompanyInfo,
  ServiceItem,
  ProjectItem,
  TeamMember,
  TestimonialItem,
  FAQItem,
  StatisticItem,
  ProcessStep,
  ActivityLog,
} from '../types';
import {
  companyInfo as defaultCompanyInfo,
  servicesData as defaultServices,
  projectsData as defaultProjects,
  teamMembers as defaultTeam,
  testimonialsData as defaultTestimonials,
  faqData as defaultFaqs,
  statisticsData as defaultStatistics,
  processSteps as defaultProcessSteps,
} from '../data/companyData';
import { sanitizeInput } from '../utils/security';

const STORAGE_KEY = 'skg_builders_site_data_v1';

export interface SiteDataState {
  activeTheme: string;
  companyInfo: CompanyInfo;
  servicesData: ServiceItem[];
  projectsData: ProjectItem[];
  teamMembers: TeamMember[];
  testimonialsData: TestimonialItem[];
  faqsData: FAQItem[];
  statisticsData: StatisticItem[];
  processStepsData: ProcessStep[];
  activityLogs: ActivityLog[];
}

interface SiteContextType extends SiteDataState {
  updateTheme: (themeId: string) => void;
  updateCompanyInfo: (info: Partial<CompanyInfo>) => void;
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, project: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
  addTestimonial: (testimonial: Omit<TestimonialItem, 'id'>) => void;
  updateTestimonial: (id: string, testimonial: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;
  addFAQ: (faq: Omit<FAQItem, 'id'>) => void;
  updateFAQ: (id: string, faq: Partial<FAQItem>) => void;
  deleteFAQ: (id: string) => void;
  updateStatistic: (id: string, stat: Partial<StatisticItem>) => void;
  logActivity: (action: string, category: ActivityLog['category'], details?: string) => void;
  clearActivityLogs: () => void;
  exportSiteData: () => void;
  importSiteData: (jsonStr: string) => boolean;
  resetToDefaults: () => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

const initialLogs: ActivityLog[] = [
  {
    id: 'log-1',
    timestamp: new Date(Date.now() - 3600000 * 5).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    action: 'Website Configuration Loaded',
    category: 'System',
    details: 'Initial content schema initialized with company identity and default portfolio data.',
  },
  {
    id: 'log-2',
    timestamp: new Date(Date.now() - 3600000 * 2).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    action: 'Admin Panel Access Authorized',
    category: 'System',
    details: 'Authorized master passcode session started.',
  },
];

const initialData: SiteDataState = {
  activeTheme: 'amber',
  companyInfo: defaultCompanyInfo,
  servicesData: defaultServices,
  projectsData: defaultProjects,
  teamMembers: defaultTeam,
  testimonialsData: defaultTestimonials,
  faqsData: defaultFaqs,
  statisticsData: defaultStatistics,
  processStepsData: defaultProcessSteps,
  activityLogs: initialLogs,
};

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);

const normaliseSiteData = (value: unknown): SiteDataState => {
  if (!isRecord(value)) return initialData;
  const company = isRecord(value.companyInfo) ? value.companyInfo : {};
  return {
    activeTheme: typeof value.activeTheme === 'string' ? value.activeTheme : initialData.activeTheme,
    companyInfo: { ...defaultCompanyInfo, ...company, address: { ...defaultCompanyInfo.address, ...(isRecord(company.address) ? company.address : {}) } } as CompanyInfo,
    servicesData: Array.isArray(value.servicesData) ? value.servicesData as ServiceItem[] : defaultServices,
    projectsData: Array.isArray(value.projectsData) ? value.projectsData as ProjectItem[] : defaultProjects,
    teamMembers: Array.isArray(value.teamMembers) ? value.teamMembers as TeamMember[] : defaultTeam,
    testimonialsData: Array.isArray(value.testimonialsData) ? value.testimonialsData as TestimonialItem[] : defaultTestimonials,
    faqsData: Array.isArray(value.faqsData) ? value.faqsData as FAQItem[] : defaultFaqs,
    statisticsData: Array.isArray(value.statisticsData) ? value.statisticsData as StatisticItem[] : defaultStatistics,
    processStepsData: Array.isArray(value.processStepsData) ? value.processStepsData as ProcessStep[] : defaultProcessSteps,
    activityLogs: Array.isArray(value.activityLogs) ? value.activityLogs as ActivityLog[] : initialLogs,
  };
};

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cloudLoaded = useRef(false);
  const [siteData, setSiteData] = useState<SiteDataState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return normaliseSiteData(parsed);
      }
    } catch (e) {
      console.error('Failed to parse saved site data from localStorage', e);
    }
    return initialData;
  });

  // Apply data-theme attribute on mount and whenever activeTheme changes
  useEffect(() => {
    if (siteData.activeTheme) {
      document.documentElement.setAttribute('data-theme', siteData.activeTheme);
    }
  }, [siteData.activeTheme]);

  useEffect(() => {
    let active = true;
    fetch('/api/site-data')
      .then((response) => response.ok ? response.json() : null)
      .then((payload) => {
        if (active && payload?.data) setSiteData(normaliseSiteData(payload.data));
      })
      .catch(() => undefined)
      .finally(() => { cloudLoaded.current = true; });
    return () => { active = false; };
  }, []);

  // Save to localStorage on any state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(siteData));
    } catch (e) {
      console.error('Failed to save site data to localStorage', e);
    }
    if (cloudLoaded.current && sessionStorage.getItem('skv_admin_auth') === 'true') {
      fetch('/api/site-data', {
        method: 'PUT', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(siteData),
      }).catch(() => undefined);
    }
  }, [siteData]);

  const logActivity = (action: string, category: ActivityLog['category'], details?: string) => {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      action,
      category,
      details,
    };
    setSiteData((prev) => ({
      ...prev,
      activityLogs: [newLog, ...(prev.activityLogs || [])],
    }));
  };

  const clearActivityLogs = () => {
    setSiteData((prev) => ({
      ...prev,
      activityLogs: [],
    }));
  };

  const updateCompanyInfo = (info: Partial<CompanyInfo>) => {
    setSiteData((prev) => ({
      ...prev,
      companyInfo: {
        ...prev.companyInfo,
        ...info,
        name: info.name ? sanitizeInput(info.name) : prev.companyInfo.name,
        phone: info.phone ? sanitizeInput(info.phone) : prev.companyInfo.phone,
        email: info.email ? sanitizeInput(info.email) : prev.companyInfo.email,
        heroHeadline: info.heroHeadline ? sanitizeInput(info.heroHeadline) : prev.companyInfo.heroHeadline,
        heroDescription: info.heroDescription ? sanitizeInput(info.heroDescription) : prev.companyInfo.heroDescription,
      },
    }));
    logActivity('Updated Company Info & Hero Content', 'Company', `Modified company details or hero headline: "${info.heroHeadline || info.name || 'Company Profile'}"`);
  };

  const addService = (service: Omit<ServiceItem, 'id'>) => {
    const newId = `srv-${Date.now()}`;
    setSiteData((prev) => ({
      ...prev,
      servicesData: [{ id: newId, ...service }, ...prev.servicesData],
    }));
    logActivity(`Added New Service: ${service.title}`, 'Services', service.shortDescription);
  };

  const updateService = (id: string, service: Partial<ServiceItem>) => {
    setSiteData((prev) => {
      const existing = prev.servicesData.find((s) => s.id === id);
      const title = service.title || existing?.title || id;
      return {
        ...prev,
        servicesData: prev.servicesData.map((item) =>
          item.id === id ? { ...item, ...service } : item
        ),
      };
    });
    logActivity(`Updated Service (${id})`, 'Services', `Saved modifications to service parameters.`);
  };

  const deleteService = (id: string) => {
    let deletedTitle = id;
    setSiteData((prev) => {
      const existing = prev.servicesData.find((s) => s.id === id);
      if (existing) deletedTitle = existing.title;
      return {
        ...prev,
        servicesData: prev.servicesData.filter((item) => item.id !== id),
      };
    });
    logActivity(`Deleted Service: ${deletedTitle}`, 'Services', `Removed service entry with ID: ${id}`);
  };

  const addProject = (project: Omit<ProjectItem, 'id'>) => {
    const newId = `proj-${Date.now()}`;
    setSiteData((prev) => ({
      ...prev,
      projectsData: [{ id: newId, ...project }, ...prev.projectsData],
    }));
    logActivity(`Added New Project: ${project.title}`, 'Projects', `Category: ${project.category}, Budget: ${project.budgetRange}`);
  };

  const updateProject = (id: string, project: Partial<ProjectItem>) => {
    setSiteData((prev) => {
      const existing = prev.projectsData.find((p) => p.id === id);
      const title = project.title || existing?.title || id;
      return {
        ...prev,
        projectsData: prev.projectsData.map((item) =>
          item.id === id ? { ...item, ...project } : item
        ),
      };
    });
    logActivity(`Updated Project (${id})`, 'Projects', `Updated parameters: ${Object.keys(project).join(', ')}`);
  };

  const deleteProject = (id: string) => {
    let deletedTitle = id;
    setSiteData((prev) => {
      const existing = prev.projectsData.find((p) => p.id === id);
      if (existing) deletedTitle = existing.title;
      return {
        ...prev,
        projectsData: prev.projectsData.filter((item) => item.id !== id),
      };
    });
    logActivity(`Deleted Project: ${deletedTitle}`, 'Projects', `Removed project entry with ID: ${id}`);
  };

  const addTeamMember = (member: Omit<TeamMember, 'id'>) => {
    const newId = `team-${Date.now()}`;
    setSiteData((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { id: newId, ...member }],
    }));
    logActivity(`Added Team Member: ${member.name}`, 'Team', `Role: ${member.role}`);
  };

  const updateTeamMember = (id: string, member: Partial<TeamMember>) => {
    setSiteData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.map((item) =>
        item.id === id ? { ...item, ...member } : item
      ),
    }));
    logActivity(`Updated Team Member (${id})`, 'Team', `Updated leader profile details.`);
  };

  const deleteTeamMember = (id: string) => {
    setSiteData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((item) => item.id !== id),
    }));
    logActivity(`Deleted Team Member (${id})`, 'Team', `Removed member from leadership team.`);
  };

  const addTestimonial = (testimonial: Omit<TestimonialItem, 'id'>) => {
    const newId = `tst-${Date.now()}`;
    setSiteData((prev) => ({
      ...prev,
      testimonialsData: [{ id: newId, ...testimonial }, ...prev.testimonialsData],
    }));
    logActivity(`Added Testimonial: ${testimonial.clientName}`, 'Testimonials', `Company: ${testimonial.companyName}`);
  };

  const updateTestimonial = (id: string, testimonial: Partial<TestimonialItem>) => {
    setSiteData((prev) => ({
      ...prev,
      testimonialsData: prev.testimonialsData.map((item) =>
        item.id === id ? { ...item, ...testimonial } : item
      ),
    }));
    logActivity(`Updated Testimonial (${id})`, 'Testimonials', `Updated client review text.`);
  };

  const deleteTestimonial = (id: string) => {
    setSiteData((prev) => ({
      ...prev,
      testimonialsData: prev.testimonialsData.filter((item) => item.id !== id),
    }));
    logActivity(`Deleted Testimonial (${id})`, 'Testimonials', `Removed testimonial entry.`);
  };

  const addFAQ = (faq: Omit<FAQItem, 'id'>) => {
    const newId = `faq-${Date.now()}`;
    setSiteData((prev) => ({
      ...prev,
      faqsData: [...prev.faqsData, { id: newId, ...faq }],
    }));
    logActivity(`Added FAQ Item`, 'FAQs', `Question: ${faq.question}`);
  };

  const updateFAQ = (id: string, faq: Partial<FAQItem>) => {
    setSiteData((prev) => ({
      ...prev,
      faqsData: prev.faqsData.map((item) =>
        item.id === id ? { ...item, ...faq } : item
      ),
    }));
    logActivity(`Updated FAQ Item (${id})`, 'FAQs', `Saved question/answer updates.`);
  };

  const deleteFAQ = (id: string) => {
    setSiteData((prev) => ({
      ...prev,
      faqsData: prev.faqsData.filter((item) => item.id !== id),
    }));
    logActivity(`Deleted FAQ Item (${id})`, 'FAQs', `Removed question entry.`);
  };

  const updateStatistic = (id: string, stat: Partial<StatisticItem>) => {
    setSiteData((prev) => ({
      ...prev,
      statisticsData: prev.statisticsData.map((item) =>
        item.id === id ? { ...item, ...stat } : item
      ),
    }));
    logActivity(`Updated Statistic Metric (${id})`, 'Stats', `Value: ${stat.value || 'modified'}`);
  };

  const exportSiteData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(siteData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `skv_construction_site_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    logActivity('Exported Backup JSON', 'System', 'Downloaded complete configuration snapshot.');
  };

  const importSiteData = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (isRecord(parsed) && isRecord(parsed.companyInfo) && Array.isArray(parsed.servicesData) && Array.isArray(parsed.projectsData)) {
        setSiteData(normaliseSiteData(parsed));
        logActivity('Restored Backup JSON', 'System', 'Imported new site data configuration from backup file.');
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON file format for import', e);
    }
    return false;
  };

  const updateTheme = (themeId: string) => {
    setSiteData((prev) => ({
      ...prev,
      activeTheme: themeId,
    }));
    document.documentElement.setAttribute('data-theme', themeId);
    logActivity(`Changed Brand Theme to '${themeId}'`, 'System', `Theme accent color updated in Admin CMS Panel.`);
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSiteData(initialData);
    logActivity('Reset Site to Factory Defaults', 'System', 'Cleared local storage overrides and restored default dataset.');
  };

  return (
    <SiteContext.Provider
      value={{
        ...siteData,
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
        logActivity,
        clearActivityLogs,
        exportSiteData,
        importSiteData,
        resetToDefaults,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteContext = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSiteContext must be used within a SiteProvider');
  }
  return context;
};
