import { Request, Response } from "express";
import {
  createCandidateProfileSchema,
  updateCandidateProfileSchema,
} from "../profiles.validation.js";
import * as candidateService from "../services/candidate.service.js";
import * as fileUploadService from "../services/file-upload.service.js";

/**
 * Candidate Profile Controller - Handle HTTP requests for candidate profiles
 */

/**
 *  @method  POST
 *  @route   /api/v1/profiles/candidate
 *  @desc    Create candidate profile
 *  @access  Private (CANDIDATE only)
 */
export const createCandidateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    // Validate request body
    const result = createCandidateProfileSchema.safeParse(req.body);  
    if (!result.success) {
      res.status(400).json({ message: result.error.issues[0].message });
      return;
    }

    const profile = await candidateService.createCandidateProfile(userId, result.data);
    res.status(201).json(profile);
  } catch (error: any) {
    console.error("Error creating candidate profile:", error);
    if (error.message === "Profile already exists. Use PUT to update.") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

/**
 *  @method  GET
 *  @route   /api/v1/profiles/candidate
 *  @desc    Get current user's candidate profile
 *  @access  Private (CANDIDATE only)
 */
export const getCandidateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    const profile = await candidateService.getCandidateProfileByUserId(userId);

    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error getting candidate profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 *  @method  GET
 *  @route   /api/v1/profiles/candidate/:id
 *  @desc    Get public candidate profile by ID
 *  @access  Public
 */
export const getCandidateProfileById = async (req: Request, res: Response): Promise<void> => {
  try {
    const profileId = Number(req.params.id);

    if (isNaN(profileId)) {
      res.status(400).json({ message: "Invalid profile ID" });
      return;
    }

    const profile = await candidateService.getPublicCandidateProfile(profileId);

    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error getting candidate profile by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 *  @method  PUT
 *  @route   /api/v1/profiles/candidate
 *  @desc    Update candidate profile
 *  @access  Private (CANDIDATE only)
 */
export const updateCandidateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    // Validate request body
    const result = updateCandidateProfileSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: result.error.issues[0].message });
      return;
    }

    const profile = await candidateService.updateCandidateProfile(userId, result.data);
    res.status(200).json(profile);
  } catch (error: any) {
    console.error("Error updating candidate profile:", error);
    if (error.message === "Profile not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

/**
 *  @method  PATCH
 *  @route   /api/v1/profiles/candidate/avatar
 *  @desc    Update candidate avatar
 *  @access  Private (CANDIDATE only)
 */
export const updateCandidateAvatar = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    // Check if file is provided
    if (!req.file) {
      res.status(400).json({ message: "No image provided" });
      return;
    }

    // Upload to Cloudinary and update profile
    const avatarData = await fileUploadService.uploadCandidateAvatar(userId, req.file);
    const profile = await candidateService.updateCandidateAvatar(userId, {
      avatarUrl: avatarData.url,
      avatarPublicId: avatarData.publicId,
    });

    res.status(200).json({ avatarUrl: profile.avatarUrl });
  } catch (error: any) {
    console.error("Error updating candidate avatar:", error);
    if (error.message === "Profile not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

/**
 *  @method  PATCH
 *  @route   /api/v1/profiles/candidate/cv
 *  @desc    Upload candidate CV
 *  @access  Private (CANDIDATE only)
 */
export const uploadCandidateCv = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    // Check if file is provided
    if (!req.file) {
      res.status(400).json({ message: "No file provided" });
      return;
    }

    // Upload to Cloudinary and update profile
    const cvData = await fileUploadService.uploadCandidateCv(userId, req.file);
    const profile = await candidateService.updateCandidateCv(userId, {
      cvUrl: cvData.url,
      cvPublicId: cvData.publicId,
    });

    res.status(200).json({
      cvUrl: profile.cvUrl,
      message: "CV uploaded successfully",
    });
  } catch (error: any) {
    console.error("Error uploading candidate CV:", error);
    if (error.message === "Profile not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

/**
 *  @method  DELETE
 *  @route   /api/v1/profiles/candidate
 *  @desc    Delete candidate profile
 *  @access  Private (CANDIDATE only)
 */
export const deleteCandidateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    // Check if profile exists
    const exists = await candidateService.candidateProfileExists(userId);
    if (!exists) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }

    await candidateService.deleteCandidateProfile(userId);
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting candidate profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
