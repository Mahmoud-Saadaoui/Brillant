// Données mockées pour les statistiques du dashboard TalentAI

// KPIs principaux - Page Dashboard
export const MOCK_DASHBOARD_KPI = {
  totalUsers: 12453,        // Total utilisateurs (candidats + recruteurs)
  totalRecruiters: 423,     // Total recruteurs
  totalCandidates: 12030,   // Total candidats
  totalJobs: 1567,         // Total emplois
};

// Évolution mensuelle des utilisateurs actifs vs inactifs (6 derniers mois)
export const MOCK_MONTHLY_ACTIVE_USERS = [
  { month: 'Sep 2025', active: 9234, inactive: 2876 },
  { month: 'Oct 2025', active: 9876, inactive: 3123 },
  { month: 'Nov 2025', active: 10456, inactive: 3345 },
  { month: 'Dec 2025', active: 11234, inactive: 3567 },
  { month: 'Jan 2026', active: 11890, inactive: 3789 },
  { month: 'Feb 2026', active: 12453, inactive: 3987 },
];

// Candidats par secteur
export const MOCK_CANDIDATES_BY_SECTOR = [
  { sector: 'Technology', candidates: 4523 },
  { sector: 'Finance', candidates: 2134 },
  { sector: 'Healthcare', candidates: 1876 },
  { sector: 'E-commerce', candidates: 1234 },
  { sector: 'Consulting', candidates: 987 },
  { sector: 'Education', candidates: 654 },
  { sector: 'Marketing', candidates: 543 },
  { sector: 'Other', candidates: 79 },
];

// Emplois par type de contrat
export const MOCK_JOBS_BY_CONTRACT = [
  { type: 'CDI', count: 876, color: '#10b981' },
  { type: 'CDD', count: 345, color: '#f59e0b' },
  { type: 'Freelance', count: 234, color: '#3b82f6' },
  { type: 'Stage', count: 89, color: '#8b5cf6' },
  { type: 'Alternance', count: 23, color: '#ec4899' },
];

// Utilisateurs par ville (top 10)
export const MOCK_USERS_BY_CITY = [
  { city: 'Paris', users: 4523, candidates: 4234, recruiters: 289 },
  { city: 'Lyon', users: 2345, candidates: 2187, recruiters: 158 },
  { city: 'Marseille', users: 1876, candidates: 1756, recruiters: 120 },
  { city: 'Toulouse', users: 1234, candidates: 1156, recruiters: 78 },
  { city: 'Nice', users: 987, candidates: 923, recruiters: 64 },
  { city: 'Nantes', users: 765, candidates: 712, recruiters: 53 },
  { city: 'Bordeaux', users: 654, candidates: 612, recruiters: 42 },
  { city: 'Lille', users: 543, candidates: 509, recruiters: 34 },
  { city: 'Strasbourg', users: 432, candidates: 405, recruiters: 27 },
  { city: 'Montpellier', users: 394, candidates: 369, recruiters: 25 },
];

// ============================================
// Données pour la page Analytics
// ============================================

// Évolution mensuelle des inscriptions (12 mois) - Candidats & Recruteurs
export const MOCK_REGISTRATION_TREND = [
  { month: 'Mar 2025', candidates: 423, recruiters: 12 },
  { month: 'Apr 2025', candidates: 567, recruiters: 15 },
  { month: 'May 2025', candidates: 698, recruiters: 18 },
  { month: 'Jun 2025', candidates: 834, recruiters: 22 },
  { month: 'Jul 2025', candidates: 987, recruiters: 25 },
  { month: 'Aug 2025', candidates: 1123, recruiters: 28 },
  { month: 'Sep 2025', candidates: 1345, recruiters: 32 },
  { month: 'Oct 2025', candidates: 1567, recruiters: 38 },
  { month: 'Nov 2025', candidates: 1789, recruiters: 42 },
  { month: 'Dec 2025', candidates: 1987, recruiters: 48 },
  { month: 'Jan 2026', candidates: 2123, recruiters: 52 },
  { month: 'Feb 2026', candidates: 2345, recruiters: 56 },
];

// Candidats par niveau d'expérience
export const MOCK_CANDIDATES_BY_EXPERIENCE = [
  { level: 'Junior (0-2 ans)', value: 4876, color: '#3b82f6' },
  { level: 'Intermédiaire (2-5 ans)', value: 3987, color: '#10b981' },
  { level: 'Senior (5-10 ans)', value: 2456, color: '#f59e0b' },
  { level: 'Expert (10+ ans)', value: 711, color: '#8b5cf6' },
];

// Emplois par secteur (pie chart)
export const MOCK_JOBS_BY_SECTOR_ANALYTICS = [
  { sector: 'Technology', value: 456, color: '#3b82f6' },
  { sector: 'Finance', value: 234, color: '#10b981' },
  { sector: 'Healthcare', value: 189, color: '#f59e0b' },
  { sector: 'E-commerce', value: 156, color: '#8b5cf6' },
  { sector: 'Consulting', value: 123, color: '#ec4899' },
  { sector: 'Education', value: 87, color: '#6366f1' },
  { sector: 'Other', value: 322, color: '#6b7280' },
];

// Salaires moyens par poste
export const MOCK_AVG_SALARY_BY_POSITION = [
  { position: 'Data Scientist', salary: 52000 },
  { position: 'Full Stack Developer', salary: 48000 },
  { position: 'DevOps Engineer', salary: 51000 },
  { position: 'Product Manager', salary: 55000 },
  { position: 'UX/UI Designer', salary: 42000 },
  { position: 'Backend Engineer', salary: 49000 },
  { position: 'Frontend Developer', salary: 43000 },
  { position: 'ML Engineer', salary: 58000 },
];

// Entreprises les plus actives
export const MOCK_ACTIVE_COMPANIES = [
  { company: 'TechCorp', jobs: 45, hires: 23 },
  { company: 'DataFlow', jobs: 38, hires: 19 },
  { company: 'InnovateTech', jobs: 32, hires: 16 },
  { company: 'CloudSystems', jobs: 28, hires: 14 },
  { company: 'WebSolutions', jobs: 25, hires: 12 },
  { company: 'FinTech Pro', jobs: 22, hires: 11 },
  { company: 'HealthTech', jobs: 19, hires: 10 },
  { company: 'E-comHub', jobs: 17, hires: 9 },
];

// Temps de recrutement moyen par étape (en jours)
export const MOCK_RECRUITMENT_TIMELINE = [
  { stage: 'Reception CV', days: 1 },
  { stage: 'Preslection', days: 3 },
  { stage: 'Entretien HR', days: 7 },
  { stage: 'Test technique', days: 12 },
  { stage: 'Entretien technique', days: 18 },
  { stage: 'Proposition', days: 25 },
  { stage: 'Embauche', days: 32 },
];

// Sources des candidatures
export const MOCK_APPLICATION_SOURCES = [
  { source: 'Site Direct', value: 5434, color: '#3b82f6' },
  { source: 'LinkedIn', value: 3456, color: '#0077b5' },
  { source: 'Indeed', value: 2187, color: '#6366f1' },
  { source: 'Recommandation', value: 1234, color: '#10b981' },
  { source: 'Autres', value: 142, color: '#8b5cf6' },
];

// Statistiques additionnelles
export const MOCK_ADDITIONAL_STATS = {
  avgRecruitmentTime: 32, // jours
  avgSalary: 47000, // euros
  newJobsThisWeek: 156,
  newApplicationsToday: 89,
  interviewsScheduled: 45,
  offersPending: 23,
  placementRate: 18.5, // pourcentage
};
