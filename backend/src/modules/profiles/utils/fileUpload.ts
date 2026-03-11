import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the absolute path to the assets directory
const getAssetsDir = () => {
  return path.join(__dirname, '../../../../assets');
};

// Remove file from local storage
export const removeLocalFile = (filePath: string): void => {
  try {
    const fullPath = path.isAbsolute(filePath)
      ? filePath
      : path.join(getAssetsDir(), path.basename(filePath));

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (error) {
    console.error('Error removing local file:', error);
    // Don't throw error, just log it
  }
};

// Remove file by filename
export const removeLocalFileByName = (filename: string): void => {
  try {
    const filePath = path.join(getAssetsDir(), filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error('Error removing local file by name:', error);
    // Don't throw error, just log it
  }
};

// Check if file exists
export const localFileExists = (filePath: string): boolean => {
  const fullPath = path.isAbsolute(filePath)
    ? filePath
    : path.join(getAssetsDir(), path.basename(filePath));
  return fs.existsSync(fullPath);
};

// Get file path for local storage
export const getLocalFilePath = (filename: string): string => {
  return path.join(getAssetsDir(), filename);
};

// Clean up old files from assets directory (optional utility)
export const cleanupOldFiles = (maxAge: number = 24 * 60 * 60 * 1000): number => {
  try {
    const assetsDir = getAssetsDir();
    const files = fs.readdirSync(assetsDir);
    const now = Date.now();
    let deletedCount = 0;

    files.forEach((file) => {
      const filePath = path.join(assetsDir, file);
      const stats = fs.statSync(filePath);

      // Delete files older than maxAge (default 24 hours)
      if (now - stats.mtimeMs > maxAge) {
        fs.unlinkSync(filePath);
        deletedCount++;
      }
    });

    return deletedCount;
  } catch (error) {
    console.error('Error cleaning up old files:', error);
    return 0;
  }
};
