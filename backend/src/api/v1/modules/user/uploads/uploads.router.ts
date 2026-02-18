import { Router } from "express";
import { validateRequest } from "../../../middlewares/validate-request";
import { fileUploadSchema, fileQuerySchema } from "./uploads.types";
import {
  uploadFileController,
  getUserFilesController,
  deleteFileController,
} from "./uploads.controller";
import { fileUpload } from "../../../middlewares/file-upload";

const router = Router();

// File upload
router.post(
  "/:userId",
  fileUpload("file"),
  validateRequest(fileUploadSchema),
  uploadFileController,
);

// Get files
router.get(
  "/:userId",
  validateRequest(fileQuerySchema, "query"),
  getUserFilesController,
);

// Delete file
router.delete("/:userId/:fileId", deleteFileController);

export default router;
