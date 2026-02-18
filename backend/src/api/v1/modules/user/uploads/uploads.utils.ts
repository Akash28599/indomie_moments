import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { azureConfig } from "../../../../../config/azure.config";

/**
 * Get Azure Blob Service Client (fail fast)
 */
function getBlobServiceClient(): BlobServiceClient {
  const connectionString = azureConfig.connectionString;

  if (!connectionString) {
    throw new Error(
      "AZURE_STORAGE_CONNECTION_STRING is not configured"
    );
  }

  return BlobServiceClient.fromConnectionString(connectionString);
}

/**
 * Get (or create) container client
 */
async function getContainerClient(): Promise<ContainerClient> {
  const blobServiceClient = getBlobServiceClient();
  const containerName = azureConfig.containerName;

  if (!containerName) {
    throw new Error(
      "AZURE_STORAGE_CONTAINER_NAME is not configured"
    );
  }

  const containerClient =
    blobServiceClient.getContainerClient(containerName);

  // Ensure container exists
  await containerClient.createIfNotExists({
    access: "blob", // public read access (images/videos)
  });

  return containerClient;
}

/**
 * Sanitize filename to avoid invalid characters
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_{2,}/g, "_")
    .toLowerCase()
    .trim();
}

/**
 * Generate unique filename
 */
export function generateFilename(originalName: string): string {
  const sanitized = sanitizeFilename(originalName);
  return `${Date.now()}-${sanitized}`;
}

/**
 * Upload file to Azure Blob Storage
 */
export async function uploadFileToAzure(
  file: Express.Multer.File,
  filename: string
): Promise<{ blobPath: string; url: string }> {
  const containerClient = await getContainerClient(); // ✅ FIXED
  const blobPath = filename;

  const blockBlobClient =
    containerClient.getBlockBlobClient(blobPath);

  try {
    await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: {
        blobContentType: file.mimetype,
      },
    });
  } catch (err: any) {
    throw new Error(
      `Azure upload failed: ${err.message || "Unknown error"}`
    );
  }

  return {
    blobPath,
    url: blockBlobClient.url,
  };
}

/**
 * Delete file from Azure Blob Storage
 */
export async function deleteFileFromAzure(
  filename: string
): Promise<void> {
  const containerClient = await getContainerClient(); // ✅ FIXED
  const blockBlobClient =
    containerClient.getBlockBlobClient(filename);

  try {
    await blockBlobClient.deleteIfExists();
  } catch (err: any) {
    throw new Error(
      `Azure delete failed: ${err.message || "Unknown error"}`
    );
  }
}
