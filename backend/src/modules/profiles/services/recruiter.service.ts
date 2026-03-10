import { prisma } from "../../../config/db.js";
import {
  CreateRecruiterProfile,
  UpdateRecruiterProfile,
  RecruiterProfileResponse,
} from "../profiles.types.js";

/**
 * Recruiter Profile Service - Business logic for recruiter profiles
 */

/**
 * Get recruiter profile by user ID
 */
export const getRecruiterProfileByUserId = async (
  userId: number
): Promise<RecruiterProfileResponse | null> => {
  return await prisma.recruiterProfile.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  }) as RecruiterProfileResponse | null;
};

/**
 * Get public recruiter profile (without sensitive data)
 */
export const getPublicRecruiterProfile = async (
  profileId: number
): Promise<RecruiterProfileResponse | null> => {
  return await prisma.recruiterProfile.findUnique({
    where: { id: profileId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: false, // Hide email
          role: true,
        },
      },
    },
  }) as RecruiterProfileResponse | null;
};

/**
 * Check if recruiter profile exists for user
 */
export const recruiterProfileExists = async (userId: number): Promise<boolean> => {
  const profile = await prisma.recruiterProfile.findUnique({
    where: { userId },
    select: { id: true },
  });
  return !!profile;
};

/**
 * Create new recruiter profile
 */
export const createRecruiterProfile = async (
  userId: number,
  data: CreateRecruiterProfile
): Promise<RecruiterProfileResponse> => {
  // Check if profile already exists
  const existingProfile = await prisma.recruiterProfile.findUnique({
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
  return await prisma.recruiterProfile.create({
    data: createData,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  }) as RecruiterProfileResponse;
};

/**
 * Update recruiter profile
 */
export const updateRecruiterProfile = async (
  userId: number,
  data: UpdateRecruiterProfile
): Promise<RecruiterProfileResponse> => {
  // Check if profile exists
  const existingProfile = await prisma.recruiterProfile.findUnique({
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
  return await prisma.recruiterProfile.update({
    where: { userId },
    data: updateData,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  }) as RecruiterProfileResponse;
};

/**
 * Update recruiter logo
 */
export const updateRecruiterLogo = async (
  userId: number,
  logoData: { logo: string; logoPublicId: string }
) => {
  return await prisma.recruiterProfile.update({
    where: { userId },
    data: logoData,
    select: {
      logo: true,
    },
  });
};

/**
 * Delete recruiter profile
 */
export const deleteRecruiterProfile = async (userId: number): Promise<void> => {
  await prisma.recruiterProfile.delete({
    where: { userId },
  });
};
