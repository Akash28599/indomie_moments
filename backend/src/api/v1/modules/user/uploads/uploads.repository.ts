import { eq, desc } from "drizzle-orm";
import { db } from "../../../../../db";
import { userFiles } from "../../../../../db/schema/userFiles";
import { FileRecord, FileQueryFilters } from "./uploads.types";

/**
 * Create file record
 */
export async function createFileRepo(data: {
  userId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
}): Promise<FileRecord> {
  const [file] = await db
    .insert(userFiles)
    .values({
      userId: data.userId,
      fileName: data.fileName,
      fileUrl: data.fileUrl,
      fileSize: data.fileSize,
      fileType: data.fileType,
    })
    .returning();

  return file as FileRecord;
}

/**
 * Get all files for a user
 */
export async function getFilesRepo(
  userId: string,
  _options?: FileQueryFilters,
): Promise<FileRecord[]> {
  const result = await db
    .select()
    .from(userFiles)
    .where(eq(userFiles.userId, userId))
    .orderBy(desc(userFiles.createdAt));

  return result as FileRecord[];
}

/**
 * Get file by ID
 */
export async function getFileByIdRepo(
  fileId: string,
): Promise<FileRecord | null> {
  const [file] = await db
    .select()
    .from(userFiles)
    .where(eq(userFiles.id, fileId))
    .limit(1);

  return (file as FileRecord) || null;
}

/**
 * Delete file
 */
export async function deleteFileRepo(fileId: string): Promise<boolean> {
  const result = await db
    .delete(userFiles)
    .where(eq(userFiles.id, fileId))
    .returning();

  return result.length > 0;
}
