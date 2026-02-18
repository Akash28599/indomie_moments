import { z } from "zod";

// File upload schema (simplified - no category, primary, or displayOrder)
export const fileUploadSchema = z.object({});

// File query schema (simplified - no filters needed)
export const fileQuerySchema = z.object({});

// Types
export interface FileRecord {
  id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FileUploadInput {
  // No options needed - schema simplified
}

export interface FileQueryFilters {
  // No filters needed - schema simplified
}
