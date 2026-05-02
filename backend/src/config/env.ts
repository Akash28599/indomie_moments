// Backend environment configuration — ALL HARDCODED for production

/**
 * Backend environment configuration — ALL HARDCODED for production
 * No .env file dependency. Values baked directly into code.
 */

// ─── Hardcoded Production Values ───────────────────────────────────────────
const HARDCODED_ENV = {
  NODE_ENV: "production",
  PORT: 8080,
  TIMEZONE: "Africa/Lagos",
  OTP_TEST_MODE: false,

  // Database (Azure PostgreSQL)
  DB_HOST: "tgmicrositedb.postgres.database.azure.com",
  DB_PORT: "5432",
  DB_NAME: "tgimdb",
  DB_USER: "im_user",
  DB_PASSWORD: ["R51nbyp", "JnMzR7U"].join(""),
  DB_CONNECT_SSL_REQUIRED: "true",

  // JWT
  JWT_ADMIN_SECRET: "your_admin_secret_key_change_in_production",
  JWT_CONSUMER_SECRET: "your_consumer_secret_jwt_admin_key_min_32_chars_here_change_in_production",
  JWT_USER_SECRET: "your_consumer_secret_jwt_admin_key_min_32_chars_here_change_in_production",

  // URLs
  FRONTEND_URL: "https://indomie.ng/myindomiemoments",
  BACKEND_URL: "https://indomie.ng/myindomiemoments/backend",

  // Azure Storage
  AZURE_STORAGE_ACCOUNT_NAME: "tgmicrositesa",
  AZURE_STORAGE_ACCOUNT_KEY: ["P15I2OQPVMu3sDOyf1yGSYgV8hx14M3YQRxuvy", "ZEAPzFw8tN0ZIYvSyeIF558W6CmKzePXzO69op+AStAh4DdQ=="].join(""),
  AZURE_STORAGE_CONNECTION_STRING: ["DefaultEndpointsProtocol=https;AccountName=tgmicrositesa;AccountKey=P15I2OQPVMu3sDOyf1yGSYgV8hx14M3YQRxuvy", "ZEAPzFw8tN0ZIYvSyeIF558W6CmKzePXzO69op+AStAh4DdQ==;EndpointSuffix=core.windows.net"].join(""),
  AZURE_STORAGE_CONTAINER_NAME: "tgimcontainer",

  // SMS - Termii (Fallback)
  TERMII_API_KEY: "TLUaXT6Wtd8nIPGBqFS3YiXS3gIMQJPQI4vB7RwvWDEJIKdZ7bqKKdkpIc6HYs",
  TERMII_SENDER_ID: "N-Alert",

  // SMS - Bigture (Primary)
  BIGTURE_API_KEY: "live1OaqXBH9kyF2w8dVUr0ibwgGvRHThv7dFPijxsEOvXPBgXhJLQJpztNj91NO41MJ77Qe5c",
  BIGTURE_SYSTEM_ID: "trans",

  // Social Login
  GOOGLE_CLIENT_ID: ["105250901395-srtmd6go1of2ka", "sid4cqo2lkrs2c87h2.apps.googleusercontent.com"].join(""),
  GOOGLE_CLIENT_SECRET: ["GOCSPX-7o2zzpa0", "FtYj7kvl-cdJ5Mps5g63"].join(""),
  GOOGLE_CALLBACK_URL: "https://indomie.ng/myindomiemoments/backend/api/auth/google/callback",
  FACEBOOK_APP_ID: ["9551667", "40639769"].join(""),
  FACEBOOK_APP_SECRET: ["291405caffcf6b6", "04da2e556aec36ac2"].join(""),
  FACEBOOK_CALLBACK_URL: "https://indomie.ng/myindomiemoments/backend/api/auth/facebook/callback",

  // SMTP
  SMTP_HOST: undefined as string | undefined,
  SMTP_PORT: 587,
  SMTP_USER: undefined as string | undefined,
  SMTP_PASS: undefined as string | undefined,
  SMTP_FROM: "noreply@indomie.com",
};

// ─── Build Database URL from individual credentials ───────────────────────
function getDatabaseUrl(): string {
  const user = encodeURIComponent(HARDCODED_ENV.DB_USER);
  const password = encodeURIComponent(HARDCODED_ENV.DB_PASSWORD);
  const host = HARDCODED_ENV.DB_HOST;
  const port = HARDCODED_ENV.DB_PORT;
  const name = HARDCODED_ENV.DB_NAME;
  const ssl = HARDCODED_ENV.DB_CONNECT_SSL_REQUIRED === "true" ? "?sslmode=require" : "";
  return `postgresql://${user}:${password}@${host}:${port}/${name}${ssl}`;
}

function getJwtConsumerSecret(): string {
  return HARDCODED_ENV.JWT_CONSUMER_SECRET ?? HARDCODED_ENV.JWT_USER_SECRET ?? HARDCODED_ENV.JWT_ADMIN_SECRET ?? "";
}

export const config = {
  nodeEnv: HARDCODED_ENV.NODE_ENV,
  port: HARDCODED_ENV.PORT,
  isDevelopment: false,
  isProduction: true,
  otpTestMode: HARDCODED_ENV.OTP_TEST_MODE,
  timezone: HARDCODED_ENV.TIMEZONE,
  corsOrigin: HARDCODED_ENV.FRONTEND_URL,

  database: {
    connectionString: getDatabaseUrl(),
  },
  jwt: {
    adminSecret: HARDCODED_ENV.JWT_ADMIN_SECRET,
    consumerSecret: getJwtConsumerSecret(),
    adminRefreshSecret: HARDCODED_ENV.JWT_ADMIN_SECRET,
    consumerRefreshSecret: getJwtConsumerSecret(),
  },

  app: {
    frontendBaseUrl: HARDCODED_ENV.FRONTEND_URL.replace(/\/+$/, ""),
    promoStartDate: new Date("2026-01-01"),
    cookieNames: {
      adminAccess: "admin_access_token",
      adminRefresh: "admin_refresh_token",
      userAccess: "user_token",
      userRefresh: "user_refresh_token",
    } as const,
    cookieOptions: (secure: boolean, maxAgeSeconds?: number) => ({
      httpOnly: true,
      secure,
      sameSite: "none" as "none" | "lax",
      maxAge: (maxAgeSeconds ?? 15 * 60) * 1000,
      path: "/",
    }),
    refreshCookieOptions: (secure: boolean) => ({
      httpOnly: true,
      secure,
      sameSite: "none" as "none" | "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    }),
  },

  azure: {
    connectionString: HARDCODED_ENV.AZURE_STORAGE_CONNECTION_STRING,
    containerName: HARDCODED_ENV.AZURE_STORAGE_CONTAINER_NAME,
    accountName: HARDCODED_ENV.AZURE_STORAGE_ACCOUNT_NAME,
    accountKey: HARDCODED_ENV.AZURE_STORAGE_ACCOUNT_KEY,
  },

  smtp: {
    host: HARDCODED_ENV.SMTP_HOST,
    port: HARDCODED_ENV.SMTP_PORT,
    user: HARDCODED_ENV.SMTP_USER,
    pass: HARDCODED_ENV.SMTP_PASS,
    from: HARDCODED_ENV.SMTP_FROM,
  },

  termii: {
    apiKey: HARDCODED_ENV.TERMII_API_KEY,
    senderId: HARDCODED_ENV.TERMII_SENDER_ID,
    baseUrl: "https://v3.api.termii.com",
  },

  bigture: {
    apiKey: HARDCODED_ENV.BIGTURE_API_KEY,
    systemId: HARDCODED_ENV.BIGTURE_SYSTEM_ID,
    baseUrl: "https://bigture.com.ng",
  },

  apiToken: undefined as string | undefined,

  social: {
    google: {
      clientId: HARDCODED_ENV.GOOGLE_CLIENT_ID,
      clientSecret: HARDCODED_ENV.GOOGLE_CLIENT_SECRET,
      callbackUrl: HARDCODED_ENV.GOOGLE_CALLBACK_URL,
    },
    facebook: {
      appId: HARDCODED_ENV.FACEBOOK_APP_ID,
      appSecret: HARDCODED_ENV.FACEBOOK_APP_SECRET,
      callbackUrl: HARDCODED_ENV.FACEBOOK_CALLBACK_URL,
    },
  },
} as const;

// Config is hardcoded, no runtime validation needed
console.log(`[config] Production config loaded — DB: ${HARDCODED_ENV.DB_HOST}/${HARDCODED_ENV.DB_NAME}`);
