import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure assets directory exists
const assetsDir = path.join(__dirname, '../../assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// File storage configuration
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, assetsDir);
  },
  filename: function (req, file, cb) {
    if (file) {
      // Generate unique filename: timestamp + original filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    } else {
      cb(new Error('No file provided'), '');
    }
  },
});

// Image file filter (for avatars, logos, etc.)
const imageFileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpg, jpeg, png, gif, webp)'));
  }
};

// Document file filter (for CV, PDF, etc.)
const documentFileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only document files are allowed (PDF, DOC, DOCX, XLS, XLSX, TXT)'));
  }
};

// Generic file filter (images or documents)
const genericFileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = [
    ...['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    ...['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image and document files are allowed'));
  }
};

// Image upload middleware (for avatars, logos)
export const uploadImage = multer({
  storage: fileStorage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
}).single('image');

// Document upload middleware (for CV, PDF)
export const uploadDocument = multer({
  storage: fileStorage,
  fileFilter: documentFileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
}).single('document');

// Generic file upload middleware (images or documents)
export const uploadFile = multer({
  storage: fileStorage,
  fileFilter: genericFileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
}).single('file');

// Multiple images upload middleware
export const uploadMultipleImages = multer({
  storage: fileStorage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 5 }, // 5MB per file, max 5 files
}).array('images', 5);

// CV upload middleware (specific for CV files)
export const uploadCV = multer({
  storage: fileStorage,
  fileFilter: documentFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
}).single('cv');

// Avatar upload middleware (specific for avatars)
export const uploadAvatar = multer({
  storage: fileStorage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
}).single('avatar');

// Logo upload middleware (specific for company logos)
export const uploadLogo = multer({
  storage: fileStorage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
}).single('logo');

export default {
  uploadImage,
  uploadDocument,
  uploadFile,
  uploadMultipleImages,
  uploadCV,
  uploadAvatar,
  uploadLogo,
};
