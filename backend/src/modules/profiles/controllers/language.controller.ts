import { Request, Response } from "express";
import { createLanguageSchema, updateLanguageSchema } from "../profiles.validation.js";
import * as languageService from "../services/language.service.js";

/**
 * Language Controller - Handle HTTP requests for candidate languages
 */

/**
 *  @method  POST
 *  @route   /api/v1/profiles/candidate/language
 *  @desc    Add language to candidate profile
 *  @access  Private (CANDIDATE only)
 */
export const addLanguage = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    // Validate request body
    const result = createLanguageSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: result.error.issues[0].message });
      return;
    }

    const language = await languageService.createLanguage(userId, result.data);
    res.status(201).json(language);
  } catch (error: any) {
    console.error("Error adding language:", error);
    if (error.message === "Profile not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

/**
 *  @method  PUT
 *  @route   /api/v1/profiles/candidate/language/:id
 *  @desc    Update language
 *  @access  Private (CANDIDATE only)
 */
export const updateLanguage = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const languageId = Number(req.params.id);

    if (isNaN(languageId)) {
      res.status(400).json({ message: "Invalid language ID" });
      return;
    }

    // Validate request body
    const result = updateLanguageSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: result.error.issues[0].message });
      return;
    }

    const language = await languageService.updateLanguage(
      userId,
      languageId,
      result.data
    );
    res.status(200).json(language);
  } catch (error: any) {
    console.error("Error updating language:", error);
    if (error.message === "Profile not found" || error.message === "Language not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

/**
 *  @method  DELETE
 *  @route   /api/v1/profiles/candidate/language/:id
 *  @desc    Delete language
 *  @access  Private (CANDIDATE only)
 */
export const deleteLanguage = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const languageId = Number(req.params.id);

    if (isNaN(languageId)) {
      res.status(400).json({ message: "Invalid language ID" });
      return;
    }

    await languageService.deleteLanguage(userId, languageId);
    res.status(200).json({ message: "Language deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting language:", error);
    if (error.message === "Profile not found" || error.message === "Language not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
