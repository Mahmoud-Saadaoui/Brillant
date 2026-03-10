import { prisma } from "../../../config/db.js";
import {
  CreateCandidateProfile,
  UpdateCandidateProfile,
  CandidateProfileResponse,
} from "../profiles.types.js";

/**
 * Candidate Profile Service - Business logic for candidate profiles
 */

/**
 * Get candidate profile by user ID with full relations
 */
export const getCandidateProfileByUserId = async (
  userId: number
): Promise<CandidateProfileResponse | null> => {
  return await prisma.candidateProfile.findUnique({
    where: { userId },
    include: {
      experiences: {
        orderBy: { startDate: "desc" },
      },
      education: {
        orderBy: { startDate: "desc" },
      },
      languages: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  }) as CandidateProfileResponse | null;
};

/**
 * Get public candidate profile (without sensitive data)
 */
export const getPublicCandidateProfile = async (
  profileId: number
): Promise<CandidateProfileResponse | null> => {
  return await prisma.candidateProfile.findUnique({
    where: { id: profileId },
    include: {
      experiences: {
        orderBy: { startDate: "desc" },
      },
      education: {
        orderBy: { startDate: "desc" },
      },
      languages: true,
      user: {
        select: {
          id: true,
          name: true,
          email: false, // Hide email
          role: true,
        },
      },
    },
  }) as CandidateProfileResponse | null;
};

/**
 * Check if candidate profile exists for user
 */
export const candidateProfileExists = async (userId: number): Promise<boolean> => {
  const profile = await prisma.candidateProfile.findUnique({
    where: { userId },
    select: { id: true },
  });
  return !!profile;
};

/**
 * Create new candidate profile
 */
export const createCandidateProfile = async (
  userId: number,
  data: CreateCandidateProfile
): Promise<CandidateProfileResponse> => {
  // Check if profile already exists
  const existingProfile = await prisma.candidateProfile.findUnique({
    where: { userId },
  });
  if (existingProfile) {
    throw new Error("Profile already exists. Use PUT to update.");
  }

  // Build create data object
  const createData: any = {
    userId,
    ...data,
  };

  // Handle socialLinks separately to avoid type issues
  if (data.socialLinks) {
    createData.socialLinks = data.socialLinks as any;
  } else {
    delete createData.socialLinks;
  }

  // Create profile
  return await prisma.candidateProfile.create({
    data: createData,
    include: {
      experiences: true,
      education: true,
      languages: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  }) as CandidateProfileResponse;
};

/**
 * Update candidate profile
 */
export const updateCandidateProfile = async (
  userId: number,
  data: UpdateCandidateProfile
): Promise<CandidateProfileResponse> => {
  // Check if profile exists
  const existingProfile = await prisma.candidateProfile.findUnique({
    where: { userId },
  });
  if (!existingProfile) {
    throw new Error("Profile not found");
  }

  // Build update data object
  const updateData: any = { ...data };

  // Handle socialLinks separately to avoid type issues
  if (data.socialLinks !== undefined) {
    updateData.socialLinks = data.socialLinks as any;
  } else {
    delete updateData.socialLinks;
  }

  // Update profile
  return await prisma.candidateProfile.update({
    where: { userId },
    data: updateData,
    include: {
      experiences: true,
      education: true,
      languages: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  }) as CandidateProfileResponse;
};

/**
 * Update candidate avatar
 */
export const updateCandidateAvatar = async (
  userId: number,
  avatarData: { avatarUrl: string; avatarPublicId: string }
) => {
  return await prisma.candidateProfile.update({
    where: { userId },
    data: avatarData,
    select: {
      avatarUrl: true,
    },
  });
};

/**
 * Update candidate CV
 */
export const updateCandidateCv = async (
  userId: number,
  cvData: { cvUrl: string; cvPublicId: string }
) => {
  return await prisma.candidateProfile.update({
    where: { userId },
    data: cvData,
    select: {
      cvUrl: true,
    },
  });
};

/**
 * Delete candidate profile
 */
export const deleteCandidateProfile = async (userId: number): Promise<void> => {
  await prisma.candidateProfile.delete({
    where: { userId },
  });
};

/**
 * Validate date range (end date after start date)
 */
export const isValidDateRange = (startDate: Date, endDate?: Date): boolean => {
  if (!endDate) return true;
  return endDate > startDate;
};

/**
 * Validate salary range (max greater than min)
 */
export const isValidSalaryRange = (min: number, max: number): boolean => {
  return min <= max;
};
