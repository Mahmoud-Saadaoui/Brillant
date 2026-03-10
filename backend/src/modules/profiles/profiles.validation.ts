import { z } from "zod";

// ==================== CANDIDATE PROFILE VALIDATIONS ====================

// Base schema without refinements (for partial updates)
const candidateProfileBaseSchema = z.object({
  avatarUrl: z.string().url("Invalid avatar URL").optional(),
  title: z.string().min(2, "Title must be at least 2 characters").optional(),
  bio: z.string().max(500, "Bio must not exceed 500 characters").optional(),
  location: z.string().optional(),
  availability: z
    .array(
      z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "FREELANCE"]),
    )
    .optional(),
  expectedSalaryMin: z.number().int().positive().optional(),
  expectedSalaryMax: z.number().int().positive().optional(),
  skills: z.array(z.string()).optional(),
  softSkills: z.array(z.string()).optional(),
  socialLinks: z
    .object({
      linkedin: z.string().url().optional(),
      github: z.string().url().optional(),
      portfolio: z.string().url().optional(),
      website: z.string().url().optional(),
    })
    .optional(),
});

// Create schema with refinement for salary validation
export const createCandidateProfileSchema = candidateProfileBaseSchema.refine(
  (data) => {
    if (data.expectedSalaryMin && data.expectedSalaryMax) {
      return data.expectedSalaryMin <= data.expectedSalaryMax;
    }
    return true;
  },
  {
    message: "Minimum salary cannot be greater than maximum salary",
    path: ["expectedSalaryMin"],
  },
);

// Update schema - partial with refinement
export const updateCandidateProfileSchema = candidateProfileBaseSchema
  .partial()
  .refine(
    (data) => {
      if (data.expectedSalaryMin && data.expectedSalaryMax) {
        return data.expectedSalaryMin <= data.expectedSalaryMax;
      }
      return true;
    },
    {
      message: "Minimum salary cannot be greater than maximum salary",
      path: ["expectedSalaryMin"],
    },
  );

export const updateAvatarSchema = z.object({
  avatarUrl: z.string().url("Invalid avatar URL"),
});

// ==================== RECRUITER PROFILE VALIDATIONS ====================

export const createRecruiterProfileSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  companyDescription: z
    .string()
    .max(1000, "Description must not exceed 1000 characters")
    .optional(),
  companySize: z.string().optional(),
  industry: z.string().optional(),
  logo: z.string().url("Invalid logo URL").optional(),
  location: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().url("Invalid website URL").optional(),
  socialLinks: z
    .object({
      linkedin: z.string().url().optional(),
      twitter: z.string().url().optional(),
      facebook: z.string().url().optional(),
      github: z.string().url().optional(),
      website: z.string().url().optional(),
    })
    .optional(),
});

export const updateRecruiterProfileSchema =
  createRecruiterProfileSchema.partial();

export const updateLogoSchema = z.object({
  logo: z.string().url("Invalid logo URL"),
});

// ==================== EXPERIENCE VALIDATIONS ====================

// Base schema without refinements
const experienceBaseSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  company: z.string().min(2, "Company must be at least 2 characters"),
  location: z.string().optional(),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()).optional(),
  description: z
    .string()
    .max(1000, "Description must not exceed 1000 characters")
    .optional(),
  current: z.boolean().default(false),
});

// Create schema with refinement for current job validation
export const createExperienceSchema = experienceBaseSchema.refine(
  (data) => {
    if (data.current && data.endDate) {
      return false;
    }
    return true;
  },
  {
    message: "End date cannot be provided when current is true",
    path: ["endDate"],
  },
);

// Update schema - make all fields optional, add refinement
export const updateExperienceSchema = experienceBaseSchema
  .extend({
    title: z.string().min(2, "Title must be at least 2 characters").optional(),
    company: z
      .string()
      .min(2, "Company must be at least 2 characters")
      .optional(),
    startDate: z.string().or(z.date()).optional(),
    endDate: z.string().or(z.date()).optional().optional(),
    current: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.current && data.endDate) {
        return false;
      }
      return true;
    },
    {
      message: "End date cannot be provided when current is true",
      path: ["endDate"],
    },
  );

// ==================== EDUCATION VALIDATIONS ====================

export const createEducationSchema = z.object({
  degree: z.string().min(2, "Degree must be at least 2 characters"),
  school: z.string().min(2, "School must be at least 2 characters"),
  field: z.string().optional(),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()).optional(),
  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
    .optional(),
});

export const updateEducationSchema = z.object({
  degree: z.string().min(2, "Degree must be at least 2 characters").optional(),
  school: z.string().min(2, "School must be at least 2 characters").optional(),
  field: z.string().optional(),
  startDate: z.string().or(z.date()).optional(),
  endDate: z.string().or(z.date()).optional(),
  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
    .optional(),
});

// ==================== LANGUAGE VALIDATIONS ====================

export const createLanguageSchema = z.object({
  language: z.string().min(2, "Language must be at least 2 characters"),
  level: z.enum(["BASIC", "INTERMEDIATE", "ADVANCED", "FLUENT", "NATIVE"]),
});

export const updateLanguageSchema = z.object({
  language: z
    .string()
    .min(2, "Language must be at least 2 characters")
    .optional(),
  level: z
    .enum(["BASIC", "INTERMEDIATE", "ADVANCED", "FLUENT", "NATIVE"])
    .optional(),
});

// ==================== CV UPLOAD VALIDATION ====================

export const uploadCvSchema = z.object({
  cvUrl: z.string().url("Invalid CV URL"),
});
