/**
 * env.ts - Frontend environment configuration
 * Centralized configuration for environment variables and constants
 */

const normalizeBaseUrl = (url: string): string =>
  url.trim().replace(/\/+$/, "");

/**
 * Detect if we're accessing the app through ngrok
 */
const isNgrokAccess = (): boolean => {
  if (typeof window === "undefined") return false;
  return (
    window.location.hostname.includes("ngrok") ||
    window.location.hostname.includes("ngrok-free.dev") ||
    window.location.hostname.includes("ngrok.io")
  );
};

/**
 * Get API base URL - use relative URL when accessed via ngrok to leverage Vite proxy
 */
const getApiBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;

  // If explicitly set, use it
  if (envUrl) {
    return normalizeBaseUrl(envUrl);
  }

  // If accessed via ngrok, use relative URL (empty string) to leverage Vite proxy
  if (isNgrokAccess()) {
    return "";
  }

  // Default to localhost
  return "http://localhost:8080/api";
};

/**
 * Frontend environment variables
 */
export const env = {
  APP_NAME: import.meta.env.VITE_APP_NAME || "INDOMIE",
  NODE_ENV:
    import.meta.env.VITE_NODE_ENV || import.meta.env.MODE || "development",
  API_BASE_URL: getApiBaseUrl(),
  VITE_APP_TIMEZONE:import.meta.env.VITE_APP_TIMEZONE
};

/**
 * Helper functions
 */
export const isDevelopment = (): boolean => env.NODE_ENV === "development";
export const isProduction = (): boolean => env.NODE_ENV === "production";

export const validateEnvironment = (): void => {
  const requiredVars = ["VITE_API_BASE_URL"];
  const missing = requiredVars.filter((v) => !import.meta.env[v]);
  if (missing.length > 0) {
    console.warn("Missing env (using defaults):", missing.join(", "));
    if (isProduction()) {
      throw new Error(`Missing required env: ${missing.join(", ")}`);
    }
  }
};

// Validate on module load
validateEnvironment();
