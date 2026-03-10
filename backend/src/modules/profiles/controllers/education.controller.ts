import { Request, Response } from "express";
import { createEducationSchema, updateEducationSchema } from "../profiles.validation.js";
import * as educationService from "../services/education.service.js";

/**
 * Education Controller - Handle HTTP requests for candidate education
 */

/**
 *  @method  POST
 *  @route   /api/v1/profiles/candidate/education
 *  @desc    Add education to candidate profile
 *  @access  Private (CANDIDATE only)
 */
export const addEducation = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    // Validate request body
    const result = createEducationSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: result.error.issues[0].message });
      return;
    }

    const education = await educationService.createEducation(userId, result.data);
    res.status(201).json(education);
  } catch (error: any) {
    console.error("Error adding education:", error);
    if (error.message === "Profile not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

/**
 *  @method  PUT
 *  @route   /api/v1/profiles/candidate/education/:id
 *  @desc    Update education
 *  @access  Private (CANDIDATE only)
 */
export const updateEducation = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const educationId = Number(req.params.id);

    if (isNaN(educationId)) {
      res.status(400).json({ message: "Invalid education ID" });
      return;
    }

    // Validate request body
    const result = updateEducationSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: result.error.issues[0].message });
      return;
    }

    const education = await educationService.updateEducation(
      userId,
      educationId,
      result.data
    );
    res.status(200).json(education);
  } catch (error: any) {
    console.error("Error updating education:", error);
    if (error.message === "Profile not found" || error.message === "Education not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

/**
 *  @method  DELETE
 *  @route   /api/v1/profiles/candidate/education/:id
 *  @desc    Delete education
 *  @access  Private (CANDIDATE only)
 */
export const deleteEducation = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const educationId = Number(req.params.id);

    if (isNaN(educationId)) {
      res.status(400).json({ message: "Invalid education ID" });
      return;
    }

    await educationService.deleteEducation(userId, educationId);
    res.status(200).json({ message: "Education deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting education:", error);
    if (error.message === "Profile not found" || error.message === "Education not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
