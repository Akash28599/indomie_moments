import { logger } from "../../../../../lib/logger";
import { NotFoundError, BadRequestError } from "../../../abstractions/AppError";
import { FileUploadInput, FileQueryFilters } from "./uploads.types";
import {
  uploadFileToAzure,
  deleteFileFromAzure,
  generateFilename,
  sanitizeFilename,
} from "./uploads.utils";
import {
  createFileRepo,
  getFilesRepo,
  deleteFileRepo,
  getFileByIdRepo,
} from "./uploads.repository";

/**
 * Upload file for a user
 */
export async function uploadFileService(
  userId: string,
  file: Express.Multer.File,
  _uploadedBy: string,
  _options?: FileUploadInput,
) {
  // Validate file has content
  if (!file) {
    throw new BadRequestError("File is required", { userId });
  }

  if (!file.buffer || file.buffer.length === 0) {
    logger.error("File buffer is empty", {
      userId,
      fileName: file.originalname,
      fileSize: file.size,
      hasBuffer: !!file.buffer,
      bufferLength: file.buffer?.length || 0,
    });
    throw new BadRequestError("File buffer is empty - file upload failed", {
      userId,
      fileName: file.originalname,
    });
  }

  if (!file.size || file.size === 0) {
    logger.error("File size is zero", {
      userId,
      fileName: file.originalname,
    });
    throw new BadRequestError("File size is zero", {
      userId,
      fileName: file.originalname,
    });
  }

  // Sanitize the filename
  const sanitizedOriginalName = sanitizeFilename(file.originalname);

  logger.info("Uploading file to Azure Storage", {
    userId,
    originalFileName: file.originalname,
    sanitizedFileName: sanitizedOriginalName,
    fileSize: file.size,
    fileType: file.mimetype,
    bufferLength: file.buffer.length,
  });

  // Generate filename
  const filename = generateFilename(sanitizedOriginalName);

  // Upload to Azure Storage
  let uploadResult;
  try {
    uploadResult = await uploadFileToAzure(file, filename);
    logger.info("File uploaded to Azure Storage successfully", {
      userId,
      fileName: file.originalname,
      blobPath: uploadResult.blobPath,
    });
  } catch (uploadError) {
    logger.error("Failed to upload file to Azure Storage", {
      userId,
      fileName: file.originalname,
      error:
        uploadError instanceof Error
          ? uploadError.message
          : String(uploadError),
      stack: uploadError instanceof Error ? uploadError.stack : undefined,
    });
    throw new BadRequestError("Failed to upload file to Azure Storage", {
      userId,
      fileName: file.originalname,
      error:
        uploadError instanceof Error
          ? uploadError.message
          : String(uploadError),
    });
  }

  // Get public URL
  const fileUrl = uploadResult.url;

  logger.info("Creating file record in database", {
    userId,
    fileName: file.originalname,
    fileUrl: fileUrl.substring(0, 100) + "...",
    fileSize: file.size,
  });

  // Save to database
  const fileRecord = await createFileRepo({
    userId,
    fileName: file.originalname,
    fileUrl,
    fileSize: file.size,
    fileType: file.mimetype,
  });

  logger.info("File record created successfully", {
    userId,
    fileId: fileRecord.id,
    fileName: fileRecord.fileName,
    fileSize: fileRecord.fileSize,
  });

  return fileRecord;
}

/**
 * Get all files for a user
 */
export async function getFilesService(
  userId: string,
  options?: FileQueryFilters,
) {
  return await getFilesRepo(userId, options);
}

/**
 * Delete file and optionally remove from Azure Storage
 */
export async function deleteFileService(fileId: string, userId: string) {
  const file = await getFileByIdRepo(fileId);

  if (!file) {
    throw new NotFoundError("File", { fileId });
  }

  if (file.userId !== userId) {
    throw new BadRequestError("File does not belong to this user", {
      fileId,
      userId,
    });
  }

  // Delete from Azure Storage
  try {
    const urlParts = file.fileUrl.split("/");
    const filename = urlParts[urlParts.length - 1];
    await deleteFileFromAzure(filename);
  } catch (error) {
    logger.warn("Failed to delete file from Azure Storage", {
      error: error instanceof Error ? error.message : String(error),
      fileId,
    });
    // Continue with database deletion even if Azure deletion fails
  }

  // Delete from database
  const deleted = await deleteFileRepo(fileId);

  return deleted;
}
