import { prisma } from "../../../config/db.js";
import { CreateLanguage, UpdateLanguage } from "../profiles.types.js";

/**
 * Language Service - Business logic for candidate languages
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
 * Create new language
 */
export const createLanguage = async (
  userId: number,
  data: CreateLanguage
) => {
  const candidateId = await getCandidateProfileId(userId);

  return await prisma.language.create({
    data: {
      candidateId,
      ...data,
    },
  });
};

/**
 * Get language by ID
 */
export const getLanguageById = async (languageId: number) => {
  return await prisma.language.findUnique({
    where: { id: languageId },
  });
};

/**
 * Update language
 */
export const updateLanguage = async (
  userId: number,
  languageId: number,
  data: UpdateLanguage
) => {
  const candidateId = await getCandidateProfileId(userId);

  // Check if language belongs to user's profile
  const existingLanguage = await prisma.language.findFirst({
    where: {
      id: languageId,
      candidateId,
    },
  });
  if (!existingLanguage) {
    throw new Error("Language not found");
  }

  // Update language
  return await prisma.language.update({
    where: { id: languageId },
    data,
  });
};

/**
 * Delete language
 */
export const deleteLanguage = async (userId: number, languageId: number) => {
  const candidateId = await getCandidateProfileId(userId);

  // Check if language belongs to user's profile
  const existingLanguage = await prisma.language.findFirst({
    where: {
      id: languageId,
      candidateId,
    },
  });
  if (!existingLanguage) {
    throw new Error("Language not found");
  }

  // Delete language
  await prisma.language.delete({
    where: { id: languageId },
  });
};
