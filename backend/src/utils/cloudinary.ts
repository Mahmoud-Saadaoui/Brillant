import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary Upload Image/File
export const cloudinaryUploadFile = async (
  fileToUpload: string,
  resourceType: 'image' | 'raw' | 'auto' = 'auto',
  folder?: string
): Promise<{
  secure_url: string;
  public_id: string;
  resource_type: string;
  bytes: number;
  format: string;
}> => {
  try {
    const data = await cloudinary.uploader.upload(fileToUpload, {
      resource_type: resourceType,
      folder: folder || 'talent-ai',
      access_mode: 'public',
    });
    return data;
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Internal Server Error (cloudinary)');
  }
};

// Cloudinary Remove Image/File
export const cloudinaryRemoveFile = async (
  filePublicId: string,
  resourceType: 'image' | 'raw' = 'image'
): Promise<{ result: string }> => {
  try {
    const result = await cloudinary.uploader.destroy(filePublicId, {
      resource_type: resourceType,
    });
    return result;
  } catch (error) {
    console.error('Cloudinary remove error:', error);
    throw new Error('Internal Server Error (cloudinary)');
  }
};

// Cloudinary Remove Multiple Images/Files
export const cloudinaryRemoveMultipleFiles = async (
  publicIds: string[],
  resourceType: 'image' | 'raw' = 'image'
): Promise<{ deleted: Record<string, string> }> => {
  try {
    const result = await cloudinary.api.delete_resources(publicIds, {
      resource_type: resourceType,
    });
    return result;
  } catch (error) {
    console.error('Cloudinary remove multiple error:', error);
    throw new Error('Internal Server Error (cloudinary)');
  }
};

// Cloudinary Get Asset Info
export const cloudinaryGetAssetInfo = async (
  publicId: string,
  resourceType: 'image' | 'raw' = 'image'
): Promise<any> => {
  try {
    const result = await cloudinary.api.resource(publicId, {
      resource_type: resourceType,
    });
    return result;
  } catch (error) {
    console.error('Cloudinary get asset info error:', error);
    throw new Error('Internal Server Error (cloudinary)');
  }
};

export default cloudinary;
