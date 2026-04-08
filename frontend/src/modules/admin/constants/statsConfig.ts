// Configuration des couleurs pour les graphs
export const CHART_COLORS = {
  primary: '#3b82f6',
  secondary: '#10b981',
  tertiary: '#f59e0b',
  quaternary: '#ef4444',
  purple: '#8b5cf6',
  pink: '#ec4899',
  indigo: '#6366f1',
  teal: '#14b8a6',
};

// Palette pour les graphs multi-couleurs
export const CHART_PALETTE = [
  CHART_COLORS.primary,
  CHART_COLORS.secondary,
  CHART_COLORS.tertiary,
  CHART_COLORS.quaternary,
  CHART_COLORS.purple,
  CHART_COLORS.pink,
  CHART_COLORS.indigo,
  CHART_COLORS.teal,
];

// Configuration des KPIs
export const KPI_CARDS = [
  {
    id: 'total-jobs',
    label: 'Total Jobs',
    key: 'totalJobs',
    icon: 'Briefcase',
    color: 'blue',
    prefix: '',
    suffix: '',
  },
  {
    id: 'total-candidates',
    label: 'Total Candidates',
    key: 'totalCandidates',
    icon: 'Users',
    color: 'green',
    prefix: '',
    suffix: '',
  },
  {
    id: 'total-recruiters',
    label: 'Total Recruiters',
    key: 'totalRecruiters',
    icon: 'Building',
    color: 'purple',
    prefix: '',
    suffix: '',
  },
  {
    id: 'placement-rate',
    label: 'Placement Rate',
    key: 'placementRate',
    icon: 'TrendingUp',
    color: 'orange',
    prefix: '',
    suffix: '%',
  },
];

// Configuration des graphs du dashboard
export const DASHBOARD_CHARTS = {
  monthlyRegistrations: {
    title: 'Monthly Registrations',
    type: 'line',
    dataKey: 'monthlyRegistrations',
    height: 300,
  },
  topSkills: {
    title: 'Most In-Demand Skills',
    type: 'bar',
    dataKey: 'topSkills',
    height: 300,
    maxItems: 10,
  },
  topLocations: {
    title: 'Top Locations by Recruiters',
    type: 'bar',
    dataKey: 'topLocations',
    height: 300,
    maxItems: 8,
  },
  applicationStatus: {
    title: 'Application Status',
    type: 'doughnut',
    dataKey: 'applicationStatus',
    height: 300,
  },
  topJobs: {
    title: 'Most Applied Jobs',
    type: 'bar',
    dataKey: 'topJobs',
    height: 300,
    maxItems: 8,
  },
  sectors: {
    title: 'Jobs by Sector',
    type: 'pie',
    dataKey: 'sectors',
    height: 300,
  },
};

// Configuration des graphs pour la page Analytics
export const ANALYTICS_CHARTS = {
  registrationTrend: {
    title: 'Registration Trend (12 months)',
    type: 'line',
    dataKey: 'registrationTrend',
    height: 350,
  },
  experienceDistribution: {
    title: 'Candidates by Experience Level',
    type: 'doughnut',
    dataKey: 'experienceDistribution',
    height: 300,
  },
  contractTypes: {
    title: 'Jobs by Contract Type',
    type: 'pie',
    dataKey: 'contractTypes',
    height: 300,
  },
  educationLevel: {
    title: 'Candidates by Education Level',
    type: 'bar',
    dataKey: 'educationLevel',
    height: 300,
  },
  salaryByPosition: {
    title: 'Average Salary by Position',
    type: 'bar',
    dataKey: 'salaryByPosition',
    height: 300,
    horizontal: true,
  },
  activeCompanies: {
    title: 'Most Active Companies',
    type: 'bar',
    dataKey: 'activeCompanies',
    height: 300,
    maxItems: 10,
  },
  recruitmentTimeline: {
    title: 'Average Recruitment Timeline',
    type: 'bar',
    dataKey: 'recruitmentTimeline',
    height: 300,
  },
  sourceBreakdown: {
    title: 'Application Sources',
    type: 'doughnut',
    dataKey: 'sourceBreakdown',
    height: 300,
  },
};

// Labels pour les statuts de candidature
export const APPLICATION_STATUS_LABELS = {
  pending: 'Pending',
  in_review: 'In Review',
  shortlisted: 'Shortlisted',
  interviewed: 'Interviewed',
  offered: 'Offered',
  hired: 'Hired',
  rejected: 'Rejected',
  withdrawn: 'Withdrawn',
};

// Labels pour les niveaux d'expérience
export const EXPERIENCE_LEVELS = {
  junior: 'Junior (0-2 years)',
  mid: 'Mid-Level (2-5 years)',
  senior: 'Senior (5-10 years)',
  lead: 'Lead/Principal (10+ years)',
};

// Labels pour les types de contrat
export const CONTRACT_TYPES = {
  full_time: 'Full-Time (CDI)',
  part_time: 'Part-Time',
  contract: 'Contract (CDD)',
  internship: 'Internship',
  freelance: 'Freelance',
};

// Labels pour les niveaux d'étude
export const EDUCATION_LEVELS = {
  high_school: 'High School',
  associate: 'Associate Degree',
  bachelor: "Bachelor's Degree",
  master: "Master's Degree",
  phd: 'PhD',
  other: 'Other',
};
