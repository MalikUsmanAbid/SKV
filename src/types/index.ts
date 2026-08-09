export interface ActivityLog {
  id: string;
  timestamp: string;
  action: string;
  category: 'Company' | 'Services' | 'Projects' | 'Team' | 'Testimonials' | 'FAQs' | 'Stats' | 'System';
  details?: string;
}

export type ProjectCategory = 'All' | 'Residential' | 'Commercial' | 'Industrial' | 'Infrastructure';

export interface ServiceItem {
  id: string;
  iconName: string; // Lucide icon name identifier
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  deliverables: string[];
  imageUrl: string;
  featured?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Industrial' | 'Infrastructure';
  location: string;
  client: string;
  completionDate: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  shortDescription: string;
  fullDescription: string;
  areaSize: string;
  budgetRange: string;
  imageUrl: string;
  galleryImages: string[];
  keySpecs: { label: string; value: string }[];
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  experienceYears: string;
  imageUrl: string;
  specialties: string[];
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientRole: string;
  companyName: string;
  projectTitle: string;
  testimonial: string;
  rating: number;
  avatarUrl: string;
  verifiedClient: boolean;
}

export interface FAQItem {
  id: string;
  category: 'General' | 'Services' | 'Estimation & Cost' | 'Timelines & Safety';
  question: string;
  answer: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  shortSummary: string;
  description: string;
  deliverables: string[];
  estimatedDuration: string;
}

export interface StatisticItem {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  suffix: string;
  description: string;
  iconName: string;
}

export interface CompanyInfo {
  name: string;
  legalName: string;
  tagline: string;
  heroHeadline: string;
  heroDescription: string;
  aboutStory: string;
  mission: string;
  vision: string;
  qualityCommitment: string;
  safetyCommitment: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  businessHours: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  certifications: string[];
}

export interface QuoteFormData {
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  projectType: string;
  projectLocation: string;
  estimatedBudget: string;
  targetTimeline: string;
  projectScopeDetails: string;
  hasArchitecturalPlans: boolean;
}
