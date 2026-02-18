import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../abstractions/AppError";
import {
  uploadFileService,
  getFilesService,
  deleteFileService,
} from "./uploads.service";
import { fileUploadSchema, fileQuerySchema } from "./uploads.types";

/**
 * Upload file for a user
 * POST /api/v1/consumer/uploads/:userId
 */
export async function uploadFileController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userId = req.params.userId as string;
    const file = req.file;

    if (!userId) {
      throw new AppError("User ID is required", 400);
    }

    // Validate file upload data (schema is now empty, but kept for consistency)
    fileUploadSchema.parse(req.body);

    if (!file) {
      throw new AppError("File is required", 400);
    }

    // Get user ID from authenticated user or use provided userId
    const authenticatedUserId = req.user?.id || userId;
    if (!authenticatedUserId) {
      throw new AppError("User authentication required", 401);
    }

    const fileRecord = await uploadFileService(
      authenticatedUserId,
      file,
      authenticatedUserId,
    );

    res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      data: fileRecord,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get all files for a user
 * GET /api/v1/consumer/uploads/:userId
 */
export async function getUserFilesController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userId = req.params.userId as string;

    if (!userId) {
      throw new AppError("User ID is required", 400);
    }

    // Validate query parameters (schema is now empty, but kept for consistency)
    fileQuerySchema.parse(req.query);

    const files = await getFilesService(userId);

    res.json({
      success: true,
      count: files.length,
      data: files,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Delete file
 * DELETE /api/v1/consumer/uploads/:userId/:fileId
 */
export async function deleteFileController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userId = req.params.userId as string;
    const fileId = req.params.fileId as string;

    if (!userId || !fileId) {
      throw new AppError("User ID and File ID are required", 400);
    }

    await deleteFileService(fileId, userId);

    res.json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}
