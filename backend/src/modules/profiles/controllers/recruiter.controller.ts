import { Request, Response } from "express";
import {
  createRecruiterProfileSchema,
  updateRecruiterProfileSchema,
} from "../profiles.validation.js";
import * as recruiterService from "../services/recruiter.service.js";
import * as fileUploadService from "../services/file-upload.service.js";

/**
 * Recruiter Profile Controller - Handle HTTP requests for recruiter profiles
 */

/**
 *  @method  POST
 *  @route   /api/v1/profiles/recruiter
 *  @desc    Create recruiter profile
 *  @access  Private (RECRUITER only)
 */
export const createRecruiterProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    // Validate request body
    const result = createRecruiterProfileSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: result.error.issues[0].message });
      return;
    }

    const profile = await recruiterService.createRecruiterProfile(userId, result.data);
    res.status(201).json(profile);
  } catch (error: any) {
    console.error("Error creating recruiter profile:", error);
    if (error.message === "Profile already exists. Use PUT to update.") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

/**
 *  @method  GET
 *  @route   /api/v1/profiles/recruiter
 *  @desc    Get current user's recruiter profile
 *  @access  Private (RECRUITER only)
 */
export const getRecruiterProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    const profile = await recruiterService.getRecruiterProfileByUserId(userId);

    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error getting recruiter profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 *  @method  GET
 *  @route   /api/v1/profiles/recruiter/:id
 *  @desc    Get public recruiter profile by ID
 *  @access  Public
 */
export const getRecruiterProfileById = async (req: Request, res: Response): Promise<void> => {
  try {
    const profileId = Number(req.params.id);

    if (isNaN(profileId)) {
      res.status(400).json({ message: "Invalid profile ID" });
      return;
    }

    const profile = await recruiterService.getPublicRecruiterProfile(profileId);

    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error getting recruiter profile by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 *  @method  PUT
 *  @route   /api/v1/profiles/recruiter
 *  @desc    Update recruiter profile
 *  @access  Private (RECRUITER only)
 */
export const updateRecruiterProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    // Validate request body
    const result = updateRecruiterProfileSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: result.error.issues[0].message });
      return;
    }

    const profile = await recruiterService.updateRecruiterProfile(userId, result.data);
    res.status(200).json(profile);
  } catch (error: any) {
    console.error("Error updating recruiter profile:", error);
    if (error.message === "Profile not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

/**
 *  @method  PATCH
 *  @route   /api/v1/profiles/recruiter/logo
 *  @desc    Update recruiter logo
 *  @access  Private (RECRUITER only)
 */
export const updateRecruiterLogo = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    // Check if file is provided
    if (!req.file) {
      res.status(400).json({ message: "No image provided" });
      return;
    }

    // Get old logo public ID for deletion
    const existingProfile = await recruiterService.getRecruiterProfileByUserId(userId);
    const oldLogoPublicId = existingProfile?.logoPublicId;

    // Upload new logo with old one deletion
    const logoData = await fileUploadService.updateRecruiterLogo(oldLogoPublicId, req.file);

    // Update profile with new logo data
    const profile = await recruiterService.updateRecruiterLogo(userId, {
      logo: logoData.url,
      logoPublicId: logoData.publicId,
    });

    res.status(200).json({ logo: profile.updatedProfile.logo });
  } catch (error: any) {
    console.error("Error updating recruiter logo:", error);
    if (error.message === "Profile not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

/**
 *  @method  DELETE
 *  @route   /api/v1/profiles/recruiter
 *  @desc    Delete recruiter profile
 *  @access  Private (RECRUITER only)
 */
export const deleteRecruiterProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    // Check if profile exists
    const exists = await recruiterService.recruiterProfileExists(userId);
    if (!exists) {
      res.status(404).json({ message: "Profile not found" });
      return;
    }

    await recruiterService.deleteRecruiterProfile(userId);
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting recruiter profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
