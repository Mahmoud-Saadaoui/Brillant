import { prisma } from "../../../config/db.js";
import { CreateExperience, UpdateExperience } from "../profiles.types.js";

/**
 * Experience Service - Business logic for candidate experiences
 */

/**
 * Get candidate's profile ID
 */
const getCandidateProfileId = async (userId: number): Promise<number> => {
  const profile = await prisma.candidateProfile.findUnique({
    where: { userId },
    select: { id: true },
  });
  if (!profile) {
    throw new Error("Profile not found");
  }
  return profile.id;
};

/**
 * Create new experience
 */
export const createExperience = async (
  userId: number,
  data: CreateExperience
) => {
  const candidateId = await getCandidateProfileId(userId);

  return await prisma.experience.create({
    data: {
      candidateId,
      ...data,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
    },
  });
};

/**
 * Get experience by ID
 */
export const getExperienceById = async (experienceId: number) => {
  return await prisma.experience.findUnique({
    where: { id: experienceId },
  });
};

/**
 * Update experience
 */
export const updateExperience = async (
  userId: number,
  experienceId: number,
  data: UpdateExperience
) => {
  const candidateId = await getCandidateProfileId(userId);

  // Check if experience belongs to user's profile
  const existingExperience = await prisma.experience.findFirst({
    where: {
      id: experienceId,
      candidateId,
    },
  });
  if (!existingExperience) {
    throw new Error("Experience not found");
  }

  // Update experience
  return await prisma.experience.update({
    where: { id: experienceId },
    data: {
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : existingExperience.startDate,
      endDate: data.endDate !== undefined
        ? (data.endDate ? new Date(data.endDate) : null)
        : existingExperience.endDate,
    },
  });
};

/**
 * Delete experience
 */
export const deleteExperience = async (userId: number, experienceId: number) => {
  const candidateId = await getCandidateProfileId(userId);

  // Check if experience belongs to user's profile
  const existingExperience = await prisma.experience.findFirst({
    where: {
      id: experienceId,
      candidateId,
    },
  });
  if (!existingExperience) {
    throw new Error("Experience not found");
  }

  // Delete experience
  await prisma.experience.delete({
    where: { id: experienceId },
  });
};
