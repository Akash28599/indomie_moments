/**
 * env.ts - Frontend environment configuration
 * All values hardcoded — no .env file dependency
 */

/**
 * Frontend environment variables — ALL HARDCODED for production
 */
export const env = {
  APP_NAME: "INDOMIE",
  NODE_ENV: "production",
  API_BASE_URL: "https://indomie.ng/myindomiemoments/backend/api",
  VITE_APP_TIMEZONE: "Africa/Lagos",
};

/**
 * Helper functions
 */
export const isDevelopment = (): boolean => env.NODE_ENV === "development";
export const isProduction = (): boolean => env.NODE_ENV === "production";

// No validation needed — everything is hardcoded
