import { prisma } from "../../../config/db.js";
import { CreateEducation, UpdateEducation } from "../profiles.types.js";

/**
 * Education Service - Business logic for candidate education
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
 * Create new education
 */
export const createEducation = async (
  userId: number,
  data: CreateEducation
) => {
  const candidateId = await getCandidateProfileId(userId);

  return await prisma.education.create({
    data: {
      candidateId,
      ...data,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
    },
  });
};

/**
 * Get education by ID
 */
export const getEducationById = async (educationId: number) => {
  return await prisma.education.findUnique({
    where: { id: educationId },
  });
};

/**
 * Update education
 */
export const updateEducation = async (
  userId: number,
  educationId: number,
  data: UpdateEducation
) => {
  const candidateId = await getCandidateProfileId(userId);

  // Check if education belongs to user's profile
  const existingEducation = await prisma.education.findFirst({
    where: {
      id: educationId,
      candidateId,
    },
  });
  if (!existingEducation) {
    throw new Error("Education not found");
  }

  // Update education
  return await prisma.education.update({
    where: { id: educationId },
    data: {
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : existingEducation.startDate,
      endDate: data.endDate !== undefined
        ? (data.endDate ? new Date(data.endDate) : null)
        : existingEducation.endDate,
    },
  });
};

/**
 * Delete education
 */
export const deleteEducation = async (userId: number, educationId: number) => {
  const candidateId = await getCandidateProfileId(userId);

  // Check if education belongs to user's profile
  const existingEducation = await prisma.education.findFirst({
    where: {
      id: educationId,
      candidateId,
    },
  });
  if (!existingEducation) {
    throw new Error("Education not found");
  }

  // Delete education
  await prisma.education.delete({
    where: { id: educationId },
  });
};
