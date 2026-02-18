import multer from "multer";
import { Request } from "express";

// Configure multer for memory storage (for base64 conversion)
const storage = multer.memoryStorage();

// File filter
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  // Allow image files and PDF files (for ID card PDFs)
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image and PDF files are allowed"));
  }
};

// Limits
const limits = {
  fileSize: 10 * 1024 * 1024, // 10MB (increased for PDFs)
  files: 1,
};

// Create multer instance
export const upload = multer({
  storage,
  fileFilter,
  limits,
});

// Single file upload middleware
export const fileUpload = (fieldName: string = "file") => {
  return upload.single(fieldName);
};

// Multiple files upload middleware
export const filesUpload = (
  fieldName: string = "files",
  maxCount: number = 5,
) => {
  return upload.array(fieldName, maxCount);
};
