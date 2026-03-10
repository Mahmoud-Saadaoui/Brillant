import path from 'path';
import {
  cloudinaryUploadFile,
  cloudinaryRemoveFile,
  cloudinaryRemoveMultipleFiles,
} from '../../../utils/cloudinary.js';
import { removeLocalFile, getLocalFilePath } from '../utils/fileUpload.js';

// Types for upload response
export interface UploadedFileResponse {
  url: string;
  publicId: string;
  resourceType: string;
  bytes: number;
  format: string;
}

export interface UploadResult {
  success: boolean;
  data?: UploadedFileResponse;
  error?: string;
}

/**
 * Upload file to Cloudinary following the back-cloudinary methodology:
 * 1. File is already uploaded locally by Multer middleware
 * 2. Upload the local file to Cloudinary
 * 3. Remove the local file after successful Cloudinary upload
 *
 * @param filename - The filename of the locally uploaded file
 * @param resourceType - Type of resource: 'image' or 'raw'
 * @returns UploadResult with Cloudinary data or error
 */
export const uploadToCloudinary = async (
  filename: string,
  resourceType: 'image' | 'raw' = 'image'
): Promise<UploadResult> => {
  try {
    // Step 1: Get the local file path
    const localFilePath = getLocalFilePath(filename);

    // Step 2: Upload to Cloudinary
    const cloudinaryData = await cloudinaryUploadFile(localFilePath, resourceType);

    // Step 3: Remove local file after successful upload
    removeLocalFile(localFilePath);

    // Step 4: Return the Cloudinary data
    return {
      success: true,
      data: {
        url: cloudinaryData.secure_url,
        publicId: cloudinaryData.public_id,
        resourceType: cloudinaryData.resource_type,
        bytes: cloudinaryData.bytes,
        format: cloudinaryData.format,
      },
    };
  } catch (error: any) {
    // Clean up local file even if upload fails
    removeLocalFile(filename);

    return {
      success: false,
      error: error.message || 'Failed to upload file to Cloudinary',
    };
  }
};

/**
 * Upload multiple files to Cloudinary
 *
 * @param filenames - Array of filenames of the locally uploaded files
 * @param resourceType - Type of resource: 'image' or 'raw'
 * @returns Promise<UploadResult[]> with results for each file
 */
export const uploadMultipleToCloudinary = async (
  filenames: string[],
  resourceType: 'image' | 'raw' = 'image'
): Promise<UploadResult[]> => {
  const uploadPromises = filenames.map((filename) =>
    uploadToCloudinary(filename, resourceType)
  );

  return Promise.all(uploadPromises);
};

/**
 * Delete file from Cloudinary
 *
 * @param publicId - Cloudinary public ID of the file
 * @param resourceType - Type of resource: 'image' or 'raw'
 * @returns Promise<boolean> indicating success
 */
export const deleteFromCloudinary = async (
  publicId: string,
  resourceType: 'image' | 'raw' = 'image'
): Promise<boolean> => {
  try {
    const result = await cloudinaryRemoveFile(publicId, resourceType);
    return result.result === 'ok';
  } catch (error: any) {
    console.error('Error deleting from Cloudinary:', error);
    return false;
  }
};

/**
 * Delete multiple files from Cloudinary
 *
 * @param publicIds - Array of Cloudinary public IDs
 * @param resourceType - Type of resource: 'image' or 'raw'
 * @returns Promise<boolean> indicating success
 */
export const deleteMultipleFromCloudinary = async (
  publicIds: string[],
  resourceType: 'image' | 'raw' = 'image'
): Promise<boolean> => {
  try {
    const result = await cloudinaryRemoveMultipleFiles(publicIds, resourceType);
    return result.deleted !== null;
  } catch (error: any) {
    console.error('Error deleting multiple from Cloudinary:', error);
    return false;
  }
};

/**
 * Handle complete upload flow for Express request with Multer file
 * This is a helper function to use in controllers
 *
 * @param req - Express request with file property from Multer
 * @param resourceType - Type of resource: 'image' or 'raw'
 * @returns UploadResult with Cloudinary data or error
 */
export const handleFileUpload = async (
  req: any,
  resourceType: 'image' | 'raw' = 'image'
): Promise<UploadResult> => {
  if (!req.file) {
    return {
      success: false,
      error: 'No file provided',
    };
  }

  return uploadToCloudinary(req.file.filename, resourceType);
};

/**
 * Handle complete upload flow for multiple files
 *
 * @param req - Express request with files property from Multer
 * @param resourceType - Type of resource: 'image' or 'raw'
 * @returns Promise<UploadResult[]> with results for each file
 */
export const handleMultipleFileUpload = async (
  req: any,
  resourceType: 'image' | 'raw' = 'image'
): Promise<UploadResult[]> => {
  if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
    return [{
      success: false,
      error: 'No files provided',
    }];
  }

  const filenames = req.files.map((file: Express.Multer.File) => file.filename);
  return uploadMultipleToCloudinary(filenames, resourceType);
};

// ==================== PROFILE SPECIFIC UPLOAD FUNCTIONS ====================

/**
 * Upload candidate avatar to Cloudinary
 *
 * @param userId - User ID for validation
 * @param file - Multer file object
 * @returns Promise with upload result containing url and publicId
 */
export const uploadCandidateAvatar = async (
  userId: number,
  file: Express.Multer.File
): Promise<{ url: string; publicId: string }> => {
  const result = await uploadToCloudinary(file.filename, 'image');

  if (!result.success || !result.data) {
    throw new Error(result.error || 'Failed to upload avatar');
  }

  return {
    url: result.data.url,
    publicId: result.data.publicId,
  };
};

/**
 * Upload candidate CV to Cloudinary
 *
 * @param userId - User ID for validation
 * @param file - Multer file object
 * @returns Promise with upload result containing url and publicId
 */
export const uploadCandidateCv = async (
  userId: number,
  file: Express.Multer.File
): Promise<{ url: string; publicId: string }> => {
  const result = await uploadToCloudinary(file.filename, 'raw');

  if (!result.success || !result.data) {
    throw new Error(result.error || 'Failed to upload CV');
  }

  return {
    url: result.data.url,
    publicId: result.data.publicId,
  };
};

/**
 * Upload recruiter logo to Cloudinary
 *
 * @param userId - User ID for validation
 * @param file - Multer file object
 * @returns Promise with upload result containing url and publicId
 */
export const uploadRecruiterLogo = async (
  userId: number,
  file: Express.Multer.File
): Promise<{ url: string; publicId: string }> => {
  const result = await uploadToCloudinary(file.filename, 'image');

  if (!result.success || !result.data) {
    throw new Error(result.error || 'Failed to upload logo');
  }

  return {
    url: result.data.url,
    publicId: result.data.publicId,
  };
};
