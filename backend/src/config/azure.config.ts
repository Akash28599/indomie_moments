import { config } from "./env";

export interface AzureStorageConfig {
  connectionString: string;
  containerName: string;
  accountName: string;
  accountKey?: string;
}

export const azureConfig: AzureStorageConfig = {
  connectionString: config.azure.connectionString,
  containerName: config.azure.containerName,
  accountName: config.azure.accountName,
  accountKey: config.azure.accountKey,
};
