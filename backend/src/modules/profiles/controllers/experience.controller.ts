import { Request, Response } from "express";
import { createExperienceSchema, updateExperienceSchema } from "../profiles.validation.js";
import * as experienceService from "../services/experience.service.js";

/**
 * Experience Controller - Handle HTTP requests for candidate experiences
 */

/**
 *  @method  POST
 *  @route   /api/v1/profiles/candidate/experience
 *  @desc    Add experience to candidate profile
 *  @access  Private (CANDIDATE only)
 */
export const addExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    // Validate request body
    const result = createExperienceSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: result.error.issues[0].message });
      return;
    }

    const experience = await experienceService.createExperience(userId, result.data);
    res.status(201).json(experience);
  } catch (error: any) {
    console.error("Error adding experience:", error);
    if (error.message === "Profile not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

/**
 *  @method  PUT
 *  @route   /api/v1/profiles/candidate/experience/:id
 *  @desc    Update experience
 *  @access  Private (CANDIDATE only)
 */
export const updateExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const experienceId = Number(req.params.id);

    if (isNaN(experienceId)) {
      res.status(400).json({ message: "Invalid experience ID" });
      return;
    }

    // Validate request body
    const result = updateExperienceSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: result.error.issues[0].message });
      return;
    }

    const experience = await experienceService.updateExperience(
      userId,
      experienceId,
      result.data
    );
    res.status(200).json(experience);
  } catch (error: any) {
    console.error("Error updating experience:", error);
    if (error.message === "Profile not found" || error.message === "Experience not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

/**
 *  @method  DELETE
 *  @route   /api/v1/profiles/candidate/experience/:id
 *  @desc    Delete experience
 *  @access  Private (CANDIDATE only)
 */
export const deleteExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const experienceId = Number(req.params.id);

    if (isNaN(experienceId)) {
      res.status(400).json({ message: "Invalid experience ID" });
      return;
    }

    await experienceService.deleteExperience(userId, experienceId);
    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting experience:", error);
    if (error.message === "Profile not found" || error.message === "Experience not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
