import { CompanyInfo, ServiceItem, ProjectItem, TeamMember, TestimonialItem, FAQItem, ProcessStep, StatisticItem } from '../types';

import heroBuildingImg from '../assets/images/skv_hero_building_1786244254983.jpg';
import aboutEngineeringImg from '../assets/images/skv_about_engineering_1786244275934.jpg';
import infrastructureImg from '../assets/images/skv_project_infrastructure_1786244295485.jpg';

export const companyInfo: CompanyInfo = {
  name: 'SKG Builders & Developers',
  legalName: 'SKG Builders & Developers',
  tagline: 'Building Excellence. Creating the Future.',
  heroHeadline: 'Building Excellence. Creating the Future.',
  heroDescription: 'SKG Builders & Developers delivers reliable construction, infrastructure, and development solutions with an uncompromising commitment to quality, safety, and professional execution.',
  aboutStory: 'SKG Builders & Developers was established to redefine engineering standards across residential, commercial, industrial, and public infrastructure developments. Through meticulous planning, advanced technology, and skilled craftsmanship, we transform complex architectural visions into enduring physical landmarks.',
  mission: 'To deliver superior construction services by applying rigorous engineering precision, sustainable building practices, and transparent project governance that exceeds client expectations.',
  vision: 'To be the premier multi-disciplinary construction partner recognized globally for structural integrity, zero-accident site culture, and transformative urban infrastructure.',
  qualityCommitment: 'Every project under SKG Builders & Developers undergoes multi-stage structural audits, certified material quality testing, and ISO 9001 quality management protocols from groundbreaking to final handover.',
  safetyCommitment: 'We enforce a strict Zero-Harm site policy. All site staff, sub-contractors, and engineering teams operate under OSHA-compliant health, safety, and environment (HSE) guidelines.',
  phone: '+1 (800) 555-0198',
  email: 'contact@skvconstruction.com',
  address: {
    street: '100 Architectural Boulevard, Suite 400',
    city: 'Metro City',
    state: 'NY',
    zip: '10001',
    country: 'United States'
  },
  businessHours: 'Mon - Fri: 8:00 AM - 6:00 PM | Sat: 9:00 AM - 2:00 PM',
  socialLinks: {
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com'
  },
  certifications: ['ISO 9001:2015 Quality Management', 'ISO 45001 Health & Safety', 'LEED Accredited Builder', 'National Infrastructure Excellence Award']
};

export const statisticsData: StatisticItem[] = [
  {
    id: 'stat-projects',
    label: 'Projects Delivered',
    value: 'XX+',
    numericValue: 180,
    suffix: '+',
    description: 'Residential, commercial, and heavy infrastructure projects successfully completed.',
    iconName: 'Building2'
  },
  {
    id: 'stat-years',
    label: 'Years of Engineering',
    value: 'XX+',
    numericValue: 25,
    suffix: '+ Years',
    description: 'Decades of proven contractor leadership and structural excellence.',
    iconName: 'Award'
  },
  {
    id: 'stat-engineers',
    label: 'Certified Professionals',
    value: 'XX+',
    numericValue: 120,
    suffix: '+ Staff',
    description: 'Licensed civil engineers, project managers, and master craftspeople.',
    iconName: 'Users'
  },
  {
    id: 'stat-satisfaction',
    label: 'On-Time Handover Index',
    value: 'XX%',
    numericValue: 99,
    suffix: '%',
    description: 'Strict adherence to milestone scheduling and transparent budget governance.',
    iconName: 'ShieldCheck'
  }
];

export const servicesData: ServiceItem[] = [
  {
    id: 'service-residential',
    iconName: 'Home',
    title: 'Residential Construction',
    shortDescription: 'Custom luxury residences, multi-family housing complexes, and estate developments constructed with premium materials.',
    fullDescription: 'SKV Construction specializes in high-end residential construction. From bespoke private villas to multi-story luxury apartment complexes, we combine spatial design with structural resilience. Our team manages every phase—site excavation, foundation pouring, framing, mechanical fitting, and luxury interior finishing.',
    features: ['Custom villa & estate construction', 'Multi-family residential towers', 'Energy-efficient smart homes', 'Turnkey project execution'],
    deliverables: ['Full architectural compliance', 'Seismic structural certification', 'Custom luxury interior fit-outs', 'Warranty and handover documentation'],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    featured: true
  },
  {
    id: 'service-commercial',
    iconName: 'Building',
    title: 'Commercial Construction',
    shortDescription: 'State-of-the-art office towers, retail centers, corporate headquarters, and hospitality venues built for scalability.',
    fullDescription: 'We deliver flagship commercial environments tailored to modern business demands. SKV Construction manages complex urban site logistics, high-rise structural framing, glass curtain walls, smart HVAC integration, and specialized commercial interiors.',
    features: ['High-rise office buildings', 'Shopping complexes & retail hubs', 'Corporate headquarters', 'Hotel & hospitality developments'],
    deliverables: ['LEED green building certification assistance', 'Integrated building management systems', 'Acoustic & thermal insulation', 'Comprehensive safety compliance'],
    imageUrl: heroBuildingImg,
    featured: true
  },
  {
    id: 'service-industrial',
    iconName: 'Factory',
    title: 'Industrial Construction',
    shortDescription: 'Heavy manufacturing plants, logistics warehouses, cold-storage facilities, and energy infrastructure.',
    fullDescription: 'Industrial facilities demand specialized structural capabilities, heavy load-bearing flooring, crane runways, and hazardous chemical compliance. SKV Construction designs and builds robust industrial spaces optimized for high operational throughput.',
    features: ['Heavy manufacturing facilities', 'Logistics & fulfillment hubs', 'Pre-engineered steel buildings', 'Specialized industrial foundations'],
    deliverables: ['Heavy load slab engineering', 'Fire safety and suppression systems', 'Cleanroom & environmental controls', 'Regulatory environmental clearances'],
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop',
    featured: true
  },
  {
    id: 'service-infrastructure',
    iconName: 'Landmark',
    title: 'Infrastructure Development',
    shortDescription: 'Bridges, highway corridors, public transit terminals, and civil utility networks.',
    fullDescription: 'Our infrastructure division executes mission-critical civil works that power communities. From post-tensioned concrete bridge decks to storm drainage networks and urban thoroughfares, SKV Construction builds resilient public infrastructure.',
    features: ['Roadways & highway bridges', 'Water supply & drainage networks', 'Public transport hubs', 'Urban revitalization works'],
    deliverables: ['Environmental impact compliance', 'Heavy civil excavation', 'Structural load testing', 'Long-term maintenance warranties'],
    imageUrl: infrastructureImg,
    featured: true
  },
  {
    id: 'service-renovation',
    iconName: 'Hammer',
    title: 'Renovation & Remodeling',
    shortDescription: 'Structural modernization, historical restoration, seismic retrofitting, and adaptive reuse.',
    fullDescription: 'Transform existing structures without compromising architectural integrity. SKV Construction performs structural reinforcement, interior spatial reconfigurations, facade modernizations, and mechanical system upgrades.',
    features: ['Commercial building retrofits', 'Structural core reinforcement', 'Historic preservation & restoration', 'Façade modernizations'],
    deliverables: ['Detailed structural assessment', 'Minimum disruption protocols', 'Upgraded MEP systems', 'Enhanced energy efficiency rating'],
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'service-general-contracting',
    iconName: 'HardHat',
    title: 'General Contracting',
    shortDescription: 'Single-source responsibility for site supervision, procurement, safety governance, and sub-contractor coordination.',
    fullDescription: 'As master general contractors, SKV Construction handles site operations, material sourcing, trade coordination, regulatory permits, and quality audits, offering clients a single accountable partner.',
    features: ['End-to-end site management', 'Vendor & trade procurement', 'Safety & quality enforcement', 'Schedule & budget tracking'],
    deliverables: ['Daily construction site logs', 'Bi-weekly stakeholder reports', 'Strict cost management', 'Transparent change order management'],
    imageUrl: aboutEngineeringImg
  },
  {
    id: 'service-project-management',
    iconName: 'ClipboardCheck',
    title: 'Project Management & Advisory',
    shortDescription: 'Constructability reviews, BIM modeling, cost estimation, and schedule optimization.',
    fullDescription: 'Our construction management consultants leverage 3D BIM modeling and real-time project analytics to mitigate financial risk, eliminate clashes prior to breaking ground, and streamline complex schedules.',
    features: ['BIM & 3D clash detection', 'Value engineering analysis', 'Risk management & mitigation', 'Quality audit frameworks'],
    deliverables: ['Constructability reports', 'Itemized cost estimates', 'Critical path schedule models', 'Sub-contractor evaluation matrices'],
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'service-interiors',
    iconName: 'Paintbrush',
    title: 'Interior & Finishing Works',
    shortDescription: 'High-end architectural joinery, custom stone masonry, drywall partitions, and specialized ceiling systems.',
    fullDescription: 'Craftsmanship matters down to the final millimeter. SKV Construction provides bespoke interior fit-out services for corporate offices, luxury residences, and public spaces, executing detailed architect specifications flawlessly.',
    features: ['Acoustic ceiling & partition systems', 'Precision stone & tile installation', 'Architectural millwork & cabinetry', 'Lighting & MEP integration'],
    deliverables: ['Punch-list zero defect finish', 'Material safety compliance', 'Bespoke architectural detailing', 'Custom acoustic testing'],
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop'
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: 'proj-apex-tower',
    title: 'The Apex Commercial Tower',
    category: 'Commercial',
    location: 'Downtown Financial District',
    client: 'Apex Global Real Estate',
    completionDate: 'Q3 2025',
    status: 'Completed',
    shortDescription: 'A 38-story sustainable commercial glass tower featuring post-tensioned floor slabs and double-glazed energy facade.',
    fullDescription: 'The Apex Commercial Tower is a landmark high-rise development featuring 650,000 sq ft of Grade-A office space. SKV Construction executed the deep foundation piling, core structural concrete framing, unitized glass curtain wall, and high-speed elevator installation.',
    areaSize: '650,000 sq ft',
    budgetRange: '$120M - $150M',
    imageUrl: heroBuildingImg,
    galleryImages: [
      heroBuildingImg,
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1200&auto=format&fit=crop'
    ],
    keySpecs: [
      { label: 'Floors', value: '38 Stories' },
      { label: 'Structural Type', value: 'Post-Tensioned Reinforced Concrete' },
      { label: 'Sustainability Standard', value: 'LEED Gold Certified' },
      { label: 'Excavation Depth', value: '4 Basements (48ft)' }
    ],
    featured: true
  },
  {
    id: 'proj-grand-haven',
    title: 'Grand Haven Luxury Residences',
    category: 'Residential',
    location: 'Waterfront Drive, Bay Area',
    client: 'Harborview Developments',
    completionDate: 'Q1 2025',
    status: 'Completed',
    shortDescription: 'Exclusive waterfront residential community comprising 24 bespoke luxury villas with private infinity pools.',
    fullDescription: 'SKV Construction completed the turnkey construction of Grand Haven Residences. Built on engineered deep foundation piles to withstand coastal erosion, each villa incorporates custom Italian marble, smart home energy grids, and hurricane-rated panoramic glazing.',
    areaSize: '180,000 sq ft',
    budgetRange: '$45M - $60M',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop'
    ],
    keySpecs: [
      { label: 'Units', value: '24 Luxury Villas' },
      { label: 'Foundation Type', value: 'Reinforced Concrete Friction Piles' },
      { label: 'Seismic Rating', value: 'Zone 4 Compliant' },
      { label: 'Handover Status', value: '100% On-Time' }
    ],
    featured: true
  },
  {
    id: 'proj-metro-bridge',
    title: 'Metro Highway Cable Bridge',
    category: 'Infrastructure',
    location: 'North Bypass Highway',
    client: 'Department of Transportation',
    completionDate: 'Q4 2024',
    status: 'Completed',
    shortDescription: 'An 850-meter cable-stayed bridge relieving urban traffic congestion with 6 lanes of heavy freight transport.',
    fullDescription: 'The Metro Cable Bridge stands as a testament to heavy civil engineering. SKV Construction managed the underwater cofferdam installation, massive pylon construction, precast deck segment launching, and high-tensile stay cable tensioning under stringent environmental standards.',
    areaSize: '850 Meters Length',
    budgetRange: '$85M - $100M',
    imageUrl: infrastructureImg,
    galleryImages: [
      infrastructureImg,
      'https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1200&auto=format&fit=crop'
    ],
    keySpecs: [
      { label: 'Total Length', value: '850 Meters' },
      { label: 'Main Span', value: '320 Meters' },
      { label: 'Lanes', value: '6 Highway Lanes + Bike Track' },
      { label: 'Steel Tensioning', value: '1,400 Tons Cable Steel' }
    ],
    featured: true
  },
  {
    id: 'proj-nexus-logistics',
    title: 'Nexus Industrial Logistics Hub',
    category: 'Industrial',
    location: 'East Industrial Corridor',
    client: 'Nexus Supply Chain Group',
    completionDate: 'Q2 2025',
    status: 'Completed',
    shortDescription: 'High-tech automated distribution center with 12-meter clear height and heavy-duty fiber-reinforced floor slabs.',
    fullDescription: 'Built for 24/7 automated robotic picking, this 400,000 sq ft warehouse required ultra-flat SFRC floor slabs, automated dock levelers, solar panel roof framing, and high-efficiency HVAC temperature control zones.',
    areaSize: '400,000 sq ft',
    budgetRange: '$35M - $45M',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop'
    ],
    keySpecs: [
      { label: 'Clear Height', value: '12.5 Meters' },
      { label: 'Slab Specification', value: 'Superflat FM2 Special' },
      { label: 'Solar Output', value: '1.2 MW Rooftop Solar' },
      { label: 'Dock Doors', value: '48 Automated Bays' }
    ],
    featured: true
  },
  {
    id: 'proj-heritage-hotel',
    title: 'The Sovereign Heritage Hotel Renovation',
    category: 'Commercial',
    location: 'Central Plaza District',
    client: 'Sovereign Hotel Group',
    completionDate: 'Q3 2025',
    status: 'In Progress',
    shortDescription: 'Complete structural modernization and interior fit-out of a 1920s historical landmark hotel.',
    fullDescription: 'Restoring historical elegance while integrating modern MEP systems. SKV Construction is retrofitting earthquake dampers, installing soundproof double curtain walls, and refitting 180 luxury guest suites.',
    areaSize: '210,000 sq ft',
    budgetRange: '$28M - $35M',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop'
    ],
    keySpecs: [
      { label: 'Suites', value: '180 Luxury Rooms' },
      { label: 'Scope', value: 'Full Seismic Retrofit & Interior Fit-Out' },
      { label: 'Heritage Status', value: 'Grade-1 Preserved Architecture' }
    ]
  },
  {
    id: 'proj-green-horizon',
    title: 'Green Horizon Tech Park',
    category: 'Industrial',
    location: 'Silicon Valley Innovation Hub',
    client: 'Horizon Properties Inc.',
    completionDate: 'Q4 2026',
    status: 'In Progress',
    shortDescription: 'Multi-building sustainable R&D technology park with solar glass microgrid and rooftop gardens.',
    fullDescription: 'Designed to achieve Net Zero carbon emissions, SKV Construction is assembling cross-laminated timber hybrid framing, water recycling reservoirs, and low-VOC interior spaces across 3 linked campuses.',
    areaSize: '520,000 sq ft',
    budgetRange: '$95M - $110M',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200&auto=format&fit=crop'
    ],
    keySpecs: [
      { label: 'Net Zero Target', value: 'Zero Operational Carbon' },
      { label: 'Framing', value: 'Mass Timber + Recycled Structural Steel' },
      { label: 'Buildings', value: '3 Interconnected Blocks' }
    ]
  }
];

export const processSteps: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Consultation & Scope Review',
    shortSummary: 'Initial alignment on vision, requirements, site constraints, and preliminary feasibility.',
    description: 'We meet with project stakeholders, architects, and investors to thoroughly review site conditions, client budget parameters, architectural goals, and key performance criteria.',
    deliverables: ['Client Requirements Document', 'Preliminary Feasibility Brief', 'Site Inspection Report'],
    estimatedDuration: '1 - 2 Weeks'
  },
  {
    stepNumber: '02',
    title: 'Site Assessment & Geotechnical Audit',
    shortSummary: 'Topographic mapping, soil testing, utility mapping, and structural baseline analysis.',
    description: 'Our civil engineering team conducts deep soil boring tests, land surveying, water table evaluation, and existing utility mapping to establish precise foundation engineering parameters.',
    deliverables: ['Geotechnical Investigation Report', 'Topographic Survey Map', 'Utility Rights-of-Way Clearance'],
    estimatedDuration: '2 - 3 Weeks'
  },
  {
    stepNumber: '03',
    title: 'Planning & BIM Design',
    shortSummary: '3D Building Information Modeling (BIM), constructability analysis, and value engineering.',
    description: 'We develop detailed 3D BIM models to simulate structural loads, mechanical MEP routes, and architectural details, identifying and resolving spatial clashes long before physical breaking of ground.',
    deliverables: ['3D BIM Clash-Free Model', 'Constructability Evaluation', 'Value Engineering Recommendations'],
    estimatedDuration: '3 - 4 Weeks'
  },
  {
    stepNumber: '04',
    title: 'Precision Estimation & Contracting',
    shortSummary: 'Transparent BOQ (Bill of Quantities), fixed-price scheduling, and permit approvals.',
    description: 'We present a line-item Bill of Quantities with zero hidden fees, establish guaranteed milestone timelines, secure municipal building permits, and execute clear contract agreements.',
    deliverables: ['Itemized BOQ Contract', 'Master Construction Schedule', 'Approved Municipal Permits'],
    estimatedDuration: '2 - 3 Weeks'
  },
  {
    stepNumber: '05',
    title: 'Active Construction Phase',
    shortSummary: 'Groundbreaking, structural framing, MEP installation, and site execution under strict safety control.',
    description: 'Our full site team mobilizes. Heavy machinery, site managers, and trade craftsmen execute earthworks, piling, steel/concrete framing, envelope installation, and interior fit-outs according to daily quality logs.',
    deliverables: ['Weekly Milestone Progress Reports', 'Live Site Camera Feeds', 'Daily Quality & Safety Audits'],
    estimatedDuration: 'Varies by Project Scope'
  },
  {
    stepNumber: '06',
    title: 'Quality Inspection & Structural Audit',
    shortSummary: 'Third-party testing, pressure/leak checks, MEP commissioning, and safety verification.',
    description: 'Independent quality auditors perform non-destructive concrete strength testing, electrical insulation checks, pressure drop tests, fire suppression trials, and air quality validation.',
    deliverables: ['Third-Party Structural Audit', 'MEP Commissioning Certificates', 'Punch-List Clearance'],
    estimatedDuration: '2 - 3 Weeks'
  },
  {
    stepNumber: '07',
    title: 'Project Handover & Documentation',
    shortSummary: 'Final client walkthrough, occupancy permits, warranty binder, and key handover.',
    description: 'We guide the client through an exhaustive final inspection, present complete As-Built drawings, deliver operating manuals for facility management, and formally hand over the keys.',
    deliverables: ['Certificate of Occupancy', 'As-Built CAD/BIM Documentation', 'Facility Warranty Binders'],
    estimatedDuration: '1 Week'
  },
  {
    stepNumber: '08',
    title: 'Ongoing Warranty & Maintenance Support',
    shortSummary: 'Post-handover warranty coverage, routine structural check-ups, and 24/7 emergency support.',
    description: 'Our commitment extends long past handover. We provide multi-year structural warranty coverage, scheduled annual maintenance audits, and dedicated facility support services.',
    deliverables: ['Multi-Year Structural Warranty', 'Scheduled Maintenance Visits', 'Dedicated Client Service Line'],
    estimatedDuration: 'Ongoing Coverage'
  }
];

export const whyChooseUsData = [
  {
    iconName: 'Award',
    title: 'Uncompromising Workmanship',
    description: 'Master craftsmen, certified materials, and zero-defect quality tolerance on every concrete pour, weld, and finish.'
  },
  {
    iconName: 'ShieldCheck',
    title: 'Zero-Harm Safety Culture',
    description: 'OSHA & ISO 45001 compliant site procedures ensuring zero accidents and safe working environments for all teams.'
  },
  {
    iconName: 'Clock',
    title: 'Guaranteed Milestone Handover',
    description: 'Critical path scheduling with contractual financial guarantees on milestone delivery and final completion dates.'
  },
  {
    iconName: 'DollarSign',
    title: 'Transparent Budgeting',
    description: 'Itemized Bill of Quantities with no hidden change orders or surprise cost overruns.'
  },
  {
    iconName: 'Cpu',
    title: '3D BIM Tech & Smart Site Management',
    description: 'Real-time digital twin monitoring, drone site surveillance, and clash detection before physical build.'
  },
  {
    iconName: 'Leaf',
    title: 'Sustainable Green Building',
    description: 'LEED-certified practices, recycled material integration, and waste reduction on all building sites.'
  }
];

export const teamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Suresh K. Verma',
    role: 'Founder & Managing Director',
    bio: '30+ years in structural engineering and large-scale industrial infrastructure development across North America & Asia.',
    experienceYears: '30+ Years',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop',
    specialties: ['Infrastructure Planning', 'Corporate Governance', 'High-Rise Engineering']
  },
  {
    id: 'team-2',
    name: 'Elena Rostova',
    role: 'Chief Civil Engineer',
    bio: 'Licensed Senior Structural Engineer specializing in seismic-resistant high-rise designs and pre-stressed concrete systems.',
    experienceYears: '18 Years',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    specialties: ['Seismic Engineering', 'Post-Tension Slabs', 'BIM Modeling']
  },
  {
    id: 'team-3',
    name: 'Marcus Vance',
    role: 'Head of Project Operations',
    bio: 'Oversees multi-site construction execution, subcontractor safety compliance, and supply chain logistics.',
    experienceYears: '22 Years',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop',
    specialties: ['Site Management', 'OSHA Safety Compliance', 'Supply Logistics']
  },
  {
    id: 'team-4',
    name: 'Sarah Jenkins',
    role: 'Director of Architecture & Design',
    bio: 'Pioneer in sustainable commercial architecture, LEED AP certified with a portfolio of award-winning green buildings.',
    experienceYears: '15 Years',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop',
    specialties: ['LEED Design', 'Urban Planning', 'Commercial Façades']
  }
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: 'test-1',
    clientName: 'David Sterling',
    clientRole: 'Chief Development Officer',
    companyName: 'Apex Global Real Estate',
    projectTitle: 'The Apex Commercial Tower',
    testimonial: 'SKV Construction delivered our 38-story commercial headquarters two weeks ahead of schedule and precisely on budget. Their safety standards and BIM clash detection eliminated costly field errors. A truly high-caliber contractor.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    verifiedClient: true
  },
  {
    id: 'test-2',
    clientName: 'Amara Nwosu',
    clientRole: 'Managing Partner',
    companyName: 'Harborview Developments',
    projectTitle: 'Grand Haven Luxury Residences',
    testimonial: 'Building on coastal waterfront terrain was full of engineering risks. SKV Construction handled the deep pile foundations and coastal erosion protection seamlessly. The residential finish quality exceeded our investors expectations.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    verifiedClient: true
  },
  {
    id: 'test-3',
    clientName: 'Robert Vance',
    clientRole: 'VP of Infrastructure',
    companyName: 'Department of Transportation',
    projectTitle: 'Metro Highway Cable Bridge',
    testimonial: 'The cable-stayed bridge project required complex underwater cofferdams and tight environmental compliance. SKV Construction demonstrated top-tier civil engineering expertise throughout.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    verifiedClient: true
  }
];

export const faqData: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What types of construction projects does SKV Construction handle?',
    answer: 'SKV Construction is a full-service general contractor and civil engineering firm. We undertake Commercial high-rises, Residential villa communities & towers, Heavy Industrial manufacturing facilities, and Public Infrastructure works (bridges, highways, drainage networks).'
  },
  {
    id: 'faq-2',
    category: 'Estimation & Cost',
    question: 'How do I request a project estimate or tender quote?',
    answer: 'You can submit your project requirements using our online "Get a Quote" form, email us directly at contact@skvconstruction.com, or call +1 (800) 555-0198. Our engineering estimation team will schedule an initial consultation and site review within 24-48 business hours.'
  },
  {
    id: 'faq-3',
    category: 'Services',
    question: 'Does SKV Construction handle both design and physical construction (Design-Build)?',
    answer: 'Yes! We offer complete Design-Build turnkey solutions. We collaborate with top architectural firms or utilize our in-house engineering design and 3D BIM modeling team to manage projects from initial concept through to final occupancy permits.'
  },
  {
    id: 'faq-4',
    category: 'Timelines & Safety',
    question: 'How do you ensure projects stay on schedule and within budget?',
    answer: 'We utilize 3D BIM modeling for pre-construction clash detection, Critical Path Method (CPM) scheduling, and weekly milestone tracking. Every client receives bi-weekly progress reports and transparent cost breakdowns with zero hidden change orders.'
  },
  {
    id: 'faq-5',
    category: 'Timelines & Safety',
    question: 'What are your safety protocols on construction sites?',
    answer: 'SKV Construction operates under a mandatory Zero-Harm policy certified to ISO 45001 safety management standards. All workers complete daily safety toolboxes, personal protective equipment (PPE) compliance is strictly enforced, and site safety officers perform independent daily audits.'
  },
  {
    id: 'faq-6',
    category: 'General',
    question: 'Are you licensed and insured for large-scale developments?',
    answer: 'Yes. SKV Construction holds Class-A General Contractor licensing, comprehensive general liability coverage, worker compensation insurance, and bonded project performance guarantees suitable for multi-million-dollar commercial and public tenders.'
  }
];
