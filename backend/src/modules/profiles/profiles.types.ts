import { Role, Availability, LanguageLevel, JobType, ApplicationStatus } from "@prisma/client";

// ==================== CANDIDATE PROFILE TYPES ====================

export interface CreateCandidateProfile {
  avatarUrl?: string;
  title?: string;
  bio?: string;
  location?: string;
  availability?: Availability[];
  expectedSalaryMin?: number;
  expectedSalaryMax?: number;
  skills?: string[];
  softSkills?: string[];
  socialLinks?: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
    website?: string;
  };
}

export interface UpdateCandidateProfile {
  avatarUrl?: string;
  title?: string;
  bio?: string;
  location?: string;
  availability?: Availability[];
  expectedSalaryMin?: number;
  expectedSalaryMax?: number;
  skills?: string[];
  softSkills?: string[];
  socialLinks?: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
    website?: string;
  };
}

export interface CandidateProfileResponse {
  id: number;
  userId: number;
  avatarUrl: string | null;
  title: string | null;
  bio: string | null;
  location: string | null;
  availability: Availability[];
  expectedSalaryMin: number | null;
  expectedSalaryMax: number | null;
  skills: string[];
  softSkills: string[];
  socialLinks: object | null;
  cvUrl: string | null;
  embeddingId: number | null;
  createdAt: Date;
  updatedAt: Date;
  experiences: ExperienceResponse[];
  education: EducationResponse[];
  languages: LanguageResponse[];
  user?: {
    id: number;
    name: string;
    email: string;
    role: Role;
  };
}

// ==================== RECRUITER PROFILE TYPES ====================

export interface CreateRecruiterProfile {
  companyName: string;
  companyDescription?: string;
  companySize?: string;
  industry?: string;
  logo?: string;
  location?: string;
  phone?: string;
  website?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    github?: string;
    website?: string;
  };
}

export interface UpdateRecruiterProfile {
  companyName?: string;
  companyDescription?: string;
  companySize?: string;
  industry?: string;
  logo?: string;
  location?: string;
  phone?: string;
  website?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    github?: string;
    website?: string;
  };
}

export interface RecruiterProfileResponse {
  id: number;
  userId: number;
  companyName: string;
  companyDescription: string | null;
  companySize: string | null;
  industry: string | null;
  logo: string | null;
  location: string | null;
  phone: string | null;
  website: string | null;
  socialMedia: object | null;
  socialLinks: object | null;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: number;
    name: string;
    email: string;
    role: Role;
  };
}

// ==================== EXPERIENCE TYPES ====================

export interface CreateExperience {
  title: string;
  company: string;
  location?: string;
  startDate: Date | string;
  endDate?: Date | string;
  description?: string;
  current?: boolean;
}

export interface UpdateExperience {
  title?: string;
  company?: string;
  location?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  description?: string;
  current?: boolean;
}

export interface ExperienceResponse {
  id: number;
  candidateId: number;
  title: string;
  company: string;
  location: string | null;
  startDate: Date;
  endDate: Date | null;
  description: string | null;
  current: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ==================== EDUCATION TYPES ====================

export interface CreateEducation {
  degree: string;
  school: string;
  field?: string;
  startDate: Date | string;
  endDate?: Date | string;
  description?: string;
}

export interface UpdateEducation {
  degree?: string;
  school?: string;
  field?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  description?: string;
}

export interface EducationResponse {
  id: number;
  candidateId: number;
  degree: string;
  school: string;
  field: string | null;
  startDate: Date;
  endDate: Date | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ==================== LANGUAGE TYPES ====================

export interface CreateLanguage {
  language: string;
  level: LanguageLevel;
}

export interface UpdateLanguage {
  language?: string;
  level?: LanguageLevel;
}

export interface LanguageResponse {
  id: number;
  candidateId: number;
  language: string;
  level: LanguageLevel;
  createdAt: Date;
  updatedAt: Date;
}

// ==================== CV UPLOAD TYPE ====================

export interface CvUploadResponse {
  cvUrl: string;
  message: string;
}
